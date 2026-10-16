---
layout: content
title: "[파이썬 공부 45] with와 UTF-8로 텍스트 파일 읽고 쓰기"
date: 2021-05-30 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 45
study_unit: 4
permalink: /study/2021/python/45-text-files/
---

파일을 쓴 뒤 다시 읽는 예제를 만들었다. 실습 파일이 남지 않도록 임시 폴더 안에서 작업했다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

open의 w 모드는 파일을 새로 쓰며 기존 내용을 덮어쓴다. a는 이어 쓰기, r은 읽기다. with 블록이 끝나면 예외가 나더라도 파일 객체를 닫는다. 텍스트 인코딩을 utf-8로 명시해 환경 기본값에 따라 한글이 다르게 저장되는 문제를 줄인다.

## 따라 해 보기

{% raw %}
```python
from pathlib import Path
from tempfile import TemporaryDirectory

with TemporaryDirectory() as folder:
    path = Path(folder) / "note.txt"
    with path.open("w", encoding="utf-8") as file:
        file.write("변수\n함수\n")
    with path.open("r", encoding="utf-8") as file:
        topics = file.read().splitlines()
    print(topics)
```
{% endraw %}

## 실행 결과

```text
['변수', '함수']
```

## 코드를 따라 읽기

TemporaryDirectory는 실습용 폴더를 만들고 끝나면 정리한다. 안쪽 with는 파일을 열고 닫는다. write에 넣은 줄바꿈은 파일에 저장되고 splitlines는 줄 경계를 기준으로 목록을 만든다. 읽기 전에 쓰기 블록이 끝나므로 버퍼가 닫힌 상태에서 내용을 확인한다.

## 헷갈린 부분과 주의점

w 모드로 중요한 기존 파일을 열면 내용이 사라진다. write는 자동 줄바꿈을 붙이지 않으므로 필요한 줄바꿈을 직접 적어야 한다.

## 복습 문제

두 번째 기록을 보존하며 추가하려면 어떤 모드가 필요할까?

**풀이:** a 모드를 사용한다. 실제 경로와 기존 파일 내용을 확인한 뒤 선택한다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/tutorial/inputoutput.html#reading-and-writing-files)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: pathlib로 경로를 문자열 덧셈 대신 조합하기]({{ '/study/2021/python/44-pathlib/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: csv 모듈로 표 데이터를 안전하게 읽기 →]({{ '/study/2021/python/46-csv/' | relative_url }})
