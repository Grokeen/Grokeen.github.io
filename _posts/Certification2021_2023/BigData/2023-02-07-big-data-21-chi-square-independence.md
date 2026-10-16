---
layout: content
title: "[빅데이터분석기사 21] 카이제곱 독립성 검정의 기대도수"
date: 2023-02-07 09:00:00 +0900
categories: [BigDataCertification]
tags: [자격증학습, 빅데이터분석기사]
series: study-certifications-2021-2023
study_track: big-data
study_order: 61
study_unit: 11
permalink: /study/certifications/2021-2023/big-data/21-chi-square-independence/
---

범주 자료는 평균 비교 대신 분할표로 정리했다. 기대도수가 작을 때의 한계도 함께 적었다.

> Python 3.9·NumPy 1.20.3·pandas 1.2.5·SciPy 1.6.3·scikit-learn 0.24.2를 이용한 학습용 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

독립성 검정은 두 범주형 변수의 독립을 귀무가설로 삼는다. 기대도수는 행 합×열 합/전체 합이며 Pearson 카이제곱 통계량은 각 셀의 (관측−기대)²/기대를 더한다. 빈도 자료와 독립 관측이라는 조건이 중요하다. 작은 기대도수에서는 점근 근사가 부적절할 수 있어 정확 검정 등 대안을 검토한다.

## 예제 문제 · 창작

2×2 분할표 [[20,10],[10,20]]에 연속성 보정을 적용하지 않고 검정하라. 기대도수와 자유도는?

## 풀이와 판단 근거

각 행·열 합이 30이므로 모든 기대도수는 15, 자유도는 1이다. 통계량은 6.6667, p값 약 0.0098이다. 유의한 연관이 곧 인과 관계를 뜻하지 않으며 효과의 방향과 크기도 원자료와 함께 설명한다. SciPy 기본 보정과 구분하려고 correction=False를 명시했다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```python
from scipy.stats import chi2_contingency

statistic, pvalue, dof, expected = chi2_contingency(
    [[20, 10], [10, 20]], correction=False
)
print(expected.tolist())
print(f"{statistic:.4f} {pvalue:.4f} {dof}")
```
{% endraw %}

## 실행 결과

```text
[[15.0, 15.0], [15.0, 15.0]]
6.6667 0.0098 1
```

## 헷갈린 부분과 주의점

비율을 빈도인 것처럼 넣거나 동일 대상의 반복 관측을 독립 사례로 세지 않는다.

## 복습 문제

2×3 분할표의 자유도는?

**풀이:** (2−1)(3−1)=2다.

## 참고한 문서

[개념·API의 원문 자료](https://docs.scipy.org/doc/scipy-1.6.3/reference/generated/scipy.stats.chi2_contingency.html)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/big-data/20-paired-test/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/big-data/22-correlation-causality/' | relative_url }})
