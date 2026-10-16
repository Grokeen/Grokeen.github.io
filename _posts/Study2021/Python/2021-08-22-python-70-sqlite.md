---
layout: content
title: "[파이썬 공부 70] sqlite3로 값 바인딩과 조회 연습하기"
date: 2021-08-22 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 70
study_unit: 6
permalink: /study/2021/python/70-sqlite/
---

측정값을 표 형태로 저장하고 조건에 맞는 행을 조회했다. SQL 문자열에 값을 직접 이어 붙이지 않는 습관을 먼저 익혔다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

sqlite3는 파일 기반 데이터베이스와 메모리 데이터베이스를 지원한다. execute의 ? 자리표시자에 별도 튜플로 값을 전달하면 SQL 구문과 데이터를 분리한다. commit은 트랜잭션의 변경을 확정하고 close는 연결을 닫는다. 연결의 with는 트랜잭션을 관리하지만 연결을 자동으로 닫는 도구는 아니다.

## 따라 해 보기

{% raw %}
```python
import sqlite3

connection = sqlite3.connect(":memory:")
try:
    connection.execute("CREATE TABLE readings (name TEXT, value REAL)")
    connection.execute("INSERT INTO readings VALUES (?, ?)", ("실내", 23.5))
    connection.commit()
    rows = connection.execute("SELECT name, value FROM readings WHERE value > ?", (20,)).fetchall()
    print(rows)
finally:
    connection.close()
```
{% endraw %}

## 실행 결과

```text
[('실내', 23.5)]
```

## 코드를 따라 읽기

메모리 데이터베이스라 디스크 파일을 남기지 않는다. 장소와 숫자를 별도 값으로 전달하고, 조회 조건의 20도 바인딩한다. 값 하나의 튜플은 (20,)처럼 쉼표가 필요하다. try/finally로 연결을 닫아 자원 수명도 명확히 했다.

## 헷갈린 부분과 주의점

자리표시자로 테이블 이름 같은 SQL 식별자를 바인딩할 수는 없다. fetchall은 모든 결과를 메모리에 가져오므로 큰 결과는 나누어 처리한다.

## 복습 문제

SQL 값에 작은따옴표가 있어도 문자열 덧셈으로 직접 감싸야 할까?

**풀이:** 아니다. 자리표시자와 값 바인딩을 사용하면 드라이버가 데이터로 처리한다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/library/sqlite3.html)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: argparse로 명령행 옵션 읽기]({{ '/study/2021/python/69-argparse/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: subprocess.run으로 외부 프로그램 결과 받기 →]({{ '/study/2021/python/71-subprocess/' | relative_url }})
