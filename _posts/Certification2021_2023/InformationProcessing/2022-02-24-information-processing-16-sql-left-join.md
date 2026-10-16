---
layout: content
title: "[정보처리기사 16] LEFT JOIN의 보존 행과 조건 위치"
date: 2022-02-24 09:00:00 +0900
categories: [InformationProcessingCertification]
tags: [자격증학습, 정보처리기사]
series: study-certifications-2021-2023
study_track: information-processing
study_order: 16
study_unit: 4
permalink: /study/certifications/2021-2023/information-processing/16-sql-left-join/
---

연결되지 않은 행을 남기는 외부 조인을 연습했다. ON과 WHERE에 조건을 두는 차이를 주의했다.

> 2021~2023년 정보처리기사 학습 범위의 개념을 정리한 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

LEFT JOIN은 왼쪽 행을 보존하고 짝이 없으면 오른쪽 열을 NULL로 확장한다. 이후 WHERE에서 오른쪽 열의 값을 필터링하면 그 NULL 확장 행이 다시 빠질 수 있다. 조인 키의 중복은 결과 행 수를 늘릴 수 있으므로 키 제약과 의도를 확인한다.

## 예제 문제 · 창작

id 1·2인 왼쪽 표와 id 1에만 이름 A가 있는 오른쪽 표를 LEFT JOIN한다. 결과 두 행을 적어라.

## 풀이와 판단 근거

(1,A), (2,NULL)이다. 두 번째 행도 보존된다. WHERE right.name = A를 추가하면 NULL 확장 행은 조건을 통과하지 못해 사라진다. 필요한 오른쪽 행 조건을 ON에 넣는 것과 최종 결과를 WHERE로 거르는 것은 목적이 다르다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```sql
WITH left_data(id) AS (VALUES (1), (2)),
right_data(id, name) AS (VALUES (1, 'A'))
SELECT l.id, r.name FROM left_data l
LEFT JOIN right_data r ON l.id = r.id ORDER BY l.id;
```
{% endraw %}

## 실행 결과

```text
id | name
1 | A
2 | NULL
```

## 헷갈린 부분과 주의점

LEFT JOIN을 썼다는 이유만으로 왼쪽 행이 최종 결과에 항상 남는다고 생각하지 않는다. 뒤의 조건과 집계도 확인한다.

## 복습 문제

오른쪽 키 1이 두 행이면 왼쪽 id 1 결과는?

**풀이:** 일치하는 조합이 두 개 생겨 두 행으로 늘어날 수 있다.

## 참고한 문서

[개념·API의 원문 자료](https://www.postgresql.org/docs/13/queries-table-expressions.html)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/information-processing/15-sql-where-null/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/information-processing/17-sql-group-having/' | relative_url }})
