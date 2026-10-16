---
layout: content
title: "[파이썬 공부 39] raise로 함수 입력 조건 알리기"
date: 2021-05-10 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 39
study_unit: 4
permalink: /study/2021/python/39-raise/
---

함수에 들어올 수 없는 값을 조용히 보정할지 오류로 알릴지 생각했다. 이번에는 호출자가 고칠 수 있도록 명시적으로 거절했다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

raise는 예외를 직접 발생시킨다. 자료형은 맞지만 허용 범위를 벗어난 값에는 ValueError를 사용할 수 있다. 함수의 입력 조건을 먼저 검사하면 잘못된 값으로 계산을 계속하지 않는다. 메시지에는 허용 범위와 문제의 맥락을 적어 호출자가 원인을 파악하게 한다.

## 따라 해 보기

{% raw %}
```python
def percent(value):
    if not 0 <= value <= 100:
        raise ValueError("백분율은 0~100이어야 함")
    return value / 100

print(percent(25))
try:
    percent(120)
except ValueError as error:
    print(error)
```
{% endraw %}

## 실행 결과

```text
0.25
백분율은 0~100이어야 함
```

## 코드를 따라 읽기

25는 조건을 통과해 비율 0.25가 된다. 120은 예외를 발생시켜 정상 반환 경로로 가지 않는다. 호출하는 쪽에서 예외 객체를 error라는 이름으로 받아 메시지를 출력했다. 반환값과 오류 신호를 섞지 않으면 0 같은 정상값의 의미도 유지된다.

## 헷갈린 부분과 주의점

사용자에게 보여 줄 메시지에 비밀번호 같은 비밀값을 넣지 않는다. 예외를 잡은 뒤 같은 문제를 숨긴 채 임의의 성공값을 돌려주지 않기로 했다.

## 복습 문제

`percent(-1)`을 호출하면 어떤 일이 일어날까?

**풀이:** 범위 검사를 통과하지 못해 같은 ValueError가 발생한다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/tutorial/errors.html#raising-exceptions)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: try와 except로 예상한 오류 처리하기]({{ '/study/2021/python/38-try-except/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: finally로 성공·실패와 관계없는 정리 수행하기 →]({{ '/study/2021/python/40-finally/' | relative_url }})
