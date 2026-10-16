---
layout: content
title: "[파이썬 공부 56] Decimal로 십진수 계산 의도 표현하기"
date: 2021-07-06 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 56
study_unit: 5
permalink: /study/2021/python/56-decimal/
---

금액처럼 십진수 자릿수에 의미가 있는 계산을 별도로 해 보았다. float를 거쳐 만들면 이미 생긴 오차도 들어갈 수 있었다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

decimal.Decimal은 지정된 문맥의 정밀도로 십진수 연산을 제공한다. 문자열로 생성하면 입력한 십진수 값을 정확히 표현하는 데 유리하다. quantize는 원하는 자릿수와 반올림 규칙을 명시한다. 반올림 정책은 계산 목적에 맞게 선택하며 매 단계 반올림할지 마지막에 할지도 정해야 한다.

## 따라 해 보기

{% raw %}
```python
from decimal import Decimal, ROUND_HALF_UP

price = Decimal("0.1") + Decimal("0.2")
print(price)
amount = Decimal("12.345")
print(amount.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP))
print(Decimal("1.00") == Decimal("1"))
```
{% endraw %}

## 실행 결과

```text
0.3
12.35
True
```

## 코드를 따라 읽기

문자열 0.1과 0.2를 Decimal로 만들면 합이 0.3이다. quantize의 0.01은 소수점 두 자리 형식을 뜻한다. 1.00과 1은 표현 자릿수가 달라도 수치로 같다고 비교된다. 금액 단위와 반올림 시점을 문서에 남기는 것이 자료형 선택만큼 중요했다.

## 헷갈린 부분과 주의점

`Decimal(0.1)`은 문자열 `"0.1"`로 만든 것과 다르다. 일반 float와 Decimal을 무심코 섞어 연산하면 TypeError가 날 수 있다.

## 복습 문제

ROUND_HALF_UP으로 2.345를 두 자리로 맞추면?

**풀이:** 2.35다. 정한 반올림 규칙에 따라 세 번째 자리가 반영된다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/library/decimal.html)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: statistics로 평균·중앙값·표준편차 구하기]({{ '/study/2021/python/55-statistics/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: random으로 재현 가능한 모의 데이터 만들기 →]({{ '/study/2021/python/57-random/' | relative_url }})
