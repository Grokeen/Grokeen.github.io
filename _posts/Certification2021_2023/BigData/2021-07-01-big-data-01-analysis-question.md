---
layout: content
title: "[빅데이터분석기사 01] 분석 목적을 관측 단위와 목표 변수로 바꾸기"
date: 2021-07-01 09:00:00 +0900
categories: [BigDataCertification]
tags: [자격증학습, 빅데이터분석기사]
series: study-certifications-2021-2023
study_track: big-data
study_order: 41
study_unit: 9
permalink: /study/certifications/2021-2023/big-data/01-analysis-question/
---

좋은 점수보다 먼저 무엇을 예측할지 정했다. 한 행의 의미와 예측 시점이 없으면 같은 자료에서도 서로 다른 문제가 만들어졌다.

> Python 3.9·NumPy 1.20.3·pandas 1.2.5·SciPy 1.6.3·scikit-learn 0.24.2를 이용한 학습용 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

분석 기획에서는 의사결정, 분석 대상, 관측 단위, 목표 변수, 활용 시점을 함께 정의한다. 고객별 이탈 예측이라면 한 행이 고객인지 고객-월인지 정하고 이탈의 관찰 기간도 명시한다. 목표를 만든 기간의 정보를 입력 변수에 섞으면 미래 정보 누출이 생긴다. 예측 모델은 인과 효과 추정과도 목적이 다르다.

## 예제 문제 · 창작

6월 말의 정보로 7월 이탈을 예측한다. 입력 후보는 6월 이용 횟수와 7월 해지 처리 결과다. 사용할 수 있는 것은?

## 풀이와 판단 근거

실제 예측 시점에 확인 가능한 6월 이용 횟수를 후보로 쓴다. 7월 해지 처리 결과는 목표 기간의 정보이므로 제외한다. 이탈 정의, 고객별 중복 행 여부, 실제 알림에 쓸 운영 시간도 명세에 적어야 재현 가능한 분석 문제가 된다.

## 헷갈린 부분과 주의점

목표 변수와 강한 상관이 있다는 이유만으로 미래에 만들어지는 필드를 입력에 넣지 않는다.

## 복습 문제

같은 고객의 여러 달 기록이 있으면 무작위 행 분할만으로 충분할까?

**풀이:** 고객이나 시간에 따른 정보 공유가 있어 그룹·시간 분할을 검토해야 한다.

## 참고한 문서

[한국데이터산업진흥원 2022 자격검정 안내](https://www.dataq.or.kr/www/dataq_brochure_2022.pdf)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/information-processing/40-hash-encryption-auth/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/big-data/02-measurement-scales/' | relative_url }})
