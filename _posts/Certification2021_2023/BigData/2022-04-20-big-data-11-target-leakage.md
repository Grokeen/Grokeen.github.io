---
layout: content
title: "[빅데이터분석기사 11] 데이터 누출을 시점과 처리 순서에서 찾기"
date: 2022-04-20 09:00:00 +0900
categories: [BigDataCertification]
tags: [자격증학습, 빅데이터분석기사]
series: study-certifications-2021-2023
study_track: big-data
study_order: 51
study_unit: 10
permalink: /study/certifications/2021-2023/big-data/11-target-leakage/
---

높은 점수의 원인을 먼저 의심해 보았다. 분할 전 전체 자료로 선택한 변수도 누출 경로가 될 수 있었다.

> Python 3.9·NumPy 1.20.3·pandas 1.2.5·SciPy 1.6.3·scikit-learn 0.24.2를 이용한 학습용 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

누출은 실제 예측 시점에 없는 정보나 평가 자료의 정보가 학습·모델 선택에 들어가는 문제다. 결과 처리일, 사후 확정 금액 같은 필드는 목표를 직접 드러낼 수 있다. 전체 자료로 결측 대치·변수 선택을 끝낸 후 교차 검증하면 검증 폴드도 변환 학습에 참여한다. Pipeline은 폴드 안에서 fit이 일어나도록 구성하는 데 도움이 된다.

## 예제 문제 · 창작

전체 자료에서 목표와 상관이 큰 상위 5개 변수를 선택한 뒤 그 자료를 교차 검증했다. 누출이 생길 수 있는 단계는?

## 풀이와 판단 근거

상관을 계산해 변수를 고르는 단계다. 검증 폴드의 목표도 선택에 쓰였다. 특성 선택기를 파이프라인 안에 넣고 각 훈련 폴드에서만 학습하도록 바꾼다. 시간상 사용 불가능한 변수는 파이프라인에 넣는 것만으로 해결되지 않아 기획 단계에서 제외해야 한다.

## 헷갈린 부분과 주의점

Pipeline이라는 이름만으로 미래 변수나 잘못된 분할까지 안전해지지는 않는다.

## 복습 문제

결과 확정 뒤 만들어진 필드가 성능을 크게 높이면 그대로 써도 될까?

**풀이:** 예측 시점에 없으면 사용할 수 없다. 데이터 생성 시점을 확인한다.

## 참고한 문서

[개념·API의 원문 자료](https://scikit-learn.org/0.24/common_pitfalls.html)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/big-data/10-stratified-split/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/big-data/12-group-time-validation/' | relative_url }})
