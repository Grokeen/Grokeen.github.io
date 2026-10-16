---
layout: content
title: "[파이썬 공부 04] 산술 연산과 계산 순서"
date: 2021-01-14 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 4
study_unit: 1
permalink: /study/2021/python/04-arithmetic/
---

괄호를 조금 바꾸었을 뿐인데 결과가 달라지는 식을 비교했다. 계산 순서를 눈으로 추측하기보다 괄호로 의도를 드러내기로 했다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

+와 -는 덧셈과 뺄셈, *는 곱셈, /는 나눗셈, **는 거듭제곱이다. 일반적으로 거듭제곱, 곱셈·나눗셈, 덧셈·뺄셈 순으로 계산한다. /는 정수끼리 나누더라도 float를 반환한다. 긴 식에서는 중간값을 변수에 저장하면 각 단계가 무엇을 뜻하는지 설명하기 좋다.

## 따라 해 보기

{% raw %}
```python
price = 1200
quantity = 3
shipping = 500
print(price * quantity + shipping)
print(price * (quantity + 1))
print(2 ** 3)
print(8 / 2)
```
{% endraw %}

## 실행 결과

```text
4100
4800
8
4.0
```

## 코드를 따라 읽기

첫 계산은 상품 세 개의 금액에 배송비를 한 번 더한다. 두 번째 계산은 수량을 먼저 늘린 뒤 가격을 곱한다. 2 ** 3은 2를 세 번 곱한 8이다. 같은 기호라도 문자열 곱셈처럼 자료형에 따라 의미가 달라질 수 있어 우선 숫자 연산부터 익혔다.

## 헷갈린 부분과 주의점

^는 거듭제곱이 아니라 비트 XOR다. 돈처럼 소수점의 정확성이 필요한 계산에 float를 무조건 사용하지 않고 뒤에서 Decimal도 비교한다.

## 복습 문제

2 + 3 * 4와 (2 + 3) * 4의 값은?

**풀이:** 각각 14와 20이다. 괄호가 있는 덧셈은 곱셈보다 먼저 계산한다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/reference/expressions.html#binary-arithmetic-operations)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: int, float, str, bool 자료형 구분하기]({{ '/study/2021/python/03-basic-types/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: 몫과 나머지로 묶음 수 계산하기 →]({{ '/study/2021/python/05-division-modulo/' | relative_url }})
