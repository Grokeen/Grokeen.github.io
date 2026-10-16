---
layout: content
title: "[빅데이터분석기사 23] 선형회귀 계수와 외삽"
date: 2023-04-07 09:00:00 +0900
categories: [BigDataCertification]
tags: [자격증학습, 빅데이터분석기사]
series: study-certifications-2021-2023
study_track: big-data
study_order: 63
study_unit: 11
permalink: /study/certifications/2021-2023/big-data/23-linear-regression/
---

직선을 잘 맞추는 것과 범위 밖을 잘 예측하는 것은 달랐다. 기울기의 단위부터 해석했다.

> Python 3.9·NumPy 1.20.3·pandas 1.2.5·SciPy 1.6.3·scikit-learn 0.24.2를 이용한 학습용 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

최소제곱 선형회귀는 잔차 제곱합을 작게 하는 계수를 구한다. 단순 회귀의 기울기는 입력 한 단위 증가에 따른 예측값 변화량이다. 다중 회귀에서는 다른 입력을 고정한 조건부 해석이 필요하다. 추론을 하려면 잔차와 모형 가정을 검토하며 예측 성능은 별도 검증한다.

## 예제 문제 · 창작

가상 자료 x=0,1,2와 y=1,3,5에 직선을 맞추고 x=3을 예측하라.

## 풀이와 판단 근거

기울기 2, 절편 1이므로 예측값은 7이다. 합성 자료는 의도적으로 완전한 직선이며 현실의 불확실성을 나타내지 않는다. x=3은 훈련 범위 밖이므로 실제 업무에서는 외삽의 타당성을 추가 확인해야 한다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```python
from sklearn.linear_model import LinearRegression

model = LinearRegression().fit([[0], [1], [2]], [1, 3, 5])
print(f"{model.coef_[0]:.1f} {model.intercept_:.1f}")
print(f"{model.predict([[3]])[0]:.1f}")
```
{% endraw %}

## 실행 결과

```text
2.0 1.0
7.0
```

## 헷갈린 부분과 주의점

훈련 R²가 높다는 이유로 인과 관계나 미래 성능을 확정하지 않는다.

## 복습 문제

입력의 단위를 100배 바꾸면 계수 숫자는 그대로일까?

**풀이:** 예측 관계가 같더라도 입력 단위에 맞춰 기울기 숫자는 달라진다.

## 참고한 문서

[개념·API의 원문 자료](https://scikit-learn.org/0.24/modules/generated/sklearn.linear_model.LinearRegression.html)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/big-data/22-correlation-causality/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/big-data/24-logistic-probability/' | relative_url }})
