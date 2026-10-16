---
layout: content
title: "[라즈베리파이 공부 15] 버튼 이벤트로 LED 제어하기"
date: 2021-10-17 09:00:00 +0900
categories: [RaspberryPi]
tags: [2021학습노트, 라즈베리파이]
series: study-2021
study_track: raspberry-pi
study_order: 87
study_unit: 8
permalink: /study/2021/raspberry-pi/15-button-led/
---

입력 확인과 출력 제어를 연결했다. 함수의 실행 결과 대신 함수 자체를 이벤트에 등록해야 한다는 점을 복습했다.

> 장비와 해당 모듈이 필요한 예제. 코드를 `example.py`로 저장하고 라즈베리파이에서 `python3 example.py`로 실행한다. 실제 장비 실행 결과는 확인 방법으로 구분했다.

## 오늘 정리한 개념

LED는 BCM17과 저항·GND, 버튼은 BCM27과 GND에 연결하고 Button의 기본 풀업을 사용한다. when_pressed와 when_released에는 나중에 실행할 함수를 대입한다. 모든 배선은 전원이 꺼진 상태에서 준비한다. 이 예제는 5초 동안만 이벤트를 처리하도록 제한했다.

## 따라 해 보기

{% raw %}
```python
from gpiozero import Button, LED
from time import sleep

with LED(17) as led, Button(27) as button:
    button.when_pressed = led.on
    button.when_released = led.off
    print("5초 동안 버튼으로 LED 제어")
    sleep(5)
```
{% endraw %}

## 장비에서 확인할 내용

장비 확인: 5초 동안 버튼을 누르면 켜지고 놓으면 꺼진다. 시간이 지나면 장치를 닫고 프로그램이 끝난다.

## 코드를 따라 읽기

led.on은 함수 참조이고 `led.on()`은 지금 실행하는 호출이다. 등록 후 sleep하는 동안 GPIO Zero의 이벤트 처리가 동작한다. 출력 상태가 따라오지 않으면 입력 버튼 자체와 출력 LED를 각각 단독 예제로 확인해 문제 범위를 나눈다.

## 헷갈린 부분과 주의점

이 예제는 이미 누른 상태에서 시작하는 초기 동기화까지 구현하지 않는다. 그런 동작이 필요하면 현재 is_pressed를 읽어 초기 LED 상태를 맞춘다.

## 복습 문제

button.when_pressed = `led.on()`을 쓰면 왜 문제가 될까?

**풀이:** 즉시 LED를 켜고 반환값 None을 이벤트에 대입해 이후 눌림 처리 함수가 등록되지 않기 때문이다.

## 참고한 문서

[GPIO Zero 1.6.2 공식 문서](https://gpiozero.readthedocs.io/en/v1.6.2/recipes.html#button-controlled-led)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: Button과 내부 풀업으로 눌림 읽기]({{ '/study/2021/raspberry-pi/14-button-input/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: 버튼 바운스와 bounce_time →]({{ '/study/2021/raspberry-pi/16-debounce/' | relative_url }})
