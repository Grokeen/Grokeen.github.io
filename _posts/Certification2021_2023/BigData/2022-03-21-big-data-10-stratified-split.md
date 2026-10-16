---
layout: content
title: "[빅데이터분석기사 10] 층화 분할과 재현 가능한 무작위성"
date: 2022-03-21 09:00:00 +0900
categories: [BigDataCertification]
tags: [자격증학습, 빅데이터분석기사]
series: study-certifications-2021-2023
study_track: big-data
study_order: 50
study_unit: 10
permalink: /study/certifications/2021-2023/big-data/10-stratified-split/
---

분류 자료를 나눌 때 각 클래스 수를 먼저 확인했다. random_state는 결과를 재현하게 해 주지만 검증의 타당성을 보장하지 않았다.

> Python 3.9·NumPy 1.20.3·pandas 1.2.5·SciPy 1.6.3·scikit-learn 0.24.2를 이용한 학습용 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

train_test_split은 입력과 목표를 대응시켜 훈련·평가로 나눈다. stratify=y는 클래스 비율을 고려한 분할이며 각 클래스의 사례 수와 분할 크기가 충분해야 한다. 동일 고객의 반복 기록이나 미래 예측에는 그룹·시간 제약이 우선될 수 있다. 최종 평가 자료는 모델 선택을 반복하는 용도로 소모하지 않는다.

## 예제 문제 · 창작

0과 1이 각각 6개인 12개 관측을 절반씩 층화 분할한다. 훈련·평가의 클래스별 개수는?

## 풀이와 판단 근거

각 집합에 0과 1이 3개씩 들어간다. 이 작은 예제는 개수를 확인하기 위한 것으로 충분한 일반화 평가가 되는 표본은 아니다. 인덱스 분할을 사용하면 원본 행과 목표의 대응을 같이 점검하기 쉽다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```python
import numpy as np
from sklearn.model_selection import train_test_split

y = np.array([0] * 6 + [1] * 6)
train, test = train_test_split(
    np.arange(len(y)), test_size=0.5, random_state=7, stratify=y
)
print(np.bincount(y[train]).tolist())
print(np.bincount(y[test]).tolist())
```
{% endraw %}

## 실행 결과

```text
[3, 3]
[3, 3]
```

## 헷갈린 부분과 주의점

층화가 데이터 누출이나 수집 편향까지 해결한다고 생각하지 않는다.

## 복습 문제

random_state를 성능이 가장 좋은 값으로 계속 바꾸면 어떤 문제가 있을까?

**풀이:** 평가 결과에 맞춰 분할을 고르면 선택 편향이 생긴다. 사전에 정한 검증 설계를 따른다.

## 참고한 문서

[개념·API의 원문 자료](https://scikit-learn.org/0.24/modules/generated/sklearn.model_selection.train_test_split.html)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/big-data/09-onehot-unknown/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/big-data/11-target-leakage/' | relative_url }})
