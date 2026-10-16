---
layout: content
title: "[라즈베리파이 공부 16] 버튼 바운스와 bounce_time"
date: 2021-10-21 09:00:00 +0900
categories: [RaspberryPi]
tags: [2021학습노트, 라즈베리파이]
series: study-2021
study_track: raspberry-pi
study_order: 88
study_unit: 8
permalink: /study/2021/raspberry-pi/16-debounce/
---

한 번 눌렀는데 여러 번 입력되는 기계 접점의 특성을 공부했다. 소프트웨어가 보는 신호와 사용자의 한 번 동작이 다를 수 있었다.

> 장비와 해당 모듈이 필요한 예제. 코드를 `example.py`로 저장하고 라즈베리파이에서 `python3 example.py`로 실행한다. 실제 장비 실행 결과는 확인 방법으로 구분했다.

## 오늘 정리한 개념

기계 버튼은 접촉 순간 짧게 연결과 해제를 반복할 수 있다. Button의 bounce_time은 변화 후 일정 시간의 추가 변화를 무시해 중복 이벤트를 줄이는 설정이다. 여기서는 BCM27과 GND 버튼에 0.05초를 지정한다. 이 값이 모든 버튼에 적합하다고 가정하지 않고 반응 속도와 오검출을 함께 관찰한다.

## 따라 해 보기

{% raw %}
```python
from gpiozero import Button
from time import sleep

count = 0

def record_press():
    global count
    count += 1
    print("눌림", count)

with Button(27, bounce_time=0.05) as button:
    button.when_pressed = record_press
    sleep(5)
```
{% endraw %}

## 장비에서 확인할 내용

장비 확인: 5초 동안 인식된 눌림 횟수가 출력된다. 실제 횟수는 버튼·배선·누르는 방식에 따라 달라진다.

## 코드를 따라 읽기

record_press는 이벤트가 발생할 때 호출된다. 간단한 단일 카운터라 전역 변수를 썼지만 큰 프로그램에서는 상태를 객체에 두거나 큐를 사용해 공유를 명확히 한다. 0.05초는 예제의 시작값일 뿐 실제 접점 상태를 측정해 정해야 하는 매개변수다.

## 헷갈린 부분과 주의점

bounce_time을 너무 길게 두면 빠른 정상 누름도 무시할 수 있다. sleep을 콜백 안에 넣어 모든 이벤트를 오래 막는 방식과 혼동하지 않는다.

## 복습 문제

0.05초는 몇 밀리초일까?

**풀이:** 50밀리초다. 시간 단위를 맞춰야 설정을 잘못 키우지 않는다.

## 참고한 문서

[GPIO Zero 1.6.2 공식 문서](https://gpiozero.readthedocs.io/en/v1.6.2/api_input.html#gpiozero.Button)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: 버튼 이벤트로 LED 제어하기]({{ '/study/2021/raspberry-pi/15-button-led/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: 이벤트 콜백에 필요한 값을 함께 전달하기 →]({{ '/study/2021/raspberry-pi/17-callback-partial/' | relative_url }})
