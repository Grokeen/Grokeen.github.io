---
layout: content
title: "[파이썬 공부 03] int, float, str, bool 자료형 구분하기"
date: 2021-01-10 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 3
study_unit: 1
permalink: /study/2021/python/03-basic-types/
---

숫자처럼 보이는 문자열과 실제 숫자를 구분해 보았다. 화면에 비슷하게 보여도 자료형이 다르면 가능한 연산이 달랐다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

int는 정수, float는 부동소수점 수, str은 문자열, bool은 참과 거짓을 표현한다. `type()`으로 실제 자료형을 확인할 수 있다. `str(값)`은 문자열 변환이고 `int("12")`는 정수로 읽을 수 있는 문자열을 변환한다. 입력 데이터는 겉모양만 보고 숫자라고 가정하지 않기로 했다.

## 따라 해 보기

{% raw %}
```python
text = "12"
number = int(text)
print(type(text).__name__)
print(type(number).__name__)
print(number + 3)
print(text + "3")
print(bool(0), bool(1))
```
{% endraw %}

## 실행 결과

```text
str
int
15
123
False True
```

## 코드를 따라 읽기

정수 12에 3을 더하면 15지만 문자열 `"12"`와 `"3"`을 더하면 이어 붙인 `"123"`이다. `__name__`을 출력해 자료형 이름만 확인했다. `bool(0)`은 False이고 0이 아닌 정수는 True다. 자료형 변환은 원본 text를 바꾸지 않고 새 값을 돌려준다.

## 헷갈린 부분과 주의점

`int("12.5")`는 바로 변환되지 않아 ValueError가 난다. `int(float("12.5"))`는 소수 부분을 버리므로 필요한 의미인지 먼저 판단한다.

## 복습 문제

`bool("False")`의 값은 무엇일까?

**풀이:** True다. 문자열 내용이 False라는 단어여도 비어 있지 않은 문자열이기 때문이다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/library/stdtypes.html)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: 변수와 대입, 이름이 값을 가리키는 방식]({{ '/study/2021/python/02-variables/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: 산술 연산과 계산 순서 →]({{ '/study/2021/python/04-arithmetic/' | relative_url }})
