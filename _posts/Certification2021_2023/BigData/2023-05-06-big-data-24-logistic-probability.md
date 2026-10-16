---
layout: content
title: "[빅데이터분석기사 24] 로지스틱회귀의 확률과 결정 경계"
date: 2023-05-06 09:00:00 +0900
categories: [BigDataCertification]
tags: [자격증학습, 빅데이터분석기사]
series: study-certifications-2021-2023
study_track: big-data
study_order: 64
study_unit: 11
permalink: /study/certifications/2021-2023/big-data/24-logistic-probability/
---

이름에 회귀가 있어도 분류에 쓰는 모델이었다. predict와 predict_proba의 결과를 구분했다.

> Python 3.9·NumPy 1.20.3·pandas 1.2.5·SciPy 1.6.3·scikit-learn 0.24.2를 이용한 학습용 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

이진 로지스틱회귀는 입력의 선형 결합을 시그모이드로 바꿔 클래스 확률을 모델링한다. scikit-learn은 기본적으로 정규화를 적용하며 C가 클수록 규제가 약해진다. predict_proba의 열은 classes_ 순서로 해석해야 한다. 확률 값이 나와도 실제 빈도와 잘 맞는 보정까지 자동 보장되는 것은 아니다.

## 예제 문제 · 창작

대칭적인 가상 자료에서 음수는 0, 양수는 1로 학습한다. x=0의 클래스 1 확률과 예측 클래스를 어떻게 구별해 읽을까?

## 풀이와 판단 근거

아래 대칭 자료에서는 x=0의 확률이 약 0.5다. x=−3과 3의 predict 결과는 0,1이다. 경계의 동률 처리에 기대지 않고 확률의 열 위치를 classes_에서 찾았다. 업무 임계값은 오류 비용과 검증 자료를 이용해 정하며 최종 평가 자료를 보며 조정하지 않는다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```python
import numpy as np
from sklearn.linear_model import LogisticRegression

model = LogisticRegression(solver="liblinear", random_state=0).fit(
    [[-2], [-1], [1], [2]], [0, 0, 1, 1]
)
positive = int(np.flatnonzero(model.classes_ == 1)[0])
print(f"{model.predict_proba([[0]])[0, positive]:.3f}")
print(model.predict([[-3], [3]]).tolist())
```
{% endraw %}

## 실행 결과

```text
0.500
[0, 1]
```

## 헷갈린 부분과 주의점

확률 0.9를 각 개인에 대한 결과 확정으로 설명하지 않는다.

## 복습 문제

C를 작게 하면 규제는 보통 강해질까?

**풀이:** 그렇다. 이 API에서 C는 규제 강도의 역수다.

## 참고한 문서

[개념·API의 원문 자료](https://scikit-learn.org/0.24/modules/generated/sklearn.linear_model.LogisticRegression.html)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/big-data/23-linear-regression/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/big-data/25-decision-tree/' | relative_url }})
