"""Compile the published C# examples and compare their isolated console output."""

import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import sys
import tempfile

ROOT = Path(__file__).resolve().parents[1]


def main():
    draft = "--draft" in sys.argv
    manifest_path = ROOT / (".jekyll-local/content-2024/csharp-notes.json" if draft else "_docs/CSHARP_HOSPITAL_2024_MANIFEST.json")
    data = json.loads(manifest_path.read_text(encoding="utf-8"))
    articles = data if draft else data["articles"]
    articles = [article for article in articles if
                (article.get("track") == "csharp" if draft else article.get("language") == "csharp")]
    assert len(articles) == 48, "Expected 48 C# lessons; hospital administration is a separate procedure course"
    dotnet = os.environ.get("STUDY_DOTNET") or shutil.which("dotnet")
    if not dotnet:
        raise RuntimeError("A .NET 8 SDK is required; set STUDY_DOTNET if necessary")
    with tempfile.TemporaryDirectory(prefix="csharp-study-") as folder:
        work = Path(folder)
        project = work / "Examples.csproj"
        project.write_text('''<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType><TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings><Nullable>enable</Nullable>
    <LangVersion>12.0</LangVersion><UseSharedCompilation>false</UseSharedCompilation>
    <TreatWarningsAsErrors>true</TreatWarningsAsErrors>
  </PropertyGroup>
</Project>''', encoding="utf-8")
        (work / "global.json").write_text(json.dumps({"sdk": {"version": "8.0.100", "rollForward": "latestFeature", "allowPrerelease": False}}), encoding="utf-8")
        (work / "NuGet.Config").write_text("<configuration><packageSources><clear /></packageSources></configuration>", encoding="utf-8")
        calls = []
        expected = {}
        for index, article in enumerate(articles, 1):
            if draft:
                code = article["code"]
                key = article["slug"]
                output = article["output"]
            else:
                markdown = (ROOT / article["file"]).read_text(encoding="utf-8")
                blocks = re.findall(r"^```([^\n]+)\n(.*?)^```", markdown, re.M | re.S)
                code_blocks = [text for language, text in blocks if language == "csharp"]
                assert len(code_blocks) == 1, article["file"]
                code = code_blocks[0]
                key = article["file"]
                output = article["expected_output"]
                shown = [text for language, text in blocks if language == "text"]
                assert shown == [output], article["file"] + ": published output differs"
            expected[key] = output.replace("\r\n", "\n")
            body, _, types = code.partition("// 예제용 형식")
            usings = re.findall(r"^using ([A-Za-z_][A-Za-z0-9_.]*);\s*$", body, re.M)
            body = re.sub(r"^using [A-Za-z_][A-Za-z0-9_.]*;\s*$", "", body, flags=re.M)
            namespace = "StudyCase%03d" % index
            source = "namespace %s {\n%s\ninternal static class StudyExampleRunner { public static async Task Run() {\n%s\nawait Task.CompletedTask;\n} }\n%s\n}" % (
                namespace, "\n".join("using %s;" % name for name in usings), body, types
            )
            (work / (namespace + ".cs")).write_text(source, encoding="utf-8")
            calls.append("await RunCase(%s, %s.StudyExampleRunner.Run);" % (json.dumps(key), namespace))
        runner = '''using System.Globalization;
using System.Text;
using System.Text.Json;
Console.OutputEncoding = new UTF8Encoding(false);
var results = new List<CaseResult>();
async Task RunCase(string key, Func<Task> run)
{
    var original = Console.Out;
    var originalError = Console.Error;
    var output = new StringWriter(CultureInfo.InvariantCulture);
    var errors = new StringWriter(CultureInfo.InvariantCulture);
    CultureInfo.CurrentCulture = CultureInfo.InvariantCulture;
    CultureInfo.CurrentUICulture = CultureInfo.InvariantCulture;
    Console.SetOut(output);
    Console.SetError(errors);
    string? failure = null;
    try { await run(); }
    catch (Exception error) { failure = error.ToString(); }
    finally { Console.SetOut(original); Console.SetError(originalError); }
    results.Add(new CaseResult(key, output.ToString(), errors.ToString(), failure));
}
''' + "\n".join(calls) + '''
File.WriteAllText(args[0], JsonSerializer.Serialize(results), Encoding.UTF8);
record CaseResult(string Key, string Output, string Errors, string? Failure);
'''
        (work / "Program.cs").write_text(runner, encoding="utf-8")
        env = dict(os.environ, DOTNET_CLI_TELEMETRY_OPTOUT="1", DOTNET_SKIP_FIRST_TIME_EXPERIENCE="1", DOTNET_NOLOGO="1", DOTNET_CLI_HOME=str(work / "cli"), NUGET_PACKAGES=str(work / "packages"))
        build = subprocess.run([dotnet, "build", str(project), "--nologo", "-v", "quiet"], cwd=work, env=env, capture_output=True, text=True, encoding="utf-8", timeout=180)
        if build.returncode:
            print(build.stdout, file=sys.stderr)
            print(build.stderr, file=sys.stderr)
            return 1
        report = work / "results.json"
        run = subprocess.run([dotnet, str(work / "bin/Debug/net8.0/Examples.dll"), str(report)], cwd=work, env=env, capture_output=True, text=True, encoding="utf-8", timeout=60)
        if run.returncode:
            print(run.stdout + run.stderr, file=sys.stderr)
            return 1
        results = json.loads(report.read_text(encoding="utf-8-sig"))
        failures = []
        for result in results:
            actual = result["Output"].replace("\r\n", "\n")
            if result["Failure"] or result["Errors"] or actual != expected[result["Key"]]:
                failures.append({"key": result["Key"], "expected": expected[result["Key"]], **result})
        for failure in failures:
            print(json.dumps(failure, ensure_ascii=False), file=sys.stderr)
        print("C# 12 / .NET 8: compiled %d examples, verified %d outputs, failures %d" % (len(articles), len(results), len(failures)))
        return bool(failures)


if __name__ == "__main__":
    sys.exit(main())
