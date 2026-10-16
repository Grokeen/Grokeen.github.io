"""Run the examples extracted from the published certification Markdown."""

import ast
import json
import os
from pathlib import Path
import re
import shutil
import sqlite3
import subprocess
import sys
import tempfile

ROOT = Path(__file__).resolve().parents[1]


def run(command, work):
    environment = dict(os.environ, PYTHONIOENCODING="utf-8", OMP_NUM_THREADS="1",
                       OPENBLAS_NUM_THREADS="1", MKL_NUM_THREADS="1")
    result = subprocess.run(command, cwd=work, env=environment, encoding="utf-8",
                            stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=45)
    if result.returncode:
        raise RuntimeError(result.stderr or result.stdout)
    return result.stdout.replace("\r\n", "\n")


def main():
    manifest = json.loads((ROOT / "_docs/CERTIFICATION_2021_2023_MANIFEST.json").read_text(encoding="utf-8"))
    counts = {"python": 0, "sql": 0, "c": 0, "java": 0, "reasoning": 0, "compiler_unavailable": 0}
    bootstrap = ""
    packages = os.environ.get("STUDY_CERT_PACKAGES")
    if packages:
        bootstrap = "import sys; sys.path.insert(0, %r)\n" % str(Path(packages).resolve())
    with tempfile.TemporaryDirectory(prefix="cert-study-") as folder:
        work = Path(folder)
        for article in manifest["articles"]:
            text = (ROOT / article["file"]).read_text(encoding="utf-8")
            blocks = re.findall(r"^```([^\n]+)\n(.*?)^```", text, re.M | re.S)
            language = article["language"]
            if language == "text":
                assert not blocks, article["file"]
                counts["reasoning"] += 1
                continue
            code_blocks = [code for tag, code in blocks if tag == language]
            assert len(code_blocks) == 1, article["file"]
            code = code_blocks[0]
            expected = article["expected_output"]
            assert [code for tag, code in blocks if tag == "text"] == [expected], article["file"]
            if language == "python":
                ast.parse(code, filename=article["file"], feature_version=(3, 9))
                output = run([sys.executable, "-X", "utf8", "-c", bootstrap + code], work)
            elif language == "sql":
                with sqlite3.connect(":memory:") as connection:
                    cursor = connection.execute(code)
                    rows = [list(row) for row in cursor.fetchall()]
                assert rows == article["expected_rows"], (article["file"], rows)
                counts[language] += 1
                continue
            elif language == "c":
                compiler = shutil.which("gcc") or shutil.which("clang")
                if not compiler:
                    counts["compiler_unavailable"] += 1
                    continue
                source = work / "example.c"
                source.write_text(code, encoding="utf-8")
                executable = work / ("example.exe" if os.name == "nt" else "example")
                run([compiler, "-std=c11", "-Wall", "-Wextra", "-Werror", str(source), "-o", str(executable)], work)
                output = run([str(executable)], work)
            elif language == "java":
                compiler, java = shutil.which("javac"), shutil.which("java")
                if not compiler or not java:
                    counts["compiler_unavailable"] += 1
                    continue
                source = work / "Main.java"
                source.write_text(code, encoding="utf-8")
                run([compiler, "--release", "8", "-encoding", "UTF-8", str(source)], work)
                output = run([java, "-cp", str(work), "Main"], work)
            else:
                raise AssertionError(language)
            assert output == expected, (article["file"], expected, output)
            counts[language] += 1
    if "--require-compilers" in sys.argv:
        assert counts["compiler_unavailable"] == 0, counts
    print(json.dumps(counts, ensure_ascii=False))


if __name__ == "__main__":
    main()
