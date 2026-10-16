---
layout: content
title: "[라즈베리파이 공부 13] blink의 비동기 실행과 프로그램 수명"
date: 2021-10-11 09:00:00 +0900
categories: [RaspberryPi]
tags: [2021학습노트, 라즈베리파이]
series: study-2021
study_track: raspberry-pi
study_order: 85
study_unit: 8
permalink: /study/2021/raspberry-pi/13-led-blink/
---

LED를 깜빡이게 하는 함수가 곧바로 돌아올 수 있다는 점을 정리했다. 프로그램이 끝나면 백그라운드 점멸도 계속된다고 가정하면 안 됐다.

> 장비와 해당 모듈이 필요한 예제. 코드를 `example.py`로 저장하고 라즈베리파이에서 `python3 example.py`로 실행한다. 실제 장비 실행 결과는 확인 방법으로 구분했다.

## 오늘 정리한 개념

LED.blink는 켜진 시간과 꺼진 시간, 반복 횟수를 받는다. background=True가 기본이라 점멸을 시작하고 바로 반환한다. 여기서는 background=False와 n=3으로 세 번 깜빡일 때까지 기다린다. LED 회로는 BCM17 → 330Ω → LED 애노드, 캐소드 → GND인 이전 글과 같다.

## 따라 해 보기

{% raw %}
```python
from gpiozero import LED

with LED(17) as led:
    led.blink(on_time=0.2, off_time=0.3, n=3, background=False)
    print("세 번 점멸 완료")
```
{% endraw %}

## 장비에서 확인할 내용

장비 확인: 약 0.2초 켜짐·0.3초 꺼짐을 세 번 반복한 뒤 완료 문구가 출력된다.

## 코드를 따라 읽기

n이 정해져 있고 background=False라 전체 흐름은 유한하다. 실제 간격에는 운영체제 스케줄링 오차가 있다. 별도로 계속 실행할 프로그램에서는 기본 백그라운드 점멸을 시작하고 다른 작업을 할 수도 있지만 메인 프로그램의 수명과 종료 정리를 함께 관리해야 한다.

## 헷갈린 부분과 주의점

n=None과 background=False를 함께 쓰면 계속 반복해 다음 줄로 가지 않는다. 유한 실습에서는 횟수를 정해 종료 경로를 확인한다.

## 복습 문제

n=2, on_time=1, off_time=1의 이상적 전체 시간은?

**풀이:** 약 4초다. 각 주기의 켜짐·꺼짐 시간이 합쳐지고 실제 시간에는 오차가 있을 수 있다.

## 참고한 문서

[GPIO Zero 1.6.2 공식 문서](https://gpiozero.readthedocs.io/en/v1.6.2/api_output.html#gpiozero.LED.blink)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: LED 한 개 켜고 끄기]({{ '/study/2021/raspberry-pi/12-led/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: Button과 내부 풀업으로 눌림 읽기 →]({{ '/study/2021/raspberry-pi/14-button-input/' | relative_url }})
