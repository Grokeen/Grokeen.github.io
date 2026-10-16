---
layout: content
title: "[라즈베리파이 공부 11] BCM 번호와 물리 핀 번호 구별하기"
date: 2021-10-04 09:00:00 +0900
categories: [RaspberryPi]
tags: [2021학습노트, 라즈베리파이]
series: study-2021
study_track: raspberry-pi
study_order: 83
study_unit: 8
permalink: /study/2021/raspberry-pi/11-gpio-numbering/
---

LED를 연결하기 전에 핀 이름부터 표로 확인했다. 코드에 적는 17이 헤더의 열일곱 번째 위치라는 뜻은 아니었다.

> 라즈베리파이 OS Buster 계열을 기준으로 한 명령·설정 예제. 실행 위치와 실제 계정·경로를 본문에서 확인한다.

## 오늘 정리한 개념

GPIO Zero는 기본적으로 BCM 번호를 사용한다. 40핀 헤더에서 BCM17은 물리 11번, BCM27은 물리 13번, BCM22는 물리 15번이다. 전원 핀과 GND는 일반 GPIO가 아니다. 보드 방향과 핀 1 표시를 확인하고 실제 회로 배선 전에는 전원을 끈다.

## 따라 해 보기

{% raw %}
```bash
# GPIO Zero가 설치된 라즈베리파이에서 실행
pinout
python3 -c 'from gpiozero import pi_info; print(pi_info().model)'
```
{% endraw %}

## 장비에서 확인할 내용

보드의 핀 배치 그림과 감지한 모델이 표시된다. 출력은 장비에 따라 다르다.

## 코드를 따라 읽기

pinout의 BCM 이름을 코드와 대조하고 물리 위치는 배선할 때 확인한다. 물리 1번은 3.3V, 6번은 GND이며 2번·4번의 5V는 GPIO 입력 전압이 아니다. 이 시리즈에서 GPIO 입력과 제어 신호는 3.3V 기준으로 다룬다. 전원 공급선과 신호선을 구분했다.

## 헷갈린 부분과 주의점

5V 출력을 GPIO 입력에 직접 넣지 않는다. 예전 26핀 보드나 다른 배치 장비에 40핀 기준을 그대로 적용하지 않는다.

## 복습 문제

`LED(17)`의 17은 어떤 번호일까?

**풀이:** 기본 설정에서는 BCM17이며 40핀 헤더의 물리 11번에 해당한다.

## 참고한 문서

[GPIO Zero 1.6.2 공식 문서](https://gpiozero.readthedocs.io/en/v1.6.2/recipes.html#pin-numbering)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: 프로세스와 종료 신호 이해하기]({{ '/study/2021/raspberry-pi/10-processes/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: LED 한 개 켜고 끄기 →]({{ '/study/2021/raspberry-pi/12-led/' | relative_url }})
