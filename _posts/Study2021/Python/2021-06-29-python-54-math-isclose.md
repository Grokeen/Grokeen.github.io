---
layout: content
title: "[파이썬 공부 54] math로 제곱근과 실수 비교 다루기"
date: 2021-06-29 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 54
study_unit: 5
permalink: /study/2021/python/54-math-isclose/
---

0.1을 더한 값이 기대한 십진수와 딱 같지 않은 이유를 살폈다. 표시 반올림과 수치 비교 허용 오차를 나누었다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

math는 제곱근·올림·내림 등 수학 함수를 제공한다. float는 이진 부동소수점이라 일부 십진수를 정확히 표현하지 못한다. isclose는 상대·절대 허용 오차로 근접 여부를 검사한다. 적절한 오차 범위는 측정 단위와 요구 정밀도를 바탕으로 정해야 한다.

## 따라 해 보기

{% raw %}
```python
import math

print(math.sqrt(49))
print(math.floor(2.9), math.ceil(2.1))
print(0.1 + 0.2 == 0.3)
print(math.isclose(0.1 + 0.2, 0.3))
print(math.isclose(0.00001, 0.0, abs_tol=0.0001))
```
{% endraw %}

## 실행 결과

```text
7.0
2 3
False
True
True
```

## 코드를 따라 읽기

0.1 + 0.2의 이진 표현 오차 때문에 정확한 == 비교는 False일 수 있다. isclose는 작은 차이를 허용한다. 0 주변에서는 상대 오차만으로 판단하기 어려워 abs_tol을 지정한 예제도 넣었다. 정밀도 요구가 다른 데이터에 같은 오차를 기계적으로 적용하지 않는다.

## 헷갈린 부분과 주의점

round로 출력 자릿수를 맞춘다고 내부 계산 오차가 모두 없어지지는 않는다. 음수에서 floor는 0 방향 절삭과 다르다.

## 복습 문제

`math.floor(-2.1)`은 -2일까?

**풀이:** -3이다. 더 작거나 같은 정수 쪽으로 내림한다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/library/math.html)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: itertools로 조합과 연속 흐름 표현하기]({{ '/study/2021/python/53-itertools/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: statistics로 평균·중앙값·표준편차 구하기 →]({{ '/study/2021/python/55-statistics/' | relative_url }})
