---
layout: content
title: "[파이썬 공부 55] statistics로 평균·중앙값·표준편차 구하기"
date: 2021-07-03 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 55
study_unit: 5
permalink: /study/2021/python/55-statistics/
---

평균 하나로는 이상값을 놓칠 수 있어 중앙값도 함께 비교했다. 모표준편차와 표본표준편차의 구분을 메모했다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

mean은 산술평균, median은 가운데 값을 나타낸다. pstdev는 전체 모집단으로 보는 데이터의 표준편차이고 stdev는 표본에서 모집단 변동성을 추정할 때 사용하는 표본표준편차다. 어떤 수치를 쓸지는 수집 목적에 따라 다르다. 빈 입력이나 항목 수 부족도 처리해야 한다.

## 따라 해 보기

{% raw %}
```python
from statistics import mean, median, pstdev

values = [10, 10, 10, 50]
print(mean(values))
print(median(values))
print(round(pstdev([1, 1, 3, 3]), 2))
```
{% endraw %}

## 실행 결과

```text
20
10.0
1.0
```

## 코드를 따라 읽기

첫 목록은 50 하나가 평균을 20으로 올리지만 가운데 두 값의 평균인 중앙값은 10이다. [1, 1, 3, 3]은 평균 2에서 각각 1씩 떨어져 있어 모표준편차가 1이다. 센서 이상값을 판단할 때도 요약 통계만으로 원인을 단정하지 않기로 했다.

## 헷갈린 부분과 주의점

빈 데이터의 평균은 자동으로 0이 되지 않고 StatisticsError가 난다. 표본표준편차에는 적어도 두 항목이 필요하다.

## 복습 문제

[1, 2, 100]의 중앙값과 평균 중 이상값 영향이 작은 것은?

**풀이:** 중앙값 2다. 평균은 103/3으로 큰 값의 영향을 많이 받는다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/library/statistics.html)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: math로 제곱근과 실수 비교 다루기]({{ '/study/2021/python/54-math-isclose/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: Decimal로 십진수 계산 의도 표현하기 →]({{ '/study/2021/python/56-decimal/' | relative_url }})
