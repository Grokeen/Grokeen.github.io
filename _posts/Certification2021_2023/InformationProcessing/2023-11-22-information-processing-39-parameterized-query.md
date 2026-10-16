---
layout: content
title: "[정보처리기사 39] SQL 바인딩과 출력 문맥별 방어"
date: 2023-11-22 09:00:00 +0900
categories: [InformationProcessingCertification]
tags: [자격증학습, 정보처리기사]
series: study-certifications-2021-2023
study_track: information-processing
study_order: 39
study_unit: 8
permalink: /study/certifications/2021-2023/information-processing/39-parameterized-query/
---

사용자 입력이 SQL 명령의 일부가 되지 않도록 값 바인딩을 연습했다. 브라우저 출력 방어와 DB 질의 방어는 적용 위치가 달랐다.

> 2021~2023년 정보처리기사 학습 범위의 개념을 정리한 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

SQL 매개변수 바인딩은 질의 구조와 값을 분리한다. 입력을 문자열로 이어 붙여 질의를 만드는 습관을 피한다. 테이블명 같은 식별자는 값 자리표시자로 대신할 수 없으므로 허용 목록 등 별도 설계가 필요하다. XSS 대응은 HTML·속성·스크립트 등 출력 문맥에 맞는 인코딩과 안전한 DOM API를 사용한다.

## 예제 문제 · 창작

합성 자료에 O'Brien이라는 이름이 있다. 작은따옴표를 직접 SQL에 연결하지 않고 정확히 일치하는 행을 찾는 방법을 작성하라.

## 풀이와 판단 근거

sqlite3의 ? 자리에 값 튜플을 전달한다. 따옴표가 포함된 문자열도 하나의 값으로 취급되어 행 한 개를 찾는다. 수동 따옴표 치환에 의존하는 것보다 DB 드라이버의 바인딩 규칙을 따르는 편이 일관된다. 이 예제는 메모리 DB 안에서만 동작한다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```python
import sqlite3

connection = sqlite3.connect(":memory:")
try:
    connection.execute("CREATE TABLE people(name TEXT)")
    connection.execute("INSERT INTO people VALUES (?)", ("O'Brien",))
    rows = connection.execute(
        "SELECT name FROM people WHERE name = ?", ("O'Brien",)
    ).fetchall()
    print(rows[0][0])
finally:
    connection.close()
```
{% endraw %}

## 실행 결과

```text
O'Brien
```

## 헷갈린 부분과 주의점

SQL 매개변수를 썼다고 웹 화면의 XSS까지 해결되지 않는다. 인증·권한 검사와 데이터 유효성 검증도 각각 필요하다.

## 복습 문제

ORDER BY에 쓸 컬럼명도 ?로 전달하면 될까?

**풀이:** 일반적인 값 바인딩으로 식별자를 대체할 수 없다. 미리 허용한 컬럼명을 매핑하는 방식 등을 사용한다.

## 참고한 문서

[개념·API의 원문 자료](https://docs.python.org/3.9/library/sqlite3.html) · [추가 공식 자료 1](https://owasp.org/www-community/attacks/xss/)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/information-processing/38-http-semantics/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/information-processing/40-hash-encryption-auth/' | relative_url }})
