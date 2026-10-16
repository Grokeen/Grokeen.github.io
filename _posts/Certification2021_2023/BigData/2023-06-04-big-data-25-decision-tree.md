---
layout: content
title: "[빅데이터분석기사 25] 결정트리의 분할과 깊이 제한"
date: 2023-06-04 09:00:00 +0900
categories: [BigDataCertification]
tags: [자격증학습, 빅데이터분석기사]
series: study-certifications-2021-2023
study_track: big-data
study_order: 65
study_unit: 12
permalink: /study/certifications/2021-2023/big-data/25-decision-tree/
---

트리는 규칙을 읽기 쉬웠지만 깊이가 커지면 작은 자료를 외우기 쉬웠다. 복잡도 제한을 학습 점수와 구분했다.

> Python 3.9·NumPy 1.20.3·pandas 1.2.5·SciPy 1.6.3·scikit-learn 0.24.2를 이용한 학습용 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

분류 트리는 특성의 조건으로 자료를 나누며 불순도 감소 등 기준을 사용한다. max_depth와 min_samples_leaf 같은 인자는 모델 복잡도를 제한한다. 트리는 일반적으로 입력 스케일 변화에 민감한 거리 계산 모델과 다르지만 불필요한 변수나 작은 표본의 불안정성에서 자유롭지는 않다.

## 예제 문제 · 창작

x=0,1은 클래스 0, x=2,3은 클래스 1인 자료에 깊이 1 트리를 맞춘다. 잎 개수와 학습 자료 예측은?

## 풀이와 판단 근거

한 번의 분할로 두 잎을 만들고 [0,0,1,1]로 예측한다. 훈련 자료를 완벽히 맞추도록 만든 합성 예제이며 일반화 성능을 입증하지 않는다. 실제 깊이와 잎 크기는 검증 자료를 이용해 선택한다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```python
from sklearn.tree import DecisionTreeClassifier

X = [[0], [1], [2], [3]]
y = [0, 0, 1, 1]
model = DecisionTreeClassifier(max_depth=1, random_state=0).fit(X, y)
print(model.get_n_leaves())
print(model.predict(X).tolist())
```
{% endraw %}

## 실행 결과

```text
2
[0, 0, 1, 1]
```

## 헷갈린 부분과 주의점

특성 중요도를 인과적 중요도라고 해석하지 않는다. 상관된 변수와 선택 편향의 영향도 검토한다.

## 복습 문제

max_depth를 늘리면 검증 성능도 반드시 높아질까?

**풀이:** 아니다. 과적합으로 검증 성능이 낮아질 수 있다.

## 참고한 문서

[개념·API의 원문 자료](https://scikit-learn.org/0.24/modules/tree.html)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/big-data/24-logistic-probability/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/big-data/26-random-forest/' | relative_url }})
