---
layout: content
title: "[빅데이터분석기사 07] IQR 이상치 경계는 조사 신호"
date: 2021-12-23 09:00:00 +0900
categories: [BigDataCertification]
tags: [자격증학습, 빅데이터분석기사]
series: study-certifications-2021-2023
study_track: big-data
study_order: 47
study_unit: 9
permalink: /study/certifications/2021-2023/big-data/07-iqr-outlier/
---

극단값을 찾는 기준과 삭제 결정을 나눴다. IQR 경계 밖의 관측도 정상적인 큰 거래일 수 있었다.

> Python 3.9·NumPy 1.20.3·pandas 1.2.5·SciPy 1.6.3·scikit-learn 0.24.2를 이용한 학습용 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

IQR은 제3사분위수−제1사분위수다. 흔히 Q1−1.5IQR보다 작거나 Q3+1.5IQR보다 큰 값을 탐색용 이상치 후보로 표시한다. 사분위수 보간 방식과 표본 크기에 따라 결과가 달라질 수 있다. 경계 밖이라는 이유만으로 오류를 확정하지 않고 원천 자료와 분석 목적을 확인한다.

## 예제 문제 · 창작

[1,2,3,4,100]에서 pandas 기본 선형 보간 사분위수를 이용해 상한과 상한 초과 값을 구하라.

## 풀이와 판단 근거

Q1=2, Q3=4, IQR=2이므로 상한은 7이다. 100이 후보로 표시된다. 변환이나 삭제가 모델 성능을 바꾸는지도 훈련 과정에서 검토하며 평가 자료를 보고 임의로 경계를 조정하지 않는다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```python
import pandas as pd

values = pd.Series([1, 2, 3, 4, 100])
q1, q3 = values.quantile([0.25, 0.75])
upper = q3 + 1.5 * (q3 - q1)
print(f"{upper:.1f}")
print(values[values > upper].tolist())
```
{% endraw %}

## 실행 결과

```text
7.0
[100]
```

## 헷갈린 부분과 주의점

이상치 탐지는 사기 확정이나 입력 오류 판정과 다르다. 작은 표본에서 기계적인 삭제는 정보를 크게 줄인다.

## 복습 문제

1.5라는 상수는 모든 업무의 유일한 정답일까?

**풀이:** 아니다. 탐색 관행이며 업무 규칙과 분포에 따라 기준을 검토한다.

## 참고한 문서

[pandas 1.2.5 공식 자료](https://github.com/pandas-dev/pandas/blob/v1.2.5/pandas/core/series.py#L2219)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/big-data/06-deduplication-rule/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/big-data/08-scaling-train/' | relative_url }})
