---
layout: content
title: "[파이썬 공부 69] argparse로 명령행 옵션 읽기"
date: 2021-08-18 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 69
study_unit: 6
permalink: /study/2021/python/69-argparse/
---

코드를 고치지 않고 실행 옵션으로 측정 횟수를 바꾸는 구조를 만들었다. 인자 오류와 도움말을 직접 구현하지 않아도 됐다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

ArgumentParser에 옵션 이름과 자료형·기본값을 등록하고 parse_args로 해석한다. 실제 명령행은 `parse_args()`로 읽는다. 예제는 실행 결과를 고정하기 위해 옵션 목록을 직접 넘긴다. type=int는 정수 변환을 하며 양수 여부 같은 추가 규칙은 별도로 검사해야 한다.

## 따라 해 보기

{% raw %}
```python
import argparse

parser = argparse.ArgumentParser(description="측정 옵션 연습")
parser.add_argument("--count", type=int, default=3)
parser.add_argument("--unit", choices=["C", "F"], default="C")
args = parser.parse_args(["--count", "5", "--unit", "F"])
print(args.count, args.unit)
print(parser.parse_args([]).count)
```
{% endraw %}

## 실행 결과

```text
5 F
3
```

## 코드를 따라 읽기

명시한 count 5와 unit F가 읽힌다. 빈 목록으로 해석하면 기본 count 3을 얻는다. 프로그램 파일에서 `parse_args()`로 바꾸면 python3 example.py --count 5처럼 실행할 수 있다. --help 도움말은 argparse가 만들어 준다.

## 헷갈린 부분과 주의점

type=bool로 `"False"` 문자열을 읽으면 기대와 다를 수 있다. 단순 켜기 옵션은 action=`"store_true"` 같은 전용 방식을 사용한다.

## 복습 문제

--unit K를 전달하면 어떤 일이 생길까?

**풀이:** choices 범위를 벗어나 argparse가 사용법과 오류를 알리고 종료한다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/library/argparse.html)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: logging으로 실행 수준별 기록 남기기]({{ '/study/2021/python/68-logging/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: sqlite3로 값 바인딩과 조회 연습하기 →]({{ '/study/2021/python/70-sqlite/' | relative_url }})
