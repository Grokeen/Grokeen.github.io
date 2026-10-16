---
layout: content
title: "[파이썬 공부 06] 비교 연산과 범위 조건"
date: 2021-01-20 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 6
study_unit: 1
permalink: /study/2021/python/06-comparisons/
---

조건을 문장처럼 읽으면서 비교식을 작성했다. 센서 값이 정상 범위에 있는지 확인하는 상황을 떠올리면 이해하기 쉬웠다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

==와 !=는 값의 같음과 다름을, <와 <=는 크기와 경계 포함 여부를 비교한다. 비교 결과는 bool이다. 파이썬에서는 0 <= value <= 100처럼 비교를 연결할 수 있다. 이는 두 조건을 모두 만족하는지 확인하며, 가운데 식은 한 번만 평가한다.

## 따라 해 보기

{% raw %}
```python
temperature = 24
print(temperature == 24)
print(temperature != 24)
print(20 <= temperature <= 26)
print(temperature < 24)
print("24" == 24)
```
{% endraw %}

## 실행 결과

```text
True
False
True
False
False
```

## 코드를 따라 읽기

온도가 24이므로 20 이상 26 이하 조건은 True다. <는 경계인 24를 포함하지 않는다. 마지막 줄은 문자열과 정수의 자료형이 달라 False다. 외부 입력을 숫자로 비교하려면 먼저 적절한 숫자 변환과 검증을 해야 한다.

## 헷갈린 부분과 주의점

is는 일반적인 값 비교 연산자가 아니다. None 여부는 is None으로 확인하지만 숫자나 문자열의 같은 값 여부에는 ==를 쓴다.

## 복습 문제

score가 60일 때 score > 60과 score >= 60은?

**풀이:** 앞은 False, 뒤는 True다. 통과 기준에 경계 점수를 포함하는지 먼저 정해야 한다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/reference/expressions.html#comparisons)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: 몫과 나머지로 묶음 수 계산하기]({{ '/study/2021/python/05-division-modulo/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: and, or, not과 단락 평가 →]({{ '/study/2021/python/07-boolean-logic/' | relative_url }})
