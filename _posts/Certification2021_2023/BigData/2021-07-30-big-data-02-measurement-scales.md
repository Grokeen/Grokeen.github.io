---
layout: content
title: "[빅데이터분석기사 02] 명목·서열·등간·비율 척도"
date: 2021-07-30 09:00:00 +0900
categories: [BigDataCertification]
tags: [자격증학습, 빅데이터분석기사]
series: study-certifications-2021-2023
study_track: big-data
study_order: 42
study_unit: 9
permalink: /study/certifications/2021-2023/big-data/02-measurement-scales/
---

숫자처럼 생긴 코드가 계산 가능한 수량은 아니었다. 값의 표현과 측정 척도를 따로 판단했다.

> Python 3.9·NumPy 1.20.3·pandas 1.2.5·SciPy 1.6.3·scikit-learn 0.24.2를 이용한 학습용 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

명목 척도는 범주 구분, 서열 척도는 순서, 등간 척도는 차이의 비교, 비율 척도는 의미 있는 절대 영점과 비율 비교가 가능하다는 점으로 구별한다. 우편번호나 부서 코드는 숫자로 저장되어도 평균의 해석이 없다. 분석 방법은 척도뿐 아니라 분포와 수집 설계도 고려해 선택한다.

## 예제 문제 · 창작

부서 코드 10·20·30, 만족도 낮음·보통·높음, 섭씨 온도, 배송 소요 시간은 각각 어떤 척도인가?

## 풀이와 판단 근거

차례로 명목, 서열, 등간, 비율 척도로 볼 수 있다. 만족도 단계 사이 간격이 반드시 같지는 않으며 20℃가 10℃의 두 배 더 뜨겁다는 비율 해석도 성립하지 않는다. 시간은 동일한 단위에서 0이 무소요 시간을 뜻하므로 비율 비교가 가능하다.

## 헷갈린 부분과 주의점

범주를 1,2,3으로 인코딩했다고 그 간격의 실질적 의미가 생기지는 않는다.

## 복습 문제

고객 ID의 평균을 보고 고객 특성을 설명할 수 있을까?

**풀이:** 식별 코드의 산술 평균은 보통 분석 대상의 수량 특성을 설명하지 못한다.

## 참고한 문서

[한국데이터산업진흥원 2022 자격검정 안내](https://www.dataq.or.kr/www/dataq_brochure_2022.pdf)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/big-data/01-analysis-question/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/big-data/03-sampling-bias/' | relative_url }})
