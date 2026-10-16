---
layout: content
title: "[라즈베리파이 공부 14] Button과 내부 풀업으로 눌림 읽기"
date: 2021-10-14 09:00:00 +0900
categories: [RaspberryPi]
tags: [2021학습노트, 라즈베리파이]
series: study-2021
study_track: raspberry-pi
study_order: 86
study_unit: 8
permalink: /study/2021/raspberry-pi/14-button-input/
---

입력 핀이 아무 데도 연결되지 않을 때 값이 흔들릴 수 있는 이유를 정리했다. 버튼은 풀업으로 기본 상태를 정했다.

> 장비와 해당 모듈이 필요한 예제. 코드를 `example.py`로 저장하고 라즈베리파이에서 `python3 example.py`로 실행한다. 실제 장비 실행 결과는 확인 방법으로 구분했다.

## 오늘 정리한 개념

`Button(27)`은 기본 pull_up=True로 내부 풀업을 사용한다. 버튼을 `BCM27(물리 13번)`과 GND 사이에 연결한다. 누르면 입력이 낮아지지만 is_pressed는 논리적으로 True가 된다. 4핀 택트 스위치는 같은 쪽 단자가 이미 연결된 경우가 많으므로 스위치 연결 방향을 먼저 확인한다.

## 따라 해 보기

{% raw %}
```python
from gpiozero import Button

with Button(27, pull_up=True) as button:
    print("10초 안에 버튼을 누르세요")
    if button.wait_for_press(timeout=10):
        print("눌림 감지")
    else:
        print("대기 시간 초과")
```
{% endraw %}

## 장비에서 확인할 내용

장비 확인: 10초 안에 누르면 눌림 감지, 누르지 않으면 대기 시간 초과가 출력된다.

## 코드를 따라 읽기

wait_for_press는 조건이 생기거나 timeout이 지날 때까지 기다린다. pull_up=True에서는 버튼이 열리면 높은 전압, 닫히면 GND로 이어진 낮은 전압이다. 라이브러리가 물리 전압과 논리 눌림을 변환해 준다. 풀업 상태에서 버튼을 5V에 연결하지 않는다.

## 헷갈린 부분과 주의점

핀 전압 자체의 1·0과 is_pressed의 참·거짓을 혼동하지 않는다. 소프트웨어로 풀업을 설정했다고 잘못된 전압 배선까지 보호되는 것은 아니다.

## 복습 문제

버튼이 눌릴 때 LOW인데 is_pressed가 True인 것이 오류일까?

**풀이:** 아니다. 풀업 구성에서 활성 낮음 입력을 눌림이라는 논리 상태로 해석한 결과다.

## 참고한 문서

[GPIO Zero 1.6.2 공식 문서](https://gpiozero.readthedocs.io/en/v1.6.2/api_input.html#button)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: blink의 비동기 실행과 프로그램 수명]({{ '/study/2021/raspberry-pi/13-led-blink/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: 버튼 이벤트로 LED 제어하기 →]({{ '/study/2021/raspberry-pi/15-button-led/' | relative_url }})
