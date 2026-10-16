---
layout: content
title: "[파이썬 공부 18] 튜플과 언패킹으로 여러 값 받기"
date: 2021-03-01 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 18
study_unit: 2
permalink: /study/2021/python/18-tuples-unpacking/
---

좌표처럼 함께 움직이는 값들을 튜플로 묶었다. 여러 변수에 한 번에 나누어 받는 언패킹도 연습했다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

튜플은 항목의 연결을 변경할 수 없는 순서형 자료다. 괄호보다 쉼표가 튜플을 만드는 핵심이라 항목 하나는 (3,)처럼 적는다. 언패킹은 오른쪽 항목을 왼쪽 변수에 순서대로 연결한다. 별표가 붙은 변수는 남는 항목을 리스트로 모아 받는다.

## 따라 해 보기

{% raw %}
```python
point = (3, 5)
x, y = point
print(x, y)
first, *middle, last = (1, 2, 3, 4)
print(first, middle, last)
a, b = 10, 20
a, b = b, a
print(a, b)
print(type((3,)).__name__)
```
{% endraw %}

## 실행 결과

```text
3 5
1 [2, 3] 4
20 10
tuple
```

## 코드를 따라 읽기

point의 두 항목을 x와 y에 각각 연결했다. 별표 middle에는 가운데 항목들이 리스트로 들어간다. 변수 교환에서는 오른쪽의 이전 b와 a를 먼저 평가하므로 임시 변수를 직접 만들 필요가 없다. 튜플의 항목 자체를 바꾸는 대입은 허용되지 않는다.

## 헷갈린 부분과 주의점

튜플 안에 변경 가능한 리스트가 있으면 그 내부 리스트는 바뀔 수 있다. 튜플이라는 이유만으로 내부 데이터까지 모두 불변이라고 생각하지 않는다.

## 복습 문제

(3)의 자료형은 무엇일까?

**풀이:** int다. 항목 하나의 튜플에는 쉼표가 필요하다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/tutorial/datastructures.html#tuples-and-sequences)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: 대입, 얕은 복사, 깊은 복사 구분하기]({{ '/study/2021/python/17-list-copy/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: 딕셔너리로 이름과 값을 연결하기 →]({{ '/study/2021/python/19-dictionaries/' | relative_url }})
