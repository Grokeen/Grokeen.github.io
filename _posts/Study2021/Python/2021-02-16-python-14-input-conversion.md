---
layout: content
title: "[파이썬 공부 14] input으로 받은 문자열을 숫자로 변환하기"
date: 2021-02-16 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 14
study_unit: 2
permalink: /study/2021/python/14-input-conversion/
---

입력값을 곧바로 계산하면 안 된다는 점을 연습했다. 오늘 예제에는 숫자 21을 입력한다고 가정했다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

`input()`은 한 줄을 읽어 마지막 줄바꿈을 제거한 문자열을 반환한다. 숫자 계산을 하려면 int나 float로 변환해야 한다. 이 예제는 21처럼 올바른 수를 입력하는 경우부터 다룬다. 빈 문자열이나 글자를 넣었을 때 생기는 ValueError는 예외 처리 글에서 다시 정리한다.

## 따라 해 보기

표준 입력으로 `21`을 입력한다. 아래 결과에는 터미널의 입력 echo를 포함하지 않았다.

{% raw %}
```python
text = input()
temperature = float(text)
print(type(text).__name__)
print(temperature + 1)
print(f"입력 온도: {temperature:.1f}")
```
{% endraw %}

## 실행 결과

```text
str
22.0
입력 온도: 21.0
```

## 코드를 따라 읽기

코드를 example.py로 저장하고 python3 example.py를 실행한 다음 21을 입력한다. 입력한 글자는 문자열이므로 `float(text)`로 실수로 바꾼다. 입력 자체를 echo하는 터미널 표시와 print가 출력하는 결과는 다르다. 아래 실행 결과에는 프로그램의 출력만 적었다.

## 헷갈린 부분과 주의점

`int("21.5")`는 소수를 알아서 반올림하지 않는다. 입력이 없는 환경에서 `input()`을 호출하면 EOFError가 날 수 있으므로 자동 실행 시에는 입력도 함께 제공한다.

## 복습 문제

두 번 입력한 `"2"`와 `"3"`을 문자열로 더하면 어떤 결과일까?

**풀이:** `"23"`이다. 수치 합 5가 필요하면 각각 숫자로 변환한 뒤 더해야 한다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/library/functions.html#input)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: f-string으로 숫자와 단위를 읽기 좋게 출력하기]({{ '/study/2021/python/13-f-strings/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: 리스트로 순서 있는 값 묶기 →]({{ '/study/2021/python/15-lists/' | relative_url }})
