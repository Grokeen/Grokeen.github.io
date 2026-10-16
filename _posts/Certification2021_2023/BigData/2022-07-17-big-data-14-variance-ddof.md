---
layout: content
title: "[빅데이터분석기사 14] 모분산·표본분산과 ddof"
date: 2022-07-17 09:00:00 +0900
categories: [BigDataCertification]
tags: [자격증학습, 빅데이터분석기사]
series: study-certifications-2021-2023
study_track: big-data
study_order: 54
study_unit: 10
permalink: /study/certifications/2021-2023/big-data/14-variance-ddof/
---

같은 자료의 분산이 라이브러리마다 달라진 이유를 분모에서 찾았다. 기본값을 확인하는 것도 풀이의 일부였다.

> Python 3.9·NumPy 1.20.3·pandas 1.2.5·SciPy 1.6.3·scikit-learn 0.24.2를 이용한 학습용 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

편차 제곱합을 n으로 나누면 주어진 자료를 모집단처럼 본 분산이다. 독립 동일 분포 표본에서 모집단 분산의 불편 추정을 위해 n−1로 나눈 표본분산을 쓴다. NumPy var 기본 ddof는 0, pandas Series.var 기본 ddof는 1이다. 결측 처리와 축 설정도 결과를 바꾼다.

## 예제 문제 · 창작

[1,2,3]의 편차 제곱합은 2다. NumPy 기본 분산과 pandas 기본 분산을 각각 계산하라.

## 풀이와 판단 근거

각각 2/3=0.6667과 2/2=1이다. 서로 오류인 것이 아니라 사용한 분모의 정의가 다르다. 비교할 때 ddof를 명시한다. n=1에서 ddof=1인 표본분산은 유효하게 계산할 수 없다는 경계도 점검한다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```python
import numpy as np
import pandas as pd

values = [1, 2, 3]
print(f"{np.var(values):.4f}")
print(f"{pd.Series(values).var():.4f}")
```
{% endraw %}

## 실행 결과

```text
0.6667
1.0000
```

## 헷갈린 부분과 주의점

표본표준편차가 모집단표준편차의 불편 추정량이라는 식으로 분산의 성질을 그대로 옮기지 않는다.

## 복습 문제

NumPy에서 pandas 기본 분산과 맞추려면?

**풀이:** np.var(values, ddof=1)을 사용한다.

## 참고한 문서

[개념·API의 원문 자료](https://numpy.org/doc/1.20/reference/generated/numpy.var.html) · [추가 공식 자료 1](https://github.com/pandas-dev/pandas/blob/v1.2.5/pandas/core/series.py)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/big-data/13-mean-median/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/big-data/15-bayes-base-rate/' | relative_url }})
