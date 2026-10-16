---
layout: content
title: "[라즈베리파이 공부 22] 초음파 센서와 Echo 전압 분배"
date: 2021-11-10 09:00:00 +0900
categories: [RaspberryPi]
tags: [2021학습노트, 라즈베리파이]
series: study-2021
study_track: raspberry-pi
study_order: 94
study_unit: 9
permalink: /study/2021/raspberry-pi/22-distance-sensor/
---

왕복 시간을 거리로 바꾸는 센서를 공부했다. 파이썬 API보다 먼저 Echo 신호 전압을 맞춰야 했다.

> 장비와 해당 모듈이 필요한 예제. 코드를 `example.py`로 저장하고 라즈베리파이에서 `python3 example.py`로 실행한다. 실제 장비 실행 결과는 확인 방법으로 구분했다.

## 오늘 정리한 개념

HC-SR04 기준 VCC는 5V, GND는 공통 접지, TRIG는 `BCM23(물리 16번)`에 연결한다. 5V Echo를 직접 GPIO에 넣지 않고 Echo → 330Ω → 분기점 → 470Ω → GND로 나누며 분기점을 `BCM24(물리 18번)`에 연결한다. 이 비율의 이상적 분기 전압은 약 2.94V다. 실제 저항과 모듈 사양도 확인한다.

## 따라 해 보기

{% raw %}
```python
from gpiozero import DistanceSensor
from time import sleep

with DistanceSensor(echo=24, trigger=23, max_distance=1) as sensor:
    for _ in range(3):
        print(f"예상 거리: {sensor.distance * 100:.1f} cm")
        sleep(0.5)
```
{% endraw %}

## 장비에서 확인할 내용

장비 확인: 세 번의 추정 거리가 cm 단위로 표시된다. 수치는 대상·각도·온도·반사 상태에 따라 달라진다.

## 코드를 따라 읽기

distance 속성은 미터이므로 100을 곱해 cm로 표시한다. max_distance=1은 예제의 최대 거리 설정이다. value처럼 0~1로 정규화된 값과 혼동하지 않는다. Echo를 구동하는 분압 회로는 전원을 끈 상태에서 배선하고 GPIO Zero 문서의 회로와 대조한다.

## 헷갈린 부분과 주의점

전압 분배 없이 Echo를 직접 연결하지 않는다. 소프트웨어 타이밍과 초음파 반사 한계 때문에 정밀 거리계와 같은 정확도를 가정할 수 없다.

## 복습 문제

sensor.distance가 0.25면 몇 cm일까?

**풀이:** 25cm다. distance의 기본 단위는 미터다.

## 참고한 문서

[GPIO Zero 1.6.2 공식 문서](https://gpiozero.readthedocs.io/en/v1.6.2/recipes.html#distance-sensor)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: PIR 센서로 움직임 이벤트 읽기]({{ '/study/2021/raspberry-pi/21-motion-sensor/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: MCP3008로 아날로그 값을 숫자로 읽기 →]({{ '/study/2021/raspberry-pi/23-mcp3008/' | relative_url }})
