---
layout: content
title: "[빅데이터분석기사 22] 상관계수와 인과 추론의 거리"
date: 2023-03-08 09:00:00 +0900
categories: [BigDataCertification]
tags: [자격증학습, 빅데이터분석기사]
series: study-certifications-2021-2023
study_track: big-data
study_order: 62
study_unit: 11
permalink: /study/certifications/2021-2023/big-data/22-correlation-causality/
---

산점도와 상관계수를 함께 봤다. 두 변수가 함께 움직여도 개입의 효과는 다른 질문이었다.

> Python 3.9·NumPy 1.20.3·pandas 1.2.5·SciPy 1.6.3·scikit-learn 0.24.2를 이용한 학습용 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

Pearson 상관계수는 선형 연관의 방향과 정도를 나타내며 −1~1 범위다. 단위 변환에 불변인 성질이 있지만 이상치나 비선형 관계를 놓치기 쉽다. 상관 0은 일반적인 독립을 의미하지 않는다. 공통 원인·선택 편향·역인과를 배제하지 않고 인과 효과로 해석해서는 안 된다.

## 예제 문제 · 창작

x=[1,2,3,4], y=[2,4,6,8]의 Pearson 상관은? 이 값이 x를 인위적으로 늘리면 y가 두 배가 된다는 인과 주장을 보장하는가?

## 풀이와 판단 근거

상관은 1이지만 인과 주장은 보장하지 않는다. 주어진 네 관측이 완전한 선형 관계를 가진다는 뜻이다. 관찰 자료의 생성 과정이나 개입 설계를 따로 확인해야 하며 이 작은 예제의 상관을 모집단 전체의 확정적 관계로 일반화하지 않는다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```python
from scipy.stats import pearsonr

r, pvalue = pearsonr([1, 2, 3, 4], [2, 4, 6, 8])
print(f"{r:.3f}")
```
{% endraw %}

## 실행 결과

```text
1.000
```

## 헷갈린 부분과 주의점

상관계수가 높다고 두 변수가 같은 단위이거나 같은 값을 갖는 것은 아니다.

## 복습 문제

U자형 관계에서 Pearson 상관이 0에 가까울 수 있을까?

**풀이:** 가능하다. 산점도로 비선형 관계를 확인한다.

## 참고한 문서

[개념·API의 원문 자료](https://docs.scipy.org/doc/scipy-1.6.3/reference/generated/scipy.stats.pearsonr.html)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/big-data/21-chi-square-independence/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/big-data/23-linear-regression/' | relative_url }})
