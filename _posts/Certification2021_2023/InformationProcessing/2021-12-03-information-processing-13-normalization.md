---
layout: content
title: "[정보처리기사 13] 1NF·2NF·3NF와 분해 목적"
date: 2021-12-03 09:00:00 +0900
categories: [InformationProcessingCertification]
tags: [자격증학습, 정보처리기사]
series: study-certifications-2021-2023
study_track: information-processing
study_order: 13
study_unit: 3
permalink: /study/certifications/2021-2023/information-processing/13-normalization/
---

정규형 이름보다 중복이 어떤 갱신 이상을 만드는지 사례로 살폈다. 분해 뒤 원래 관계를 복원할 수 있는지도 중요했다.

> 2021~2023년 정보처리기사 학습 범위의 개념을 정리한 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

1NF는 관계의 속성 값이 해당 도메인에서 원자적이라는 관점이다. 2NF는 1NF를 만족하고 비주요 속성이 후보 키에 부분 종속하지 않게 한다. 3NF는 각 비자명 함수 종속에서 결정자가 슈퍼키이거나 종속 속성이 주요 속성인 조건으로 설명할 수 있다. 단순 이행 종속 제거 설명은 키·주요 속성 조건을 생략하지 않아야 한다.

## 예제 문제 · 창작

(학번, 과목)이 키인 수강표에 학생명이 반복되고 학번 → 학생명이 있다. 학생 정보를 별도 표로 분리하면 어떤 이상을 줄일 수 있을까?

## 풀이와 판단 근거

학생명 정정 때 여러 수강 행을 모두 바꾸어야 하는 갱신 이상을 줄일 수 있다. 학생이 아직 수강하지 않아도 학생 정보를 넣는 삽입 문제와 마지막 수강 삭제로 학생 정보까지 사라지는 삭제 문제도 분리할 수 있다. 무손실 조인과 필요한 종속 보존을 함께 점검한다.

## 헷갈린 부분과 주의점

정규화가 조회 성능을 언제나 높인다는 뜻은 아니다. 반정규화는 성능 근거와 일관성 유지 비용을 검토한 뒤 선택한다.

## 복습 문제

관계를 나누기만 하면 무손실 분해일까?

**풀이:** 원래 정보와 관계를 정확히 복원할 수 있는 조건을 확인해야 한다.

## 참고한 문서

[Q-Net 당시 출제기준](https://q-net.or.kr/cst006.do?id=cst00602&gSite=Q&gId=&artlSeq=5205254&brdId=Q006&code=1202)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/information-processing/12-functional-dependency/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/information-processing/14-relational-algebra/' | relative_url }})
