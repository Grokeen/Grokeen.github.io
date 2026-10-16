---
layout: content
title: "[라즈베리파이 공부 20] Buzzer와 별도 구동 회로의 역할"
date: 2021-11-03 09:00:00 +0900
categories: [RaspberryPi]
tags: [2021학습노트, 라즈베리파이]
series: study-2021
study_track: raspberry-pi
study_order: 92
study_unit: 8
permalink: /study/2021/raspberry-pi/20-buzzer/
---

소리를 내는 출력도 단순 상태 제어로 표현할 수 있었다. GPIO가 부하의 전원을 무조건 직접 공급하는 것은 아니라는 점을 메모했다.

> 장비와 해당 모듈이 필요한 예제. 코드를 `example.py`로 저장하고 라즈베리파이에서 `python3 example.py`로 실행한다. 실제 장비 실행 결과는 확인 방법으로 구분했다.

## 오늘 정리한 개념

이 예제는 저전류 3.3V 능동 부저와 NPN 트랜지스터 구동 회로를 전제로 한다. BCM18 → 1kΩ → 베이스, 이미터 → GND, 컬렉터 → 부저 음극, 부저 양극 → 정격 3.3V로 구성하고 소자 핀 배치를 확인한다. 유도성 부하면 적절한 보호 다이오드도 필요하다. GPIO는 베이스 제어 신호만 보낸다.

## 따라 해 보기

{% raw %}
```python
from gpiozero import Buzzer

with Buzzer(18) as buzzer:
    buzzer.beep(on_time=0.1, off_time=0.2, n=2, background=False)
    print("알림 종료")
```
{% endraw %}

## 장비에서 확인할 내용

장비 확인: 짧은 알림 두 번 뒤 종료 문구가 출력된다. 실제 소리 유무와 크기는 부품·구동 회로에 따라 다르다.

## 코드를 따라 읽기

능동 부저는 자체 발진 회로가 있어 켜짐·꺼짐만으로 소리를 낸다. 수동 피에조에 특정 음높이를 내는 TonalBuzzer 예제와 다르다. 부저 전압·전류와 트랜지스터 정격을 먼저 확인하고 이 회로를 대전류 부하로 그대로 확장하지 않는다.

## 헷갈린 부분과 주의점

BCM18은 물리 12번이다. 트랜지스터의 다리 순서를 외형만으로 추측하지 않으며 GND 기준이 공유되지 않으면 제어가 불안정할 수 있다.

## 복습 문제

beep의 n을 지정하지 않으면 항상 두 번만 울릴까?

**풀이:** 아니다. 기본값은 계속 반복하므로 이 예제는 n=2를 명시했다.

## 참고한 문서

[GPIO Zero 1.6.2 공식 문서](https://gpiozero.readthedocs.io/en/v1.6.2/api_output.html#buzzer)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: RGBLED로 세 채널 색 섞기]({{ '/study/2021/raspberry-pi/19-rgb-led/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: PIR 센서로 움직임 이벤트 읽기 →]({{ '/study/2021/raspberry-pi/21-motion-sensor/' | relative_url }})
