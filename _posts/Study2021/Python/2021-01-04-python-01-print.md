---
layout: content
title: "[파이썬 공부 01] print로 첫 문장 출력하기"
date: 2021-01-04 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 1
study_unit: 1
permalink: /study/2021/python/01-print/
---

오늘은 프로그램이 계산한 값을 화면에서 확인하는 방법부터 정리했다. 출력은 결과뿐 아니라 코드의 흐름을 살펴볼 때도 유용했다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

`print()`는 괄호 안의 객체를 문자열 형태로 출력한다. 문자열은 따옴표로 감싸고 숫자는 그대로 적는다. 여러 값을 쉼표로 나누면 기본적으로 한 칸씩 띄워 출력하며, sep는 값 사이의 문자, end는 마지막에 붙일 문자를 정한다. 문자열 안에 있는 #는 주석이 아니라 문자다.

## 따라 해 보기

{% raw %}
```python
print("파이썬 공부 시작")
print("진도", 1, "일차")
print("온도", 22, sep=": ")
print("다음", end=" → ")
print("변수")
```
{% endraw %}

## 실행 결과

```text
파이썬 공부 시작
진도 1 일차
온도: 22
다음 → 변수
```

## 코드를 따라 읽기

첫 줄은 문자열 하나를 출력한다. 두 번째 줄은 세 객체를 기본 구분자인 공백으로 연결한다. 마지막 두 줄은 첫 print의 end를 바꿔 같은 줄에 이어진다. 줄바꿈을 넣지 않으면 다음 출력도 현재 줄 뒤에 붙는다는 점을 확인했다.

## 헷갈린 부분과 주의점

문자열의 시작과 끝 따옴표를 맞춘다. print의 반환값은 출력한 문장이 아니라 None이므로 결과를 저장할 함수와 화면에 보여 줄 함수를 구별해야 한다.

## 복습 문제

`print("A", "B", sep="-")`의 결과는 무엇일까?

**풀이:** A-B가 출력된다. sep는 값 사이에만 들어가고 기본 줄바꿈은 마지막에 붙는다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/library/functions.html#print)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: 변수와 대입, 이름이 값을 가리키는 방식 →]({{ '/study/2021/python/02-variables/' | relative_url }})
