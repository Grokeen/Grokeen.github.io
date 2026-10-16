---
layout: content
title: "[빅데이터분석기사 12] 그룹 분할과 시간 순서 검증"
date: 2022-05-19 09:00:00 +0900
categories: [BigDataCertification]
tags: [자격증학습, 빅데이터분석기사]
series: study-certifications-2021-2023
study_track: big-data
study_order: 52
study_unit: 10
permalink: /study/certifications/2021-2023/big-data/12-group-time-validation/
---

행 수보다 독립적인 대상 수가 중요할 때가 있었다. 같은 사람의 기록을 양쪽에 섞지 않는 분할을 연습했다.

> Python 3.9·NumPy 1.20.3·pandas 1.2.5·SciPy 1.6.3·scikit-learn 0.24.2를 이용한 학습용 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

GroupKFold는 동일 그룹이 같은 분할의 훈련과 검증에 동시에 들어가지 않게 한다. TimeSeriesSplit은 시간 순서를 보존하며 과거로 학습하고 이후 구간으로 검증하는 방식이다. 정렬, 예측 지평, 지연 정보와 인접 구간의 상관을 검토해야 한다. 이 둘을 무작위 KFold와 같은 것으로 취급하지 않는다.

## 예제 문제 · 창작

고객 그룹 [A,A,B,B,C,C]을 3개 폴드로 나눌 때 각 폴드의 훈련·검증 고객이 겹치는지 검사하라.

## 풀이와 판단 근거

각 폴드에서 고객 집합의 교집합은 공집합이다. 코드가 출력하는 True는 이 제약을 확인한 결과이지 모델 성능이 좋다는 뜻은 아니다. 실제 목표가 기존 고객의 다음 달 예측인지 새 고객 일반화인지에 따라 검증 설계가 달라진다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```python
import numpy as np
from sklearn.model_selection import GroupKFold

groups = np.array(["A", "A", "B", "B", "C", "C"])
X = np.arange(6).reshape(-1, 1)
for train, valid in GroupKFold(n_splits=3).split(X, groups=groups):
    print(set(groups[train]).isdisjoint(groups[valid]))
```
{% endraw %}

## 실행 결과

```text
True
True
True
```

## 헷갈린 부분과 주의점

그룹 분할이 시간을 자동으로 정렬하지 않는다. 그룹과 시간 제약이 함께 있으면 그 목적에 맞게 설계한다.

## 복습 문제

미래 자료로 과거를 예측하는 검증이 운영 성능을 잘 나타낼까?

**풀이:** 일반적인 미래 예측 목적에는 맞지 않는다. 운영 시점에서 가능한 정보만 이용한다.

## 참고한 문서

[개념·API의 원문 자료](https://scikit-learn.org/0.24/modules/cross_validation.html#cross-validation-iterators-for-grouped-data)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/big-data/11-target-leakage/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/big-data/13-mean-median/' | relative_url }})
