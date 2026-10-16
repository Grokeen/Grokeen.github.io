---
layout: content
title: "[파이썬 공부 37] lambda는 짧은 식을 함수로 만들 때 쓰기"
date: 2021-05-04 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 37
study_unit: 4
permalink: /study/2021/python/37-lambda/
---

정렬 기준을 한 줄 함수로 표현해 보았다. 짧은 함수를 위한 문법이지 모든 함수를 줄이라는 뜻은 아니었다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

lambda 매개변수: 식은 식 하나의 결과를 반환하는 함수를 만든다. return을 쓰지 않고 여러 문장을 넣을 수 없다. 항목의 일부를 뽑는 정렬 key처럼 짧고 명확한 곳에 어울린다. 로직에 이름을 붙여 설명할 필요가 있으면 def가 더 적합하다.

## 따라 해 보기

{% raw %}
```python
readings = [("실내", 24), ("실외", 18), ("창가", 22)]
ordered = sorted(readings, key=lambda item: item[1])
print(ordered)
double = lambda value: value * 2
print(double(7))
```
{% endraw %}

## 실행 결과

```text
[('실외', 18), ('창가', 22), ('실내', 24)]
14
```

## 코드를 따라 읽기

정렬 key는 각 튜플의 두 번째 값인 온도를 반환한다. 원래 튜플은 그대로 유지하고 순서만 바뀐다. double 예제는 동작을 보여 주기 위한 것이며 실제 코드에서 이름 붙인 계산이 중요하면 def `double(value)`로 정의해 설명을 덧붙일 수 있다.

## 헷갈린 부분과 주의점

반복문 안의 lambda가 반복 변수를 사용할 때는 호출 시점의 값을 참조하는 지연 바인딩에 주의한다. 복잡한 조건식을 한 줄에 욱여넣지 않는다.

## 복습 문제

key=lambda item: `item[0]`으로 바꾸면 무엇을 기준으로 정렬할까?

**풀이:** 튜플의 첫 값인 장소 이름 문자열을 기준으로 정렬한다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/tutorial/controlflow.html#lambda-expressions)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: 지역 변수와 바깥 범위, nonlocal 이해하기]({{ '/study/2021/python/36-scope/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: try와 except로 예상한 오류 처리하기 →]({{ '/study/2021/python/38-try-except/' | relative_url }})
