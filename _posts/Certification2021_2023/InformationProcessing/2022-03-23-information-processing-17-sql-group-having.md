---
layout: content
title: "[정보처리기사 17] GROUP BY·HAVING과 COUNT의 NULL 처리"
date: 2022-03-23 09:00:00 +0900
categories: [InformationProcessingCertification]
tags: [자격증학습, 정보처리기사]
series: study-certifications-2021-2023
study_track: information-processing
study_order: 17
study_unit: 4
permalink: /study/certifications/2021-2023/information-processing/17-sql-group-having/
---

집계 전 행 조건과 집계 뒤 그룹 조건을 나누었다. COUNT(*)와 COUNT(열)도 다르게 계산됐다.

> 2021~2023년 정보처리기사 학습 범위의 개념을 정리한 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

WHERE는 집계 전 행을 거르고 HAVING은 그룹의 집계 결과를 필터링한다. COUNT(*)는 행 수, COUNT(column)은 해당 열이 NULL이 아닌 행 수를 센다. 그룹화하지 않은 열을 무분별하게 SELECT하는 비표준·DBMS 확장에 기대지 않는다. 집계 기준과 데이터 단위를 먼저 확인한다.

## 예제 문제 · 창작

A 그룹에 값 10과 NULL, B 그룹에 20이 있다. 행 수가 2 이상인 그룹의 행 수와 비NULL 값 수를 구하라.

## 풀이와 판단 근거

A, 2, 1이다. A에는 두 행이 있지만 실제 숫자는 하나다. HAVING COUNT(*) >= 2가 B를 제외한다. AVG도 일반적으로 NULL을 제외하므로 평균 분모를 전체 행 수로 잘못 계산하지 않도록 한다. 결측을 포함할 정책이면 별도 변환을 명시한다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```sql
WITH data(dept, value) AS (VALUES ('A', 10), ('A', NULL), ('B', 20))
SELECT dept, COUNT(*), COUNT(value) FROM data
GROUP BY dept HAVING COUNT(*) >= 2 ORDER BY dept;
```
{% endraw %}

## 실행 결과

```text
dept | rows | non_null
A | 2 | 1
```

## 헷갈린 부분과 주의점

WHERE에 COUNT(*)를 그대로 쓸 수 있다고 생각하지 않는다. 집계 시점과 별칭 사용 가능 범위는 DBMS 문법을 확인한다.

## 복습 문제

A의 SUM(value)은 NULL 때문에 무조건 NULL일까?

**풀이:** 값 10이 있으므로 일반적인 집계 규칙에서는 NULL을 제외해 10이 된다.

## 참고한 문서

[개념·API의 원문 자료](https://www.sqlite.org/lang_aggfunc.html)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/information-processing/16-sql-left-join/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/information-processing/18-sql-not-exists/' | relative_url }})
