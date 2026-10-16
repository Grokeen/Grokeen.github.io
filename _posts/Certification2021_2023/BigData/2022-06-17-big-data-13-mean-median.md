---
layout: content
title: "[빅데이터분석기사 13] 평균과 중앙값이 다른 이유"
date: 2022-06-17 09:00:00 +0900
categories: [BigDataCertification]
tags: [자격증학습, 빅데이터분석기사]
series: study-certifications-2021-2023
study_track: big-data
study_order: 53
study_unit: 10
permalink: /study/certifications/2021-2023/big-data/13-mean-median/
---

대표값 하나만 적으면 분포의 꼬리가 보이지 않았다. 극단값이 평균과 중앙값에 주는 영향을 비교했다.

> Python 3.9·NumPy 1.20.3·pandas 1.2.5·SciPy 1.6.3·scikit-learn 0.24.2를 이용한 학습용 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

평균은 모든 값을 더해 개수로 나누므로 각 값의 크기에 영향을 받는다. 중앙값은 정렬한 위치의 중심으로 정의한다. 오른쪽 꼬리가 긴 분포에서는 평균이 중앙값보다 커질 수 있지만 모든 자료에서 반드시 그렇다는 법칙으로 외우지 않는다. 대표값과 함께 범위·사분위수·표본 수를 확인한다.

## 예제 문제 · 창작

가상 대기 시간 [1,2,3,4,100]의 평균과 중앙값을 구하고 두 값을 함께 보고할 이유를 설명하라.

## 풀이와 판단 근거

평균은 22, 중앙값은 3이다. 큰 값 100이 평균을 끌어올린다. 중앙값만 보고하면 일부 매우 긴 대기를 놓칠 수 있고 평균만 보고하면 전형적인 대기를 오해할 수 있다. 데이터 오류인지 실제 긴 대기인지 확인하는 절차도 필요하다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```python
import pandas as pd

values = pd.Series([1, 2, 3, 4, 100])
print(f"{values.mean():.1f}")
print(f"{values.median():.1f}")
```
{% endraw %}

## 실행 결과

```text
22.0
3.0
```

## 헷갈린 부분과 주의점

중앙값이 안정적이라는 이유로 극단값이 있는 관측을 무조건 무시하지 않는다.

## 복습 문제

모든 값에 10을 더하면 평균과 중앙값은?

**풀이:** 둘 다 10만큼 증가한다.

## 참고한 문서

[pandas 1.2.5 공식 자료](https://github.com/pandas-dev/pandas/blob/v1.2.5/pandas/core/series.py)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/big-data/12-group-time-validation/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/big-data/14-variance-ddof/' | relative_url }})
