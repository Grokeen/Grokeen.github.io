"""Compile published coding solutions and run their original local test cases."""
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
    if draft:
        data = json.loads((ROOT / ".jekyll-local/baek-authoring/notes.json").read_text(encoding="utf-8"))
        articles = data["existing"] + data["additional"]
    else:
        data = json.loads((ROOT / "_docs/CODING_2024_MANIFEST.json").read_text(encoding="utf-8"))
        articles = data["articles"]
        company = json.loads((ROOT / "_docs/COMPANY_CODING_MANIFEST.json").read_text(encoding="utf-8"))
        articles += company["articles"]
        assert len(articles) == 146
    java_home = os.environ.get("JAVA_HOME")
    tool = lambda name: str(Path(java_home) / "bin" / (name + (".exe" if os.name == "nt" else ""))) if java_home else shutil.which(name)
    java, javac = tool("java"), tool("javac")
    if not java or not javac:
        raise RuntimeError("JDK 11 required")
    with tempfile.TemporaryDirectory(prefix="coding-study-") as folder:
        work = Path(folder)
        classes = work / "classes"
        classes.mkdir()
        sources = []
        examples = []
        for index, article in enumerate(articles):
            if draft:
                code = article["code"]
            else:
                text = (ROOT / article["file"]).read_text(encoding="utf-8")
                blocks = re.findall(r"^```java\n(.*?)^```", text, re.M | re.S)
                assert len(blocks) == 1, article["file"]
                code = blocks[0]
            package = "coding%03d" % index
            base = work / package
            base.mkdir()
            source = base / "Main.java"
            source.write_text("package %s;\n%s" % (package, code), encoding="utf-8")
            sources.append(str(source))
            examples.append((package, article))
        built = subprocess.run([javac, "--release", "11", "-encoding", "UTF-8", "-d", str(classes)] + sources,
                               capture_output=True, text=True, encoding="utf-8", errors="replace", timeout=120)
        if built.returncode:
            print(built.stdout + built.stderr)
            return 1
        passed = 0
        for package, article in examples:
            for stdin, expected in article["cases"]:
                result = subprocess.run([java, "-Dfile.encoding=UTF-8", "-cp", str(classes), package + ".Main"],
                                        input=stdin, capture_output=True, text=True, encoding="utf-8", timeout=15)
                actual = result.stdout.replace("\r\n", "\n")
                if result.returncode or actual != expected:
                    print(json.dumps({"id": article["id"], "input": stdin, "expected": expected,
                                      "actual": actual, "stderr": result.stderr}, ensure_ascii=False))
                    return 1
                passed += 1
        print("Java 11: %d coding solutions compiled, %d original local cases passed (not online judge verdicts)" % (len(articles), passed))
        return 0


if __name__ == "__main__":
    sys.exit(main())
