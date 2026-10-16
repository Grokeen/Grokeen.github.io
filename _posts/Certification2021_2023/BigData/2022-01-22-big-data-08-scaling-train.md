---
layout: content
title: "[빅데이터분석기사 08] 표준화의 fit과 transform 구분"
date: 2022-01-22 09:00:00 +0900
categories: [BigDataCertification]
tags: [자격증학습, 빅데이터분석기사]
series: study-certifications-2021-2023
study_track: big-data
study_order: 48
study_unit: 9
permalink: /study/certifications/2021-2023/big-data/08-scaling-train/
---

표준화도 학습 과정이었다. 평가 자료를 새로 fit하지 않고 훈련에서 구한 기준으로 변환했다.

> Python 3.9·NumPy 1.20.3·pandas 1.2.5·SciPy 1.6.3·scikit-learn 0.24.2를 이용한 학습용 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

StandardScaler는 훈련 특성별 평균을 빼고 표준편차로 나누어 변환한다. 이 버전은 분산 계산에 ddof=0을 사용한다. 변환 결과가 언제나 정규분포가 되는 것은 아니다. 거리 기반 모델이나 규제 회귀에서는 특성 단위가 특히 중요하며 트리 모델에는 같은 이유의 표준화 필요성이 보통 작다.

## 예제 문제 · 창작

훈련 값 0,2의 평균·표준편차로 새로운 값 4를 표준화하면 얼마인가?

## 풀이와 판단 근거

훈련 평균은 1, 표준편차는 1이므로 (4−1)/1=3이다. 새 값이 표준화 후 3이라고 오류가 아니며 평가 자료를 중심 0으로 다시 맞출 이유도 없다. 아래 코드는 훈련에만 fit하고 새 값에 transform한다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```python
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler().fit([[0.0], [2.0]])
print(scaler.mean_.tolist())
print(scaler.transform([[4.0]]).ravel().tolist())
```
{% endraw %}

## 실행 결과

```text
[1.0]
[3.0]
```

## 헷갈린 부분과 주의점

표준화가 이상치를 제거하거나 모든 분포를 정규분포로 만든다고 외우지 않는다.

## 복습 문제

훈련과 평가 각각에 fit_transform을 해도 될까?

**풀이:** 서로 다른 기준으로 변환되므로 훈련 통계를 재사용해야 한다.

## 참고한 문서

[개념·API의 원문 자료](https://scikit-learn.org/0.24/modules/generated/sklearn.preprocessing.StandardScaler.html)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/big-data/07-iqr-outlier/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/big-data/09-onehot-unknown/' | relative_url }})
