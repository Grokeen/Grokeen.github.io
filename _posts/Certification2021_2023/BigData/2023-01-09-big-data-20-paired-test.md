---
layout: content
title: "[빅데이터분석기사 20] 대응표본과 독립표본 검정 선택"
date: 2023-01-09 09:00:00 +0900
categories: [BigDataCertification]
tags: [자격증학습, 빅데이터분석기사]
series: study-certifications-2021-2023
study_track: big-data
study_order: 60
study_unit: 11
permalink: /study/certifications/2021-2023/big-data/20-paired-test/
---

같은 대상의 전후 자료는 두 독립 집단으로 취급하지 않았다. 대응 차이의 평균을 검정한다는 관점을 적었다.

> Python 3.9·NumPy 1.20.3·pandas 1.2.5·SciPy 1.6.3·scikit-learn 0.24.2를 이용한 학습용 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

대응표본 t검정은 짝지어진 값의 차이를 하나의 표본으로 보고 차이의 모평균 0을 검정한다. 짝 사이의 독립성과 차이 분포의 조건을 검토한다. 독립된 두 집단은 별도 문제이며 등분산을 가정하지 않는 Welch 검정 등 선택지가 있다. 단지 행 수가 같다고 대응 관계가 생기지는 않는다.

## 예제 문제 · 창작

같은 가상 대상 다섯 개의 전후 값이 아래와 같다. after−before 평균과 대응 검정 결과를 해석하라.

## 풀이와 판단 근거

차이는 [1,2,1,2,1]이고 평균은 1.4다. after를 첫 인자로 넣으므로 t의 부호는 양수다. 아래에서는 p값이 0.05보다 작다는 판단만 출력한다. 실제 전후 관찰의 변화가 처치의 인과 효과라는 결론에는 대조군·시간 효과 등 추가 설계가 필요하다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```python
import numpy as np
from scipy.stats import ttest_rel

before = np.array([10, 12, 9, 11, 13])
after = np.array([11, 14, 10, 13, 14])
statistic, pvalue = ttest_rel(after, before)
print(f"{(after - before).mean():.1f}")
print(statistic > 0, pvalue < 0.05)
```
{% endraw %}

## 실행 결과

```text
1.4
True True
```

## 헷갈린 부분과 주의점

짝의 행 순서가 어긋나면 엉뚱한 차이를 계산한다. 식별 키로 대응을 검증한 뒤 계산한다.

## 복습 문제

서로 다른 두 집단을 행 순서대로 짝지어도 될까?

**풀이:** 사전에 정당한 대응 설계가 없다면 임의의 짝짓기는 부적절하다.

## 참고한 문서

[개념·API의 원문 자료](https://docs.scipy.org/doc/scipy-1.6.3/reference/generated/scipy.stats.ttest_rel.html)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/big-data/19-one-sample-t/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/big-data/21-chi-square-independence/' | relative_url }})
