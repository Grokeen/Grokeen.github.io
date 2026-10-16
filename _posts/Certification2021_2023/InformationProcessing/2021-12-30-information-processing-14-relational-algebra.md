---
layout: content
title: "[정보처리기사 14] 선택·투영·조인의 연산 대상"
date: 2021-12-30 09:00:00 +0900
categories: [InformationProcessingCertification]
tags: [자격증학습, 정보처리기사]
series: study-certifications-2021-2023
study_track: information-processing
study_order: 14
study_unit: 3
permalink: /study/certifications/2021-2023/information-processing/14-relational-algebra/
---

행을 고르는 것과 열을 고르는 것을 혼동하지 않으려고 작은 표를 머릿속으로 나누어 보았다.

> 2021~2023년 정보처리기사 학습 범위의 개념을 정리한 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

관계대수의 선택은 조건에 맞는 튜플을, 투영은 지정 속성을 취한다. 조인은 관계 사이 조건에 맞게 결합한다. 순수 관계 모델은 집합 의미여서 투영에서 중복이 제거되지만 SQL은 기본적으로 중복을 유지할 수 있다. SQL의 SELECT라는 단어와 관계대수 선택을 문자 그대로 같은 것으로 외우지 않는다.

## 예제 문제 · 창작

관계 R(학번, 학과)에 (1,A), (2,A), (3,B)가 있다. 학과=A인 행을 선택한 뒤 학과만 투영하면 집합 의미의 결과는?

## 풀이와 판단 근거

{A}다. 선택 뒤 두 행이 남지만 학과만 투영하면 같은 값이 중복되어 집합에서는 하나만 남는다. SQL에서 SELECT 학과만 실행하면 두 A가 나올 수 있으며 DISTINCT를 써야 중복 제거 의미가 드러난다. 모델과 실제 SQL의 차이를 함께 적었다.

## 헷갈린 부분과 주의점

투영을 단순히 화면 열을 숨기는 동작과 동일시하면 중복 의미를 놓칠 수 있다. 연산의 결과 스키마도 확인한다.

## 복습 문제

SELECT DISTINCT 학과는 어떤 관계대수 연산과 가까울까?

**풀이:** 중복을 제거한 속성 투영과 가깝다.

## 참고한 문서

[개념·API의 원문 자료](https://www.postgresql.org/docs/13/queries-select-lists.html)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/information-processing/13-normalization/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/information-processing/15-sql-where-null/' | relative_url }})
