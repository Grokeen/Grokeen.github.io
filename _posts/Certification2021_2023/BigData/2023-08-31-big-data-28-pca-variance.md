---
layout: content
title: "[빅데이터분석기사 28] PCA의 설명 분산과 차원 축소"
date: 2023-08-31 09:00:00 +0900
categories: [BigDataCertification]
tags: [자격증학습, 빅데이터분석기사]
series: study-certifications-2021-2023
study_track: big-data
study_order: 68
study_unit: 12
permalink: /study/certifications/2021-2023/big-data/28-pca-variance/
---

주성분이 원래 변수 중 하나를 고르는 방법은 아니었다. 여러 변수의 선형 결합으로 축을 바꾼다고 정리했다.

> Python 3.9·NumPy 1.20.3·pandas 1.2.5·SciPy 1.6.3·scikit-learn 0.24.2를 이용한 학습용 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

PCA는 중심화된 자료에서 분산이 큰 직교 방향을 찾아 차원을 줄인다. 표준 PCA는 목표 변수를 사용하지 않는 비지도 변환이며 설명 분산이 큰 축이 예측에 가장 유용하다는 보장은 없다. 변수 단위가 다르면 먼저 표준화할지 검토한다. 주성분 벡터의 부호는 뒤집혀도 같은 축을 나타낸다.

## 예제 문제 · 창작

두 번째 열이 첫 번째 열의 두 배인 네 관측을 주성분 하나로 줄인다. 축소 배열의 크기와 설명 분산 비율은?

## 풀이와 판단 근거

형태는 (4,1)이며 이 합성 자료는 한 직선 위에 있으므로 첫 주성분이 분산을 모두 설명해 비율 1이다. 부호가 다른 좌표를 오류라고 판정하지 않으려고 좌표값 대신 형태와 분산 비율을 출력했다. 실제 자료에서는 보존한 분산과 모델 성능을 함께 살핀다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```python
from sklearn.decomposition import PCA

X = [[0, 0], [1, 2], [2, 4], [3, 6]]
pca = PCA(n_components=1)
reduced = pca.fit_transform(X)
print(reduced.shape)
print(f"{pca.explained_variance_ratio_[0]:.3f}")
```
{% endraw %}

## 실행 결과

```text
(4, 1)
1.000
```

## 헷갈린 부분과 주의점

평가 자료까지 합쳐 PCA를 fit하면 변환 학습에 평가 정보가 들어간다.

## 복습 문제

PCA가 목표와 관련 없는 큰 분산을 우선할 수도 있을까?

**풀이:** 그렇다. 목표를 사용하지 않으므로 예측 관련성은 별도 검증한다.

## 참고한 문서

[개념·API의 원문 자료](https://scikit-learn.org/0.24/modules/generated/sklearn.decomposition.PCA.html)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/big-data/27-kmeans-labels/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/big-data/29-confusion-metrics/' | relative_url }})
