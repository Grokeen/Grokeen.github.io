"""Check the arithmetic printed in the local-tax lessons, not legal eligibility."""

import ast
from fractions import Fraction
import json
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]


def calculate(node):
    if isinstance(node, ast.Expression):
        return calculate(node.body)
    if isinstance(node, ast.Constant) and type(node.value) in (int, float):
        return Fraction(str(node.value))
    if isinstance(node, ast.BinOp):
        left, right = calculate(node.left), calculate(node.right)
        if isinstance(node.op, ast.Add):
            return left + right
        if isinstance(node.op, ast.Sub):
            return left - right
        if isinstance(node.op, ast.Mult):
            return left * right
        if isinstance(node.op, ast.Div):
            return left / right
    raise ValueError("Only numeric arithmetic is allowed")


def main():
    manifest = json.loads((ROOT / "_docs/LOCAL_TAX_2022_MANIFEST.json").read_text(encoding="utf-8"))
    checked = 0
    for article in manifest["articles"]:
        markdown = (ROOT / article["file"]).read_text(encoding="utf-8")
        matches = re.findall(r"\*\*숫자로 다시 확인:\*\* `([^`]+) = ([^`]+)`", markdown)
        if "calculation" not in article:
            assert not matches, article["file"]
            continue
        assert len(matches) == 1, article["file"]
        expression, shown = matches[0]
        assert expression == article["calculation"]["expression"], article["file"]
        assert shown == article["calculation"]["expected"], article["file"]
        result = calculate(ast.parse(expression, mode="eval"))
        assert result == Fraction(shown), (article["file"], result, shown)
        checked += 1
    print(json.dumps({"articles": len(manifest["articles"]), "arithmetic_examples": checked,
                      "scope": "Arithmetic only; legal conditions require source review"}))


if __name__ == "__main__":
    main()
