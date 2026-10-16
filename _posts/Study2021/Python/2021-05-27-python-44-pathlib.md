---
layout: content
title: "[파이썬 공부 44] pathlib로 경로를 문자열 덧셈 대신 조합하기"
date: 2021-05-27 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 44
study_unit: 4
permalink: /study/2021/python/44-pathlib/
---

운영체제마다 다른 경로 구분자를 직접 이어 붙이지 않기로 했다. 파일을 만들지 않고 경로의 구성 요소부터 확인했다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

Path는 운영체제에 맞는 파일 경로 객체다. / 연산자로 하위 경로를 연결하고 name·stem·suffix·parent 속성으로 부분을 읽는다. 경로 객체를 생성하는 것만으로 파일이나 폴더가 생기지는 않는다. 파일 존재 확인과 실제 생성은 별도 동작이다.

## 따라 해 보기

{% raw %}
```python
from pathlib import Path

path = Path("records") / "day01.csv"
print(path.name)
print(path.stem)
print(path.suffix)
print(path.parent.name)
print(path.with_suffix(".json").name)
```
{% endraw %}

## 실행 결과

```text
day01.csv
day01
.csv
records
day01.json
```

## 코드를 따라 읽기

/는 여기서 숫자 나눗셈이 아니라 경로 결합이다. stem은 마지막 확장자를 뺀 이름이고 suffix에는 점이 포함된다. with_suffix는 새 경로를 돌려주며 파일을 실제로 변환하거나 이름을 바꾸지는 않는다. 경로 처리와 파일 작업을 나누어 이해했다.

## 헷갈린 부분과 주의점

상대 경로는 스크립트 위치가 아니라 현재 작업 디렉터리 기준이다. 파일명을 바꾸는 rename과 경로 객체만 바꾸는 with_name을 혼동하지 않는다.

## 복습 문제

archive.tar.gz의 suffix와 stem은?

**풀이:** suffix는 .gz이고 stem은 archive.tar다. 여러 확장자는 suffixes로 확인할 수 있다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/library/pathlib.html)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: str과 bytes, UTF-8 인코딩 구분하기]({{ '/study/2021/python/43-bytes-encoding/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: with와 UTF-8로 텍스트 파일 읽고 쓰기 →]({{ '/study/2021/python/45-text-files/' | relative_url }})
