---
layout: content
title: "[라즈베리파이 공부 19] RGBLED로 세 채널 색 섞기"
date: 2021-10-31 09:00:00 +0900
categories: [RaspberryPi]
tags: [2021학습노트, 라즈베리파이]
series: study-2021
study_track: raspberry-pi
study_order: 91
study_unit: 8
permalink: /study/2021/raspberry-pi/19-rgb-led/
---

빨강·초록·파랑 출력을 하나의 객체로 다뤘다. 공통 캐소드와 공통 애노드 부품의 배선 차이를 먼저 확인했다.

> 장비와 해당 모듈이 필요한 예제. 코드를 `example.py`로 저장하고 라즈베리파이에서 `python3 example.py`로 실행한다. 실제 장비 실행 결과는 확인 방법으로 구분했다.

## 오늘 정리한 개념

공통 캐소드 RGB LED의 공통 다리는 GND로, R·G·B 각 다리는 각각 별도의 330Ω 저항을 통해 BCM17·27·22에 연결한다. RGBLED.value는 0~1 범위의 세 채널 튜플이다. 다리 순서는 부품마다 다를 수 있어 데이터시트로 확인하며 물리 배열을 코드 순서로 추측하지 않는다.

## 따라 해 보기

{% raw %}
```python
from gpiozero import RGBLED
from time import sleep

with RGBLED(red=17, green=27, blue=22) as led:
    for color in [(1, 0, 0), (0, 1, 0), (0, 0, 1), (0.3, 0.3, 0.3)]:
        led.value = color
        print(color)
        sleep(0.5)
```
{% endraw %}

## 장비에서 확인할 내용

장비 확인: 빨강·초록·파랑·세 채널 혼합 순서로 표시된다. 같은 수치라도 채널별 실제 밝기는 다를 수 있다.

## 코드를 따라 읽기

키워드 인자로 채널과 BCM 번호를 명확히 적었다. 마지막 튜플은 각 채널을 0.3으로 구동한다. 공통 애노드라면 해당 회로와 active_high 설정을 따로 맞춰야 한다. 이 예제의 공통 캐소드 배선을 그대로 적용하지 않는다.

## 헷갈린 부분과 주의점

공통 저항 하나로 세 채널 전류를 함께 제한하지 않고 각 채널에 저항을 둔다. GPIO 핀의 전류 허용 범위를 넘는 LED 스트립은 별도 구동기가 필요하다.

## 복습 문제

(1, 0, 1)은 어떤 채널을 켤까?

**풀이:** 빨강과 파랑을 켜고 초록은 끈다. 혼합 색은 부품과 밝기에 따라 달라진다.

## 참고한 문서

[GPIO Zero 1.6.2 공식 문서](https://gpiozero.readthedocs.io/en/v1.6.2/api_output.html#rgbled)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: PWMLED로 듀티 비와 밝기 다루기]({{ '/study/2021/raspberry-pi/18-pwm-led/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: Buzzer와 별도 구동 회로의 역할 →]({{ '/study/2021/raspberry-pi/20-buzzer/' | relative_url }})
