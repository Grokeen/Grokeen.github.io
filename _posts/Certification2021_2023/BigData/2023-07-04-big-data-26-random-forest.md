---
layout: content
title: "[빅데이터분석기사 26] 랜덤포레스트의 표본·특성 무작위성"
date: 2023-07-04 09:00:00 +0900
categories: [BigDataCertification]
tags: [자격증학습, 빅데이터분석기사]
series: study-certifications-2021-2023
study_track: big-data
study_order: 66
study_unit: 12
permalink: /study/certifications/2021-2023/big-data/26-random-forest/
---

여러 트리를 모으는 것만으로 모든 오류가 해결되지는 않았다. 트리들이 다른 예측을 만들게 하는 장치를 확인했다.

> Python 3.9·NumPy 1.20.3·pandas 1.2.5·SciPy 1.6.3·scikit-learn 0.24.2를 이용한 학습용 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

랜덤포레스트는 부트스트랩 표본과 분할 시 특성 부분집합 등 무작위성을 활용해 여러 트리를 결합한다. 분류에서는 트리의 확률 추정 등을 모아 예측하며 분산을 줄이는 효과를 기대한다. n_estimators는 트리 수, max_features는 분할에서 검토할 특성 수와 관련된다. 데이터 누출이나 체계적 편향을 자동 해결하지 않는다.

## 예제 문제 · 창작

기본 개념 확인용으로 합성 1차원 자료에 트리 20개를 학습한다. 생성된 추정기 수와 서로 먼 두 지점의 예측을 확인하라.

## 풀이와 판단 근거

estimators_ 길이는 20이고 양끝의 예측은 0,1이다. n_jobs=1과 random_state=3으로 예제를 재현하기 쉽게 했다. 이 결과는 내부 구성을 확인하는 것으로, 같은 자료를 재사용한 점수를 시험 성능이라고 주장하지 않는다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```python
from sklearn.ensemble import RandomForestClassifier

X = [[value] for value in range(20)]
y = [0] * 10 + [1] * 10
model = RandomForestClassifier(
    n_estimators=20, max_depth=3, random_state=3, n_jobs=1
).fit(X, y)
print(len(model.estimators_))
print(model.predict([[0], [19]]).tolist())
```
{% endraw %}

## 실행 결과

```text
20
[0, 1]
```

## 헷갈린 부분과 주의점

트리 수를 늘려도 시간이 증가하며 편향이나 불필요한 입력을 모두 없애는 것은 아니다.

## 복습 문제

단일 트리와 모든 랜덤포레스트 트리가 반드시 같은 구조일까?

**풀이:** 아니다. 표본·특성 선택 등 무작위성과 설정에 따라 달라진다.

## 참고한 문서

[개념·API의 원문 자료](https://scikit-learn.org/0.24/modules/generated/sklearn.ensemble.RandomForestClassifier.html)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/big-data/25-decision-tree/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/big-data/27-kmeans-labels/' | relative_url }})
