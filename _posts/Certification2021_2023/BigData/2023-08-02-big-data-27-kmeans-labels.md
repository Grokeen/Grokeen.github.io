---
layout: content
title: "[빅데이터분석기사 27] K-means 군집 번호의 임의성"
date: 2023-08-02 09:00:00 +0900
categories: [BigDataCertification]
tags: [자격증학습, 빅데이터분석기사]
series: study-certifications-2021-2023
study_track: big-data
study_order: 67
study_unit: 12
permalink: /study/certifications/2021-2023/big-data/27-kmeans-labels/
---

군집 0이 언제나 작은 고객을 뜻하는 것은 아니었다. 중심과 거리를 해석하고 번호 자체에 의미를 붙이지 않았다.

> Python 3.9·NumPy 1.20.3·pandas 1.2.5·SciPy 1.6.3·scikit-learn 0.24.2를 이용한 학습용 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

K-means는 각 관측과 배정된 중심 사이 제곱거리 합을 줄이는 군집화 방법이다. 군집 수 k를 사전에 정하며 초기화와 스케일에 영향을 받는다. 둥근 군집이나 비슷한 밀도 구조에서 유용할 수 있지만 임의 모양의 군집을 항상 잘 찾지는 못한다. 군집 번호는 실행 결과의 표식이며 정답 클래스가 아니다.

## 예제 문제 · 창작

1차원 가상 자료 0,1,9,10을 두 군집으로 나눈다. 군집 번호 대신 중심을 정렬해 출력하라.

## 풀이와 판단 근거

중심은 0.5와 9.5다. 각 군집의 번호가 바뀌어도 같은 분할일 수 있어 번호 일치를 모델 품질로 평가하지 않는다. n_init=10을 명시해 당시 버전의 동작을 고정했다. 실제 분석에서는 군집 수, 안정성, 업무 해석을 함께 검토한다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```python
from sklearn.cluster import KMeans

model = KMeans(n_clusters=2, n_init=10, random_state=0).fit([[0], [1], [9], [10]])
centers = sorted(model.cluster_centers_.ravel().tolist())
print([round(value, 1) for value in centers])
```
{% endraw %}

## 실행 결과

```text
[0.5, 9.5]
```

## 헷갈린 부분과 주의점

군집화는 지도학습의 정확도와 바로 같은 점수로 평가하지 않는다.

## 복습 문제

금액과 횟수의 단위 차이가 크면 어떤 문제가 있을까?

**풀이:** 큰 척도의 변수가 거리를 지배할 수 있어 목적에 맞는 스케일 처리를 검토한다.

## 참고한 문서

[개념·API의 원문 자료](https://scikit-learn.org/0.24/modules/generated/sklearn.cluster.KMeans.html)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/big-data/26-random-forest/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/big-data/28-pca-variance/' | relative_url }})
