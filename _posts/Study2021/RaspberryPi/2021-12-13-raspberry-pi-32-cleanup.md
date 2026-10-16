---
layout: content
title: "[라즈베리파이 공부 32] Ctrl+C 뒤에도 GPIO를 정리하는 구조"
date: 2021-12-13 09:00:00 +0900
categories: [RaspberryPi]
tags: [2021학습노트, 라즈베리파이]
series: study-2021
study_track: raspberry-pi
study_order: 104
study_unit: 10
permalink: /study/2021/raspberry-pi/32-cleanup/
---

프로그램 종료를 예외 상황으로만 보지 않고 정상적인 사용 흐름에 포함했다. LED를 끄는 작업과 객체를 닫는 작업을 나누었다.

> 장비와 해당 모듈이 필요한 예제. 코드를 `example.py`로 저장하고 라즈베리파이에서 `python3 example.py`로 실행한다. 실제 장비 실행 결과는 확인 방법으로 구분했다.

## 오늘 정리한 개념

try/finally는 KeyboardInterrupt 같은 중단에도 정리 블록을 실행하게 해 준다. 이 예제는 BCM17 → 330Ω → LED → GND 회로를 사용한다. LED를 켜고 최대 5초 기다리며 Ctrl+C로 먼저 끝낼 수도 있다. SIGKILL이나 전원 차단에서는 이런 소프트웨어 정리를 보장할 수 없다.

## 따라 해 보기

{% raw %}
```python
from gpiozero import LED
from time import sleep

led = LED(17)
try:
    led.on()
    sleep(5)
except KeyboardInterrupt:
    print("사용자가 중단")
finally:
    led.off()
    led.close()
    print("GPIO 정리 완료")
```
{% endraw %}

## 장비에서 확인할 내용

장비 확인: 정상 대기 또는 Ctrl+C 뒤 LED를 끄고 GPIO 정리 완료가 출력된다. 중단 시에는 사용자 중단 문구도 보인다.

## 코드를 따라 읽기

off는 출력 상태를 끄고 close는 핀 자원을 해제한다. 간단한 객체에서는 with를 쓰는 편이 짧지만 이번에는 정리 순서를 명시적으로 펼쳤다. 여러 장치를 연다면 초기화 도중 실패한 경우까지 관리하도록 ExitStack 같은 도구도 검토할 수 있다.

## 헷갈린 부분과 주의점

같은 핀을 다른 객체나 프로세스에서 동시에 제어하지 않는다. 종료 시 출력 상태가 중요한 장치는 물리적인 기본 상태와 회로 설계도 함께 고려해야 한다.

## 복습 문제

SIGKILL에서도 finally가 실행된다고 보장할 수 있을까?

**풀이:** 없다. 프로세스가 즉시 종료되므로 파이썬 정리 코드를 실행할 기회가 없다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/tutorial/errors.html#defining-clean-up-actions)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: JSON 설정을 읽고 범위까지 검증하기]({{ '/study/2021/raspberry-pi/31-config-json/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: cron의 다섯 시간 필드와 실행 환경 →]({{ '/study/2021/raspberry-pi/33-cron/' | relative_url }})
