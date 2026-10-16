---
layout: content
title: "[파이썬 공부 15] 리스트로 순서 있는 값 묶기"
date: 2021-02-19 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 15
study_unit: 2
permalink: /study/2021/python/15-lists/
---

온도 세 개를 각각의 변수 대신 리스트 하나에 저장했다. 순서가 있는 여러 값을 다루는 기본 단위로 익혔다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

리스트는 대괄호 안에 항목을 쉼표로 구분해 만들고 순서를 유지한다. 같은 값이 여러 번 들어갈 수 있으며 항목을 변경할 수도 있다. len은 항목 수를 반환하고 in은 특정 값이 들어 있는지 확인한다. 빈 리스트와 원소가 하나인 리스트를 구별해 두면 반복문으로 확장하기 쉽다.

## 따라 해 보기

{% raw %}
```python
temperatures = [20, 22, 21]
print(temperatures[0])
temperatures[1] = 23
print(temperatures)
print(len(temperatures))
print(21 in temperatures)
print(temperatures[-2:])
```
{% endraw %}

## 실행 결과

```text
20
[20, 23, 21]
3
True
[23, 21]
```

## 코드를 따라 읽기

위치 1의 값을 바꾸므로 두 번째 항목 22가 23이 된다. in은 항목의 존재 여부만 알려 주며 위치는 반환하지 않는다. 마지막 슬라이스는 끝의 두 항목으로 새 리스트를 만든다. 문자열에서 배운 인덱스와 슬라이싱 규칙이 그대로 이어진다.

## 헷갈린 부분과 주의점

마지막 위치는 `len(리스트)`가 아니라 `len(리스트)` - 1이다. 빈 리스트에서 [0]을 읽으면 IndexError가 난다.

## 복습 문제

temperatures에 23이 두 번 들어 있어도 리스트를 만들 수 있을까?

**풀이:** 가능하다. 리스트는 집합과 달리 중복 항목을 허용한다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/tutorial/introduction.html#lists)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: input으로 받은 문자열을 숫자로 변환하기]({{ '/study/2021/python/14-input-conversion/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: append, extend, pop으로 리스트 변경하기 →]({{ '/study/2021/python/16-list-methods/' | relative_url }})
