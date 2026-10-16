"""Compile the actual published Java 11 examples and run Spring 2.3.4 tests."""
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import tempfile
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]


def command(args, cwd, env=None, timeout=300):
    result = subprocess.run(args, cwd=cwd, env=env, capture_output=True,
                            text=True, encoding="utf-8", errors="replace", timeout=timeout)
    if result.returncode:
        raise RuntimeError("Command failed: %s\n%s\n%s" %
                           (args[0], result.stdout[-14000:], result.stderr[-4000:]))
    return result.stdout.replace("\r\n", "\n")


def main():
    manifest = json.loads((ROOT / "_docs/JAVA_SPRING_2020_MANIFEST.json").read_text(encoding="utf-8"))
    articles = manifest["articles"]
    assert len(articles) == 80
    java_home = os.environ.get("JAVA_HOME")
    tool = lambda name: str(Path(java_home) / "bin" / (name + (".exe" if os.name == "nt" else ""))) if java_home else shutil.which(name)
    java, javac = tool("java"), tool("javac")
    maven = os.environ.get("STUDY_MAVEN") or shutil.which("mvn")
    if not java or not javac or not maven:
        raise RuntimeError("JDK 11 and Maven required (JAVA_HOME / STUDY_MAVEN)")
    env = dict(os.environ, MAVEN_OPTS="-Dfile.encoding=UTF-8")
    cache = ROOT / ".jekyll-local/java-2020/m2"
    with tempfile.TemporaryDirectory(prefix="java-spring-study-") as folder:
        work = Path(folder)
        classes = work / "classes"
        classes.mkdir()
        console = []
        for index, article in enumerate(articles):
            text = (ROOT / article["file"]).read_text(encoding="utf-8")
            codes = re.findall(r"^```java\n(.*?)^```", text, re.M | re.S)
            assert len(codes) == 1, article["file"]
            package = "lesson%02d" % index
            name = "Main" if article["mode"] == "console" else "StudyTest"
            base = work / ("console" if name == "Main" else "src/test/java") / package
            base.mkdir(parents=True)
            target = base / (name + ".java")
            target.write_text("package %s;\n%s" % (package, codes[0]), encoding="utf-8")
            if name == "Main":
                shown = re.findall(r"^```text\n(.*?)^```", text, re.M | re.S)
                assert shown == [article["expected_output"]], article["file"]
                console.append((package, target, article))
        command([javac, "--release", "11", "-encoding", "UTF-8", "-d", str(classes)] +
                [str(target) for _, target, _ in console], work)
        for package, _, article in console:
            actual = command([java, "-Dfile.encoding=UTF-8", "-cp", str(classes), package + ".Main"], work, timeout=30)
            assert actual == article["expected_output"], (article["file"], actual)
        shutil.copyfile(ROOT / "_examples/java-spring-2020/pom.xml", work / "pom.xml")
        resources = work / "src/test/resources"
        resources.mkdir(parents=True)
        (resources / "logback-test.xml").write_text('<configuration><root level="OFF"/></configuration>', encoding="utf-8")
        command([maven, "-q", "-Dmaven.repo.local=" + str(cache), "-DargLine=-Dfile.encoding=UTF-8", "test"], work, env, timeout=600)
        reports = list((work / "target/surefire-reports").glob("TEST-*.xml"))
        cases = 0
        for report in reports:
            suite = ET.parse(report).getroot()
            assert suite.attrib["failures"] == "0" and suite.attrib["errors"] == "0", report
            cases += int(suite.attrib["tests"])
        assert len(console) == 40 and cases == 40, (len(console), cases)
        print("Java 11: 40 console outputs passed; Spring Boot 2.3.4: 40 JUnit tests passed")


if __name__ == "__main__":
    main()
