"""Check the published examples without executing hardware or administration commands."""

import ast
import configparser
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import sys
import tempfile


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "_docs" / "STUDY_2021_MANIFEST.json"


def normalize(text):
    return text.replace("\r\n", "\n")


def main():
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    executed = compiled = shells = configs = 0
    failures = []
    bash = os.environ.get("STUDY_BASH") or shutil.which("bash")
    if "--require-bash" in sys.argv and not bash:
        raise RuntimeError("bash is required for shell syntax checks")
    for article in manifest["articles"]:
        try:
            source = (ROOT / article["file"]).read_text(encoding="utf-8")
            blocks = re.findall(r"^```([^\n]+)\n(.*?)^```", source, re.M | re.S)
            examples = [code for language, code in blocks if language == article["language"]]
            assert len(examples) == 1, "expected one primary example"
            code = examples[0]
            with tempfile.TemporaryDirectory(prefix="study-2021-") as folder:
                if article["language"] == "python":
                    version = 7 if article["track"] == "raspberry-pi" else 9
                    ast.parse(code, feature_version=version)
                    compiled += 1
                    if article["mode"] == "run":
                        example = Path(folder) / "example.py"
                        example.write_text(code, encoding="utf-8")
                        env = dict(os.environ, PYTHONUTF8="1", PYTHONIOENCODING="utf-8")
                        result = subprocess.run(
                            [sys.executable, "-X", "utf8", str(example)],
                            cwd=folder,
                            input=article.get("stdin", ""),
                            text=True,
                            encoding="utf-8",
                            capture_output=True,
                            timeout=10,
                            env=env,
                        )
                        assert result.returncode == 0, result.stderr
                        expected = normalize(article["expected_output"])
                        assert normalize(result.stdout) == expected, (
                            "output differs: expected %r, got %r" % (expected, result.stdout)
                        )
                        shown = [text for language, text in blocks if language == "text"]
                        assert len(shown) == 1 and normalize(shown[0]) == expected, (
                            "published result differs from validated output"
                        )
                        executed += 1
                elif article["language"] == "bash" and bash:
                    example = Path(folder) / "example.sh"
                    example.write_bytes(code.encode("utf-8"))
                    result = subprocess.run(
                        [bash, "--noprofile", "--norc", "-n", example.as_posix()],
                        capture_output=True,
                        text=True,
                        encoding="utf-8",
                        timeout=10,
                    )
                    assert result.returncode == 0, result.stderr
                    shells += 1
                elif article["language"] == "ini":
                    config = configparser.ConfigParser(interpolation=None)
                    config.read_string(code)
                    assert config["Service"]["Type"] == "simple"
                    assert config["Service"]["ExecStart"].startswith("/")
                    configs += 1
                elif article["language"] == "cron":
                    entries = [line for line in code.splitlines() if line and not line.startswith("#")]
                    assert len(entries) == 1 and len(entries[0].split(maxsplit=5)) == 6
                    configs += 1
        except Exception as error:
            failures.append("%s: %s" % (article["file"], error))
    for failure in failures:
        print(failure, file=sys.stderr)
    print("Python syntax: %s; executed examples: %s; shell syntax: %s; config checks: %s" % (
        compiled, executed, shells, configs
    ))
    print("Hardware examples were compiled only; no GPIO, network, service or package commands were executed.")
    return bool(failures)


if __name__ == "__main__":
    sys.exit(main())
