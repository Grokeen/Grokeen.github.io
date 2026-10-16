---
layout: content
title: "[라즈베리파이 공부 17] 이벤트 콜백에 필요한 값을 함께 전달하기"
date: 2021-10-24 09:00:00 +0900
categories: [RaspberryPi]
tags: [2021학습노트, 라즈베리파이]
series: study-2021
study_track: raspberry-pi
study_order: 89
study_unit: 8
permalink: /study/2021/raspberry-pi/17-callback-partial/
---

같은 출력 함수를 여러 버튼에 연결할 때 인자를 미리 묶는 방법을 정리했다. 등록 순간에 호출되지 않도록 주의했다.

> 장비와 해당 모듈이 필요한 예제. 코드를 `example.py`로 저장하고 라즈베리파이에서 `python3 example.py`로 실행한다. 실제 장비 실행 결과는 확인 방법으로 구분했다.

## 오늘 정리한 개념

functools.partial은 기존 함수의 일부 인자를 고정한 새 호출 가능 객체를 만든다. GPIO Zero 이벤트에 그대로 등록하면 이벤트가 발생할 때 나머지 호출이 이루어진다. 아래는 BCM27-GND 버튼에 메시지를 연결한다. 느린 파일 전송 같은 작업은 콜백에서 오래 처리하기보다 큐로 넘기는 편이 좋다.

## 따라 해 보기

{% raw %}
```python
from functools import partial
from gpiozero import Button
from time import sleep

def announce(message):
    print(message)

with Button(27) as button:
    button.when_pressed = partial(announce, "복습 버튼 눌림")
    sleep(5)
```
{% endraw %}

## 장비에서 확인할 내용

장비 확인: 5초 동안 버튼을 누를 때마다 복습 버튼 눌림 문구가 출력된다.

## 코드를 따라 읽기

partial을 만들 때 announce가 실행되는 것은 아니다. 호출 대상과 문자열을 함께 보관했다가 콜백으로 사용한다. 반복문에서 lambda가 변수를 늦게 참조하는 문제를 피하는 데도 인자 고정 방식을 활용할 수 있다. 여기서는 버튼 하나로 동작을 단순화했다.

## 헷갈린 부분과 주의점

콜백이 실행되는 시점과 메인 흐름은 다를 수 있다. 여러 곳에서 같은 데이터를 수정하면 경합을 고려해야 하며 global만 붙여 해결되지는 않는다.

## 복습 문제

`partial(announce, "A")`와 `announce("A")`의 차이는?

**풀이:** 앞은 나중에 호출할 객체를 만들고 뒤는 즉시 실행한다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/library/functools.html#functools.partial)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: 버튼 바운스와 bounce_time]({{ '/study/2021/raspberry-pi/16-debounce/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: PWMLED로 듀티 비와 밝기 다루기 →]({{ '/study/2021/raspberry-pi/18-pwm-led/' | relative_url }})
