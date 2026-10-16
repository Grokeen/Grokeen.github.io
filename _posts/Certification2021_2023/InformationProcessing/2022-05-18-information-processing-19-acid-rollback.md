---
layout: content
title: "[정보처리기사 19] ACID와 트랜잭션 롤백"
date: 2022-05-18 09:00:00 +0900
categories: [InformationProcessingCertification]
tags: [자격증학습, 정보처리기사]
series: study-certifications-2021-2023
study_track: information-processing
study_order: 19
study_unit: 4
permalink: /study/certifications/2021-2023/information-processing/19-acid-rollback/
---

중간 실패 때 일부 변경만 남지 않도록 트랜잭션 경계를 실습했다. ACID 각 성질이 보장하는 범위도 나누었다.

> 2021~2023년 정보처리기사 학습 범위의 개념을 정리한 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

원자성은 변경 묶음의 전부 또는 전무, 일관성은 정의한 제약을 만족하는 상태의 유지, 격리성은 동시 실행의 간섭 제어, 지속성은 확정 변경의 보존을 가리킨다. 구체 보장은 DBMS·격리 수준·설정·장애 가정에 따른다. 아래는 메모리 SQLite에서 실패 뒤 rollback을 확인한다.

## 예제 문제 · 창작

잔액을 100에서 50으로 바꾼 뒤 중복 기본 키 삽입이 실패했다. 전체 트랜잭션을 롤백하면 잔액은?

## 풀이와 판단 근거

100이다. 최초 데이터를 먼저 commit한 뒤 별도 변경에서 오류가 발생해 rollback한다. 예외가 났다는 사실만으로 모든 환경에서 모든 변경이 자동 취소된다고 가정하지 않고 명시적 경계와 드라이버 계약을 확인한다. 단일 연결 실습은 분산 트랜잭션을 검증하지 않는다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```python
import sqlite3
connection = sqlite3.connect(":memory:")
try:
    connection.execute("CREATE TABLE account (id INTEGER PRIMARY KEY, balance INTEGER)")
    connection.execute("INSERT INTO account VALUES (1, 100)")
    connection.commit()
    try:
        connection.execute("UPDATE account SET balance = 50 WHERE id = 1")
        connection.execute("INSERT INTO account VALUES (1, 0)")
        connection.commit()
    except sqlite3.IntegrityError:
        connection.rollback()
    print(connection.execute("SELECT balance FROM account WHERE id = 1").fetchone()[0])
finally:
    connection.close()
```
{% endraw %}

## 실행 결과

```text
100
```

## 헷갈린 부분과 주의점

rollback과 이미 commit한 과거 변경을 되돌리는 보상 거래는 다르다. 트랜잭션 밖의 이메일·파일 작업도 자동 취소되지 않는다.

## 복습 문제

commit 뒤 같은 트랜잭션의 rollback으로 이전 상태를 항상 복원할 수 있을까?

**풀이:** 이미 확정된 변경은 별도 정정·보상 절차가 필요할 수 있다.

## 참고한 문서

[개념·API의 원문 자료](https://www.sqlite.org/lang_transaction.html)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/information-processing/18-sql-not-exists/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/information-processing/20-indexes/' | relative_url }})
