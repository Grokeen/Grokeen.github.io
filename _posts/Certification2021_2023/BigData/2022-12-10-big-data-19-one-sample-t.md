---
layout: content
title: "[빅데이터분석기사 19] 일표본 t검정의 가설과 통계량"
date: 2022-12-10 09:00:00 +0900
categories: [BigDataCertification]
tags: [자격증학습, 빅데이터분석기사]
series: study-certifications-2021-2023
study_track: big-data
study_order: 59
study_unit: 11
permalink: /study/certifications/2021-2023/big-data/19-one-sample-t/
---

평균 비교 코드를 쓰기 전에 모평균 가설과 표본의 독립성을 확인했다. 유의하지 않다는 결과도 정확히 표현했다.

> Python 3.9·NumPy 1.20.3·pandas 1.2.5·SciPy 1.6.3·scikit-learn 0.24.2를 이용한 학습용 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

일표본 t검정은 모집단 평균을 기준값과 비교한다. 통계량은 (표본평균−가설평균)/(표본표준편차/√n)이고 자유도는 n−1이다. 작은 표본에서는 모집단 정규성 등 가정을 검토한다. 아래는 양측 검정이며 데이터는 가상이다. 검정 결과는 가정 아래의 통계적 판단이고 원인 규명은 아니다.

## 예제 문제 · 창작

가상 측정값 [8,9,10,11,12]의 모평균이 10이라는 귀무가설을 양측 검정하라.

## 풀이와 판단 근거

표본평균과 가설평균이 모두 10이므로 t=0, p=1이다. 유의수준 0.05에서 기각하지 못한다. 이 결과만으로 모평균이 정확히 10임을 증명했다고 적지 않는다. 표본 수와 데이터 생성 조건이 결론의 적용 범위를 제한한다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```python
from scipy.stats import ttest_1samp

statistic, pvalue = ttest_1samp([8, 9, 10, 11, 12], popmean=10)
print(f"{statistic:.3f} {pvalue:.3f}")
print(pvalue < 0.05)
```
{% endraw %}

## 실행 결과

```text
0.000 1.000
False
```

## 헷갈린 부분과 주의점

표본표준편차가 0이거나 결측이 있으면 통계량의 정의와 처리 규칙을 추가 확인한다.

## 복습 문제

가설평균이 달라져도 통계량 분자는 그대로일까?

**풀이:** 아니다. 표본평균에서 지정한 가설평균을 뺀 값으로 바뀐다.

## 참고한 문서

[개념·API의 원문 자료](https://docs.scipy.org/doc/scipy-1.6.3/reference/generated/scipy.stats.ttest_1samp.html)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/big-data/18-pvalue-errors/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/big-data/20-paired-test/' | relative_url }})
