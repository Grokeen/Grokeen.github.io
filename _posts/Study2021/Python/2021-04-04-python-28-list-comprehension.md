---
layout: content
title: "[파이썬 공부 28] 리스트 컴프리헨션으로 변환과 필터 표현하기"
date: 2021-04-04 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 28
study_unit: 3
permalink: /study/2021/python/28-list-comprehension/
---

새 목록을 만드는 반복문을 한 식으로 줄여 보았다. 짧아지는 것보다 변환과 선별 조건이 잘 읽히는지를 기준으로 삼았다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

[식 for 변수 in 대상 if 조건]은 조건에 맞는 항목에 식을 적용해 새 리스트를 만든다. 앞의 식은 결과값이고 뒤의 if는 항목을 포함할지 정한다. 원본을 직접 바꾸지 않는다. 여러 중첩 반복이나 부작용이 섞여 길어지면 일반 for문이 설명하기 쉽다.

## 따라 해 보기

{% raw %}
```python
numbers = [1, 2, 3, 4, 5]
squares = [number ** 2 for number in numbers]
even_squares = [number ** 2 for number in numbers if number % 2 == 0]
print(squares)
print(even_squares)
print(numbers)
```
{% endraw %}

## 실행 결과

```text
[1, 4, 9, 16, 25]
[4, 16]
[1, 2, 3, 4, 5]
```

## 코드를 따라 읽기

첫 식은 모든 수를 제곱한다. 두 번째는 먼저 원래 수가 짝수인지 검사하고, 통과한 2와 4의 제곱만 저장한다. numbers는 변경되지 않는다. 변환 결과를 if로 검사하는 것과 원본 항목을 검사하는 것을 구별해서 읽었다.

## 헷갈린 부분과 주의점

조건에 따라 결과를 두 가지로 바꾸는 삼항식은 [a if 조건 else b for ...] 형태로 앞에 놓는다. 필터 if와 위치·역할이 다르다.

## 복습 문제

[x + 1 for x in [1, 2] if x > 1]의 결과는?

**풀이:** [3]이다. 2만 조건을 통과한 뒤 1이 더해진다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/tutorial/datastructures.html#list-comprehensions)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: zip으로 두 목록을 나란히 묶기]({{ '/study/2021/python/27-zip/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: 딕셔너리·집합 컴프리헨션 사용하기 →]({{ '/study/2021/python/29-dict-set-comprehension/' | relative_url }})
