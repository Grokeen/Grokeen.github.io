---
layout: content
title: "[라즈베리파이 공부 18] PWMLED로 듀티 비와 밝기 다루기"
date: 2021-10-27 09:00:00 +0900
categories: [RaspberryPi]
tags: [2021학습노트, 라즈베리파이]
series: study-2021
study_track: raspberry-pi
study_order: 90
study_unit: 8
permalink: /study/2021/raspberry-pi/18-pwm-led/
---

디지털 핀으로 밝기를 조절하는 원리를 공부했다. 전압을 연속적으로 바꾸는 DAC와 PWM을 구별했다.

> 장비와 해당 모듈이 필요한 예제. 코드를 `example.py`로 저장하고 라즈베리파이에서 `python3 example.py`로 실행한다. 실제 장비 실행 결과는 확인 방법으로 구분했다.

## 오늘 정리한 개념

PWM은 켜짐·꺼짐을 반복하는 한 주기에서 켜진 비율인 듀티 비를 조절한다. PWMLED.value는 0~1 범위로 설정한다. 0.5는 절반 시간 켜짐을 뜻하지만 사람이 느끼는 밝기의 정확한 절반을 보장하지는 않는다. BCM17 → 330Ω → LED → GND 회로를 사용한다.

## 따라 해 보기

{% raw %}
```python
from gpiozero import PWMLED
from time import sleep

with PWMLED(17, frequency=100) as led:
    for duty in [0, 0.25, 0.75, 1]:
        led.value = duty
        print("듀티 비", duty)
        sleep(0.5)
```
{% endraw %}

## 장비에서 확인할 내용

장비 확인: 네 단계의 듀티 비가 출력되고 LED 밝기가 변해야 한다. 눈에 보이는 밝기는 LED와 주변 환경에 따라 다르다.

## 코드를 따라 읽기

frequency=100은 초당 100주기의 기준이다. value는 주파수가 아니라 켜진 비율이다. 코드 끝에서 with가 장치를 닫는다. 일반적인 리눅스의 소프트웨어 PWM을 정밀 계측용 파형으로 가정하지 않으며, 실제 타이밍 요구에 맞는 구동 방식을 선택해야 한다.

## 헷갈린 부분과 주의점

value에 50을 넣는 것이 50%라는 뜻은 아니다. 이 API의 범위에서는 0.5로 표시한다. 저항은 PWM에서도 필요하다.

## 복습 문제

주파수 100Hz의 한 주기는 얼마일까?

**풀이:** 1/100초, 즉 10밀리초다.

## 참고한 문서

[GPIO Zero 1.6.2 공식 문서](https://gpiozero.readthedocs.io/en/v1.6.2/api_output.html#pwmled)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: 이벤트 콜백에 필요한 값을 함께 전달하기]({{ '/study/2021/raspberry-pi/17-callback-partial/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: RGBLED로 세 채널 색 섞기 →]({{ '/study/2021/raspberry-pi/19-rgb-led/' | relative_url }})
