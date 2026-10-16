---
layout: content
title: "[빅데이터분석기사 05] 결측값 탐지와 훈련 자료 중앙값 대치"
date: 2021-10-26 09:00:00 +0900
categories: [BigDataCertification]
tags: [자격증학습, 빅데이터분석기사]
series: study-certifications-2021-2023
study_track: big-data
study_order: 45
study_unit: 9
permalink: /study/certifications/2021-2023/big-data/05-missing-median/
---

결측을 0으로 채우면 미측정과 실제 0이 섞였다. 중앙값도 훈련 자료에서만 배웠다.

> Python 3.9·NumPy 1.20.3·pandas 1.2.5·SciPy 1.6.3·scikit-learn 0.24.2를 이용한 학습용 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

isna로 결측을 확인하고 수집 원인과 결측 패턴을 살핀다. 중앙값 대치는 극단값에 덜 민감한 간단한 기준이지만 결측 발생 메커니즘이나 변수 간 관계를 복원하지는 못한다. 평가 자료까지 포함해 대치값을 구하면 평가 분포가 학습에 새어 들어간다. 실무 모델에는 파이프라인 대치를 고려한다.

## 예제 문제 · 창작

훈련 값 [10,20,결측,100]과 평가 값 [결측,1000]이 있다. 훈련 중앙값으로 평가 결측을 채워라.

## 풀이와 판단 근거

훈련의 관측값 10,20,100의 중앙값은 20이다. 평가 자료의 1000은 이 통계를 계산할 때 쓰지 않는다. 결과는 [20,1000]이며 대치 전 결측 개수도 함께 확인한다. 모든 훈련 값이 결측인 열은 별도 정책이 필요하다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```python
import pandas as pd

train = pd.Series([10.0, 20.0, None, 100.0])
test = pd.Series([None, 1000.0])
median = train.median()
print(int(train.isna().sum()))
print(test.fillna(median).tolist())
```
{% endraw %}

## 실행 결과

```text
1
[20.0, 1000.0]
```

## 헷갈린 부분과 주의점

평가 자료를 따로 중앙값 대치해도 훈련과 평가가 서로 다른 변환을 쓰게 된다. 훈련 통계를 재사용한다.

## 복습 문제

대치 후 결측 원인을 조사할 필요가 없어질까?

**풀이:** 아니다. 결측 여부 자체가 수집 과정이나 편향에 대한 정보를 줄 수 있다.

## 참고한 문서

[pandas 1.2.5 공식 자료](https://github.com/pandas-dev/pandas/blob/v1.2.5/doc/source/user_guide/missing_data.rst)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/big-data/04-data-quality-contract/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/big-data/06-deduplication-rule/' | relative_url }})
