---
layout: content
title: "[빅데이터분석기사 16] 표준편차와 평균의 표준오차"
date: 2022-09-13 09:00:00 +0900
categories: [BigDataCertification]
tags: [자격증학습, 빅데이터분석기사]
series: study-certifications-2021-2023
study_track: big-data
study_order: 56
study_unit: 10
permalink: /study/certifications/2021-2023/big-data/16-standard-error/
---

개별 관측의 산포와 표본평균의 불확실성을 구분했다. 표본 수를 네 배 늘리면 표준오차가 절반이 되는 이유를 계산했다.

> Python 3.9·NumPy 1.20.3·pandas 1.2.5·SciPy 1.6.3·scikit-learn 0.24.2를 이용한 학습용 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

표준편차는 관측값의 산포를, 표준오차는 추정량의 표집 변동을 나타낸다. 독립 동일 분포이며 분산이 유한한 관측의 표본평균은 표준오차를 대략 s/√n으로 추정한다. 중심극한정리는 일정 조건에서 표본평균의 분포에 관한 것으로 원자료 자체가 정규분포가 된다는 뜻이 아니다.

## 예제 문제 · 창작

독립 표본에서 표준편차 추정값 12를 고정할 때 n=36과 n=144의 평균 표준오차는?

## 풀이와 판단 근거

12/6=2와 12/12=1이다. 표본 수가 네 배일 때 표준오차는 절반이 된다. 같은 사람의 강한 반복 측정이나 시계열 상관이 있으면 독립 표본 수 공식만으로 불확실성을 과소평가할 수 있다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```python
from math import sqrt

for n in [36, 144]:
    print(f"{12 / sqrt(n):.1f}")
```
{% endraw %}

## 실행 결과

```text
2.0
1.0
```

## 헷갈린 부분과 주의점

표준오차가 작다는 사실이 표본 선택 편향이나 측정 오차가 없음을 뜻하지 않는다.

## 복습 문제

표준오차가 줄면 개별 관측의 표준편차도 반드시 줄어들까?

**풀이:** 아니다. 다른 개념이며 모집단의 산포는 그대로일 수 있다.

## 참고한 문서

[개념·API의 원문 자료](https://www.itl.nist.gov/div898/handbook/eda/section3/eda352.htm)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/big-data/15-bayes-base-rate/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/big-data/17-mean-confidence-interval/' | relative_url }})
