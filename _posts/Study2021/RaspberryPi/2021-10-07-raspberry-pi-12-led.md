---
layout: content
title: "[라즈베리파이 공부 12] LED 한 개 켜고 끄기"
date: 2021-10-07 09:00:00 +0900
categories: [RaspberryPi]
tags: [2021학습노트, 라즈베리파이]
series: study-2021
study_track: raspberry-pi
study_order: 84
study_unit: 8
permalink: /study/2021/raspberry-pi/12-led/
---

파이썬 명령이 실제 출력 핀 상태로 이어지는 가장 작은 회로를 정리했다. LED에는 전류 제한 저항이 필요했다.

> 장비와 해당 모듈이 필요한 예제. 코드를 `example.py`로 저장하고 라즈베리파이에서 `python3 example.py`로 실행한다. 실제 장비 실행 결과는 확인 방법으로 구분했다.

## 오늘 정리한 개념

전원을 끈 상태에서 `BCM17(물리 11번)` → 330Ω 저항 → LED 긴 다리(애노드), 짧은 다리(캐소드) → `GND(물리 6번)`로 직렬 연결한다. `LED(17)`은 GPIO 장치 객체를 만들고 on·off로 출력을 바꾼다. 아래 코드는 장비에서 실행할 예제이며 실제 점등 측정 기록은 아니다.

## 따라 해 보기

{% raw %}
```python
from gpiozero import LED
from time import sleep

with LED(17) as led:
    led.on()
    sleep(1)
    led.off()
    print("점등 예제 종료")
```
{% endraw %}

## 장비에서 확인할 내용

장비 확인: LED가 약 1초 켜졌다가 꺼지고 `"점등 예제 종료"`가 출력되어야 한다.

## 코드를 따라 읽기

with 블록은 끝나면 장치를 닫아 GPIO 자원을 해제한다. sleep은 상태를 관찰할 시간을 주며 정확한 1초 펄스를 보장하지 않는다. 배선 후 전원을 켜고 파일을 python3로 실행한다. 점등되지 않으면 코드보다 번호·극성·저항·접촉 상태부터 확인한다.

## 헷갈린 부분과 주의점

전원 핀을 GPIO 출력처럼 제어할 수는 없다. LED를 저항 없이 연결하거나 전원이 켜진 상태로 핀을 옮기지 않는다.

## 복습 문제

코드를 `LED(27)`로 바꾸면 배선도 바꿔야 할까?

**풀이:** 그렇다. 출력 신호선을 BCM27, 즉 물리 13번으로 옮겨야 한다.

## 참고한 문서

[GPIO Zero 1.6.2 공식 문서](https://gpiozero.readthedocs.io/en/v1.6.2/api_output.html#led)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: BCM 번호와 물리 핀 번호 구별하기]({{ '/study/2021/raspberry-pi/11-gpio-numbering/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: blink의 비동기 실행과 프로그램 수명 →]({{ '/study/2021/raspberry-pi/13-led-blink/' | relative_url }})
