---
layout: content
title: "[라즈베리파이 공부 21] PIR 센서로 움직임 이벤트 읽기"
date: 2021-11-06 09:00:00 +0900
categories: [RaspberryPi]
tags: [2021학습노트, 라즈베리파이]
series: study-2021
study_track: raspberry-pi
study_order: 93
study_unit: 9
permalink: /study/2021/raspberry-pi/21-motion-sensor/
---

사람이 있는지와 움직임이 감지되었는지를 같은 뜻으로 취급하지 않기로 했다. PIR의 출력과 준비 시간을 구분했다.

> 장비와 해당 모듈이 필요한 예제. 코드를 `example.py`로 저장하고 라즈베리파이에서 `python3 example.py`로 실행한다. 실제 장비 실행 결과는 확인 방법으로 구분했다.

## 오늘 정리한 개념

3.3V 논리 출력을 제공하는 HC-SR501 계열 모듈을 전제로 OUT → `BCM4(물리 7번)`, GND → GND, VCC → 모듈 정격 전원으로 연결한다. 전원 핀 순서는 모듈 표기를 확인한다. MotionSensor는 출력이 활성인지를 읽으며 센서가 정지한 사람을 항상 감지하는 것은 아니다.

## 따라 해 보기

{% raw %}
```python
from gpiozero import MotionSensor
from time import sleep

with MotionSensor(4) as sensor:
    print("센서 준비 대기")
    sleep(30)
    if sensor.wait_for_motion(timeout=10):
        print("움직임 감지")
    else:
        print("대기 시간 안에 감지 없음")
```
{% endraw %}

## 장비에서 확인할 내용

장비 확인: 준비 대기 뒤 감지 여부에 따라 한 문구가 출력된다. 준비 시간은 모듈 데이터시트와 실제 환경에 맞춰 조정한다.

## 코드를 따라 읽기

`sleep(30)`은 예제의 준비 대기값이며 모든 모듈이 정확히 30초면 안정된다는 보장은 없다. 모듈의 감도·유지시간 조절과 GPIO Zero의 샘플링 설정은 서로 다른 층이다. 사람이 없었다는 증거로 미감지를 단정하지 않고 감지 방식의 한계를 함께 기록한다.

## 헷갈린 부분과 주의점

5V 전원 모듈이라고 출력도 반드시 3.3V인 것은 아니다. 데이터시트와 신호 전압을 확인해 GPIO 허용 범위에 맞춘다.

## 복습 문제

움직임이 없다는 출력으로 방에 아무도 없다고 확정해도 될까?

**풀이:** 안 된다. 감지 범위·방향·정지 상태 등 센서 한계가 있다.

## 참고한 문서

[GPIO Zero 1.6.2 공식 문서](https://gpiozero.readthedocs.io/en/v1.6.2/api_input.html#gpiozero.MotionSensor)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: Buzzer와 별도 구동 회로의 역할]({{ '/study/2021/raspberry-pi/20-buzzer/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: 초음파 센서와 Echo 전압 분배 →]({{ '/study/2021/raspberry-pi/22-distance-sensor/' | relative_url }})
