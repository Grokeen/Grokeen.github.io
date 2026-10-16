---
layout: content
title: "[정보처리기사 11] 기본 키·후보 키·외래 키와 ER 관계"
date: 2021-10-08 09:00:00 +0900
categories: [InformationProcessingCertification]
tags: [자격증학습, 정보처리기사]
series: study-certifications-2021-2023
study_track: information-processing
study_order: 11
study_unit: 3
permalink: /study/certifications/2021-2023/information-processing/11-keys-er/
---

테이블의 번호 열을 모두 같은 키라고 부르지 않기로 했다. 유일성과 최소성, 참조 관계를 나누어 이해했다.

> 2021~2023년 정보처리기사 학습 범위의 개념을 정리한 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

후보 키는 행을 유일하게 식별하면서 불필요한 속성이 없는 최소 슈퍼키다. 기본 키는 후보 키 중 선택한 대표 키다. 외래 키는 다른 행의 참조 대상 키와 관계를 유지하는 제약이다. 관계의 선택성·다중성은 실제 요구에서 정하며 외래 키가 있다는 이유만으로 항상 일대일은 아니다.

## 예제 문제 · 창작

학생 테이블의 학번이 유일하고 NULL이 아니며, 수강 테이블에 같은 학번이 여러 번 나타난다. 수강의 학번은 학생의 학번을 참조한다. 두 테이블의 해당 열 역할을 설명하라.

## 풀이와 판단 근거

학생 학번은 기본 키로 선택할 수 있고 수강의 학번은 외래 키 역할이다. 수강에는 같은 학생의 여러 과목이 있어 외래 키 값이 반복될 수 있다. 수강 행 자체를 식별할 키는 학생·과목 조합 등 별도로 정의해야 한다. 실제 설계에서는 같은 과목의 학기·재수강도 고려한다.

## 헷갈린 부분과 주의점

외래 키 열이 무조건 유일해야 한다고 생각하지 않는다. NULL 허용과 참조 삭제 동작은 명시한 제약과 DBMS 정책을 확인한다.

## 복습 문제

학번과 이름이 함께 유일해도 학번만 이미 유일하면 둘의 조합은 후보 키일까?

**풀이:** 불필요한 이름을 빼도 유일하므로 최소성을 만족하지 않아 후보 키가 아닌 슈퍼키다.

## 참고한 문서

[개념·API의 원문 자료](https://www.postgresql.org/docs/13/ddl-constraints.html)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/information-processing/10-configuration-management/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/information-processing/12-functional-dependency/' | relative_url }})
