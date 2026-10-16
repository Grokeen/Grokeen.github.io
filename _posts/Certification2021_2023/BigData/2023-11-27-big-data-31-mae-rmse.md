---
layout: content
title: "[빅데이터분석기사 31] MAE·RMSE가 큰 오차를 다루는 방식"
date: 2023-11-27 09:00:00 +0900
categories: [BigDataCertification]
tags: [자격증학습, 빅데이터분석기사]
series: study-certifications-2021-2023
study_track: big-data
study_order: 71
study_unit: 12
permalink: /study/certifications/2021-2023/big-data/31-mae-rmse/
---

회귀 평가는 오차 단위부터 읽었다. 제곱을 쓰는 RMSE는 큰 오차에 더 민감했다.

> Python 3.9·NumPy 1.20.3·pandas 1.2.5·SciPy 1.6.3·scikit-learn 0.24.2를 이용한 학습용 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

MAE는 절대오차 평균, RMSE는 제곱오차 평균의 제곱근이다. 둘 다 목표 변수와 같은 단위로 읽을 수 있다. RMSE는 큰 오차의 영향을 더 크게 반영한다. 서로 다른 목표 척도나 다른 평가 집합의 점수를 조건 확인 없이 비교하지 않는다. 낮을수록 좋은 지표이며 교차 검증의 음수 점수 규약과도 구별한다.

## 예제 문제 · 창작

실제 [0,0,0], 예측 [0,0,6]일 때 MAE와 RMSE를 구하라.

## 풀이와 판단 근거

절대오차 합 6을 3으로 나누면 MAE=2다. 제곱오차 평균은 36/3=12이고 제곱근은 약 3.464다. 오차 하나가 큰 상황에서 두 지표의 차이를 볼 수 있다. 금액이나 시간 등 실제 단위에 따른 오류 비용은 따로 설명한다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```python
from sklearn.metrics import mean_absolute_error, mean_squared_error

y = [0, 0, 0]
pred = [0, 0, 6]
print(f"{mean_absolute_error(y, pred):.3f}")
print(f"{mean_squared_error(y, pred, squared=False):.3f}")
```
{% endraw %}

## 실행 결과

```text
2.000
3.464
```

## 헷갈린 부분과 주의점

MAPE를 쓸 때 목표 0이나 작은 값의 문제를 잊지 않는다. 지표 선택을 자료와 업무 목적에 맞춘다.

## 복습 문제

오차가 모두 같은 절대 크기라면 MAE와 RMSE는?

**풀이:** 같아진다. 일반적으로 RMSE는 MAE보다 작지 않다.

## 참고한 문서

[개념·API의 원문 자료](https://scikit-learn.org/0.24/modules/model_evaluation.html#regression-metrics)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/big-data/30-roc-auc-scores/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/big-data/32-pipeline-grid-csv/' | relative_url }})
