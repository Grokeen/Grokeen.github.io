---
layout: content
title: "[정보처리기사 15] SQL WHERE와 NULL의 비교"
date: 2022-01-27 09:00:00 +0900
categories: [InformationProcessingCertification]
tags: [자격증학습, 정보처리기사]
series: study-certifications-2021-2023
study_track: information-processing
study_order: 15
study_unit: 3
permalink: /study/certifications/2021-2023/information-processing/15-sql-where-null/
---

NULL을 0이나 빈 문자열처럼 비교하지 않기로 했다. WHERE에 남는 것은 조건이 참인 행이다.

> 2021~2023년 정보처리기사 학습 범위의 개념을 정리한 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

SQL의 NULL은 알 수 없거나 값이 없는 상태를 표현한다. = NULL로 검사하지 않고 IS NULL을 사용한다. 비교 결과의 UNKNOWN은 WHERE에서 통과하지 않는다. ORDER BY가 없으면 반환 순서를 보장한다고 가정하지 않는다. 아래 코드는 메모리 SQLite로 실행 가능한 표준적인 조회 예제다.

## 예제 문제 · 창작

60점 이상인 행의 id를 오름차순으로 조회하라. NULL 점수는 조건 통과 여부를 어떻게 판단할까?

## 풀이와 판단 근거

id 2만 남는다. 59는 기준 미달이고 NULL >= 60은 참이 아니어서 WHERE를 통과하지 않는다. 실제 문제에서는 결측 점수를 0으로 처리하라는 별도 지시가 있는지 읽어야 한다. NULL 자체를 찾는 조건과 성적 조건을 구분한다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```sql
WITH scores(id, score) AS (VALUES (1, 59), (2, 60), (3, NULL))
SELECT id FROM scores WHERE score >= 60 ORDER BY id;
```
{% endraw %}

## 실행 결과

```text
id
2
```

## 헷갈린 부분과 주의점

NULL 비교를 거짓 하나로만 외우면 NOT과 OR에서 오류가 생긴다. 3값 논리와 필터의 참 조건을 나누어 이해한다.

## 복습 문제

NULL인 점수를 고르는 조건은?

**풀이:** score IS NULL이다. score = NULL로 검사하지 않는다.

## 참고한 문서

[개념·API의 원문 자료](https://www.sqlite.org/lang_expr.html)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/information-processing/14-relational-algebra/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/information-processing/16-sql-left-join/' | relative_url }})
