---
layout: content
title: "[정보처리기사 12] 함수 종속과 결정자"
date: 2021-11-05 09:00:00 +0900
categories: [InformationProcessingCertification]
tags: [자격증학습, 정보처리기사]
series: study-certifications-2021-2023
study_track: information-processing
study_order: 12
study_unit: 3
permalink: /study/certifications/2021-2023/information-processing/12-functional-dependency/
---

샘플 데이터에서 우연히 값이 같다는 것과 업무 규칙상 종속된다는 것을 구분했다.

> 2021~2023년 정보처리기사 학습 범위의 개념을 정리한 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

X → Y는 같은 X 값이 주어지면 Y 값이 하나로 정해지는 함수 종속을 뜻한다. 현재 표 몇 행만 보고 모든 가능한 상태의 종속을 확정할 수는 없다. 종속은 업무 의미와 제약을 바탕으로 정한다. 완전·부분·이행 종속은 정규화에서 이상 현상을 분석하는 기준이 된다.

## 예제 문제 · 창작

관계 R(학번, 과목, 학생명, 성적)의 키가 (학번, 과목)이고 학번 → 학생명이 성립한다. 학생명은 키 전체에 완전 함수 종속일까?

## 풀이와 판단 근거

아니다. 키 일부인 학번만으로 학생명이 결정되므로 주어진 복합 키에 대한 부분 함수 종속이다. 성적이 학번·과목 전체로 정해지는지는 별도 업무 가정이다. 표에 한 학생이 한 과목만 있다고 해서 과목만으로 학생명이 정해진다고 추론하면 안 된다.

## 헷갈린 부분과 주의점

결정자가 반드시 기본 키인 것은 아니다. 특정 데이터 표본에서 우연히 유일한 값과 모든 유효 상태에서 유지되는 제약을 구분한다.

## 복습 문제

X → Y와 Y → Z가 있으면 X → Z를 추론할 수 있을까?

**풀이:** 함수 종속의 이행 규칙으로 추론할 수 있다. 정규형 판단에는 키와 자명성 등 추가 조건도 본다.

## 참고한 문서

[Q-Net 당시 출제기준](https://q-net.or.kr/cst006.do?id=cst00602&gSite=Q&gId=&artlSeq=5205254&brdId=Q006&code=1202)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/information-processing/11-keys-er/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/information-processing/13-normalization/' | relative_url }})
