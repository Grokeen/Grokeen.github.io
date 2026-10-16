---
layout: content
title: "[빅데이터분석기사 18] 유의수준·p값·오류 종류"
date: 2022-11-11 09:00:00 +0900
categories: [BigDataCertification]
tags: [자격증학습, 빅데이터분석기사]
series: study-certifications-2021-2023
study_track: big-data
study_order: 58
study_unit: 11
permalink: /study/certifications/2021-2023/big-data/18-pvalue-errors/
---

작은 p값을 효과가 크다는 뜻으로 읽지 않기로 했다. 귀무가설과 검정 방향을 먼저 적었다.

> Python 3.9·NumPy 1.20.3·pandas 1.2.5·SciPy 1.6.3·scikit-learn 0.24.2를 이용한 학습용 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

p값은 귀무가설과 모형 가정 아래 관찰값 이상으로 극단적인 검정통계량을 얻을 확률이다. 귀무가설이 참일 확률이 아니다. 제1종 오류는 참인 귀무가설을 기각, 제2종 오류는 거짓인 귀무가설을 기각하지 못하는 것이다. 유의수준은 사전에 정하고 효과 크기와 불확실성도 함께 보고한다.

## 예제 문제 · 창작

유의수준 0.05인 양측 검정에서 p=0.08이다. ①귀무가설이 92% 확률로 참이다 ②해당 기준에서 기각하지 못한다 중 적절한 해석은?

## 풀이와 판단 근거

②다. 기각하지 못함은 동일성이나 효과 없음의 증명이 아니다. 표본 수가 작아 검정력이 부족할 수도 있다. 여러 가설을 시험한 뒤 유리한 것만 고르면 제1종 오류 통제가 무너지므로 다중 비교와 사전 계획을 검토해야 한다.

## 헷갈린 부분과 주의점

관측 후 단측·양측을 바꾸거나 유의수준을 올려 결론을 맞추지 않는다.

## 복습 문제

p=0.001이면 반드시 업무 효과도 클까?

**풀이:** 아니다. 큰 표본에서는 작은 효과도 작은 p값이 나올 수 있어 효과 크기를 함께 본다.

## 참고한 문서

[개념·API의 원문 자료](https://www.itl.nist.gov/div898/handbook/prc/section1/prc131.htm)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/big-data/17-mean-confidence-interval/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/big-data/19-one-sample-t/' | relative_url }})
