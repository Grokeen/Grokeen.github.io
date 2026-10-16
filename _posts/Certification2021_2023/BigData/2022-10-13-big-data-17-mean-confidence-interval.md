---
layout: content
title: "[빅데이터분석기사 17] 평균 신뢰구간의 반복 표집 해석"
date: 2022-10-13 09:00:00 +0900
categories: [BigDataCertification]
tags: [자격증학습, 빅데이터분석기사]
series: study-certifications-2021-2023
study_track: big-data
study_order: 57
study_unit: 11
permalink: /study/certifications/2021-2023/big-data/17-mean-confidence-interval/
---

계산된 구간에 확률을 붙이는 표현을 조심했다. 신뢰수준은 반복해서 같은 절차를 사용할 때의 포함률이었다.

> Python 3.9·NumPy 1.20.3·pandas 1.2.5·SciPy 1.6.3·scikit-learn 0.24.2를 이용한 학습용 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

독립 정규 모집단의 표본에서 분산을 모를 때 평균의 t 신뢰구간은 표본평균±t 임계값×s/√n으로 구한다. 비정규 자료의 작은 표본에는 이 조건을 점검해야 한다. 빈도주의 95% 신뢰구간은 같은 절차로 반복 생성한 구간이 고정된 모평균을 포함하는 장기 비율을 뜻한다. 개별 미래 관측의 예측구간과도 다르다.

## 예제 문제 · 창작

표본평균 10, 표본표준편차 2, n=25라고 하자. 정규성·독립성 가정 아래 95% t 신뢰구간을 구하라.

## 풀이와 판단 근거

자유도 24의 t 임계값 약 2.0639와 표준오차 0.4를 이용해 약 [9.1744,10.8256]을 얻는다. 아래에서는 반올림해 소수 셋째 자리까지 표시한다. 표본평균의 불확실성을 나타내며 개별 관측 95%가 이 안에 있다는 뜻은 아니다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```python
from math import sqrt
from scipy.stats import t

mean, sample_std, n = 10.0, 2.0, 25
margin = t.ppf(0.975, df=n - 1) * sample_std / sqrt(n)
print(f"{mean - margin:.3f} {mean + margin:.3f}")
```
{% endraw %}

## 실행 결과

```text
9.174 10.826
```

## 헷갈린 부분과 주의점

가정과 표본 설계를 확인하지 않고 신뢰수준 숫자만 강조하지 않는다.

## 복습 문제

99% 신뢰수준으로 바꾸면 같은 자료의 구간 폭은?

**풀이:** 다른 조건이 같다면 임계값이 커져 구간이 더 넓어진다.

## 참고한 문서

[개념·API의 원문 자료](https://docs.scipy.org/doc/scipy-1.6.3/reference/generated/scipy.stats.t.html)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/big-data/16-standard-error/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/big-data/18-pvalue-errors/' | relative_url }})
