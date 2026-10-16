---
layout: content
title: "[라즈베리파이 공부 26] UART 직렬 통신과 바이트 단위 읽기"
date: 2021-11-23 09:00:00 +0900
categories: [RaspberryPi]
tags: [2021학습노트, 라즈베리파이]
series: study-2021
study_track: raspberry-pi
study_order: 98
study_unit: 9
permalink: /study/2021/raspberry-pi/26-uart/
---

GPIO 직렬 포트와 RS-232 전기 신호를 같은 것으로 보면 안 된다는 점부터 정리했다. 수신이 없을 때도 종료되도록 시간 제한을 넣었다.

> 장비와 해당 모듈이 필요한 예제. 코드를 `example.py`로 저장하고 라즈베리파이에서 `python3 example.py`로 실행한다. 실제 장비 실행 결과는 확인 방법으로 구분했다.

## 오늘 정리한 개념

UART는 TX와 RX를 사용하는 비동기 직렬 통신이다. Pi의 `GPIO14(TX, 물리8)`와 `GPIO15(RX, 물리10)`는 3.3V TTL 신호이며 RS-232 전압에 직접 연결하지 않는다. raspi-config에서 직렬 로그인 셸은 끄고 하드웨어 포트는 활성화한다. Python 3 환경에 pySerial 3.5 계열이 필요하다.

## 따라 해 보기

{% raw %}
```python
import serial

with serial.Serial("/dev/serial0", baudrate=9600, timeout=1) as port:
    port.write(b"PING\n")
    payload = port.readline()
    if payload:
        print(payload.decode("ascii").strip())
    else:
        print("수신 시간 초과")
```
{% endraw %}

## 장비에서 확인할 내용

장비 확인: 같은 9600 baud·8N1 설정의 상대 장치가 ASCII 한 줄로 응답하면 표시되고, 없으면 시간 초과가 출력된다.

## 코드를 따라 읽기

상대 장치 TX와 Pi RX, 상대 RX와 Pi TX를 교차하고 GND를 공유한다. baudrate뿐 아니라 데이터 비트·패리티·정지 비트도 맞춘다. /dev/serial0은 모델과 설정에 따라 실제 UART를 가리키는 별칭이다. write는 bytes를 보내며 readline은 줄바꿈 또는 timeout까지 읽는다.

## 헷갈린 부분과 주의점

유선 RS-232나 5V TTL을 GPIO에 직접 연결하지 않는다. timeout 때 부분 데이터가 올 수도 있어 실제 프로토콜에서는 줄 종료·길이·인코딩까지 검증한다.

## 복습 문제

timeout=None이면 수신 없는 readline이 바로 끝날까?

**풀이:** 아니다. 줄 종료가 올 때까지 계속 기다릴 수 있어 유한 대기 요구가 있으면 timeout을 정해야 한다.

## 참고한 문서

[pySerial 3.5 공식 문서](https://pyserial.readthedocs.io/en/latest/pyserial_api.html#serial.Serial)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: SPI의 클록·데이터·칩 선택선 구분하기]({{ '/study/2021/raspberry-pi/25-spi/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: 외부 센서 없이 CPU 온도 읽기 →]({{ '/study/2021/raspberry-pi/27-cpu-temperature/' | relative_url }})
