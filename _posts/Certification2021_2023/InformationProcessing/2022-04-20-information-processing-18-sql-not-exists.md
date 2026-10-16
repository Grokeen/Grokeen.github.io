---
layout: content
title: "[정보처리기사 18] NOT IN의 NULL 함정과 NOT EXISTS"
date: 2022-04-20 09:00:00 +0900
categories: [InformationProcessingCertification]
tags: [자격증학습, 정보처리기사]
series: study-certifications-2021-2023
study_track: information-processing
study_order: 18
study_unit: 4
permalink: /study/certifications/2021-2023/information-processing/18-sql-not-exists/
---

제외 목록에 NULL이 있을 때 결과가 달라지는 이유를 정리했다. 존재 여부 질문에는 EXISTS로 의도를 드러낼 수 있었다.

> 2021~2023년 정보처리기사 학습 범위의 개념을 정리한 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

NOT IN은 오른쪽 목록에 NULL이 있으면 비교 결과가 UNKNOWN이 되어 예상한 행을 못 얻을 수 있다. NOT EXISTS는 상관 조건에 맞는 행이 없는지 검사한다. 두 방식이 항상 같은 의미가 되려면 NULL과 상관 조건에 대한 전제를 확인해야 한다.

## 예제 문제 · 창작

대상 id 1·2·3에서 차단 목록의 2를 제외한다. 차단 목록에는 NULL도 있다. NOT EXISTS로 남는 id를 구하라.

## 풀이와 판단 근거

1과 3이다. b.id = a.id를 만족하는 행이 있는지 대상별로 검사한다. NULL은 이 동등 조건을 참으로 만들지 않으므로 모든 대상을 무조건 제외하지 않는다. NOT IN으로 바꾸면 NULL 때문에 결과가 달라질 수 있어 조건을 읽어야 한다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```sql
WITH allowed(id) AS (VALUES (1), (2), (3)),
blocked(id) AS (VALUES (2), (NULL))
SELECT a.id FROM allowed a
WHERE NOT EXISTS (SELECT 1 FROM blocked b WHERE b.id = a.id)
ORDER BY a.id;
```
{% endraw %}

## 실행 결과

```text
id
1
3
```

## 헷갈린 부분과 주의점

NOT EXISTS라고 모든 NULL 문제가 자동으로 해결되는 것은 아니다. 상관 조건과 대상 키의 NULL 허용 계약도 점검한다.

## 복습 문제

차단 목록이 비어 있으면 어떻게 될까?

**풀이:** 모든 대상에 대해 일치 행이 없으므로 대상 전체가 남는다.

## 참고한 문서

[개념·API의 원문 자료](https://www.postgresql.org/docs/13/functions-subquery.html)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/information-processing/17-sql-group-having/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/information-processing/19-acid-rollback/' | relative_url }})
