---
layout: content
title: "[빅데이터분석기사 03] 표본 수와 대표성은 별개"
date: 2021-08-28 09:00:00 +0900
categories: [BigDataCertification]
tags: [자격증학습, 빅데이터분석기사]
series: study-certifications-2021-2023
study_track: big-data
study_order: 43
study_unit: 9
permalink: /study/certifications/2021-2023/big-data/03-sampling-bias/
---

표본이 많아도 모집단에서 빠진 집단이 있으면 편향이 남았다. 추출 틀부터 확인하는 습관을 적었다.

> Python 3.9·NumPy 1.20.3·pandas 1.2.5·SciPy 1.6.3·scikit-learn 0.24.2를 이용한 학습용 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

표본 추출은 어떤 모집단을 어떤 틀에서 어떤 확률로 뽑는지의 문제다. 자발적 응답, 비응답, 특정 채널만의 수집은 선택 편향을 만들 수 있다. 표본 수 증가로 표본 오차를 줄이더라도 구조적인 누락이 자동 해결되지는 않는다. 층화 추출은 층 내부 추출과 가중치 설계를 함께 다룬다.

## 예제 문제 · 창작

전체 이용자 만족도를 앱 배너 응답자 10만 명으로 조사했다. 앱을 쓰지 않는 이용자가 누락되었다면 큰 표본만으로 전체 대표성을 보장하는가?

## 풀이와 판단 근거

보장하지 않는다. 수집 경로가 모집단 일부를 배제하며 자발적 응답자의 특성도 다를 수 있다. 모집단 정의, 채널별 포괄 범위와 비응답 특성을 확인하고 가능한 표본 설계·가중치·민감도 분석을 검토한다. 보정만으로 관찰하지 못한 모든 편향을 제거했다고 주장하지 않는다.

## 헷갈린 부분과 주의점

확률 표본 여부와 응답 건수를 구분한다. 편의 표본에 확률 표본용 오차 한계를 기계적으로 붙이지 않는다.

## 복습 문제

무작위 분할을 하면 원자료의 선택 편향도 사라질까?

**풀이:** 아니다. 같은 편향을 가진 자료를 두 부분으로 나눌 뿐이다.

## 참고한 문서

[개념·API의 원문 자료](https://www.itl.nist.gov/div898/handbook/ppc/section3/ppc3.htm)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/big-data/02-measurement-scales/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/big-data/04-data-quality-contract/' | relative_url }})
