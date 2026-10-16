---
layout: content
title: "[라즈베리파이 공부 25] SPI의 클록·데이터·칩 선택선 구분하기"
date: 2021-11-20 09:00:00 +0900
categories: [RaspberryPi]
tags: [2021학습노트, 라즈베리파이]
series: study-2021
study_track: raspberry-pi
study_order: 97
study_unit: 9
permalink: /study/2021/raspberry-pi/25-spi/
---

MCP3008 배선을 계기로 SPI 신호가 각각 무슨 일을 하는지 따로 정리했다. I2C의 주소 선택과 SPI의 칩 선택은 방식이 달랐다.

> 라즈베리파이 OS Buster 계열을 기준으로 한 명령·설정 예제. 실행 위치와 실제 계정·경로를 본문에서 확인한다.

## 오늘 정리한 개념

SPI0은 보통 SCLK BCM11, MOSI BCM10, MISO BCM9, CE0 BCM8과 CE1 BCM7을 사용한다. 클록과 데이터 선을 공유해도 각 장치는 별도 칩 선택이 필요하다. SPI에는 I2C처럼 공통된 장치 주소 검색 방식이 없다. 모드·클록 속도·명령 형식은 장치 데이터시트를 따라야 한다.

## 따라 해 보기

{% raw %}
```bash
ls -l /dev/spidev*
python3 -c 'from gpiozero import MCP3008; print(MCP3008.__name__)'
```
{% endraw %}

## 장비에서 확인할 내용

SPI가 활성화되면 /dev/spidev0.0·/dev/spidev0.1 등이 보일 수 있다. 다음 줄은 MCP3008 클래스 이름을 출력하며 ADC를 생성하지 않는다.

## 코드를 따라 읽기

raspi-config에서 SPI를 활성화하고 필요한 경우 재부팅한 뒤 확인한다. 장치 파일 존재는 컨트롤러 인터페이스 준비 상태이며 실제 센서 연결 성공의 증명은 아니다. MOSI는 컨트롤러에서 장치로, MISO는 반대 방향의 데이터 선이다. 모든 데이터 신호는 3.3V 기준으로 맞춘다.

## 헷갈린 부분과 주의점

MOSI와 MISO를 이름이 비슷하다고 서로 바꾸어 연결하지 않는다. SPI 속도가 빠를수록 항상 좋은 것이 아니며 배선 길이와 장치 허용 속도를 고려한다.

## 복습 문제

SPI 장치 두 개가 같은 CE0에 연결되면 어떤 문제가 생길 수 있을까?

**풀이:** 동시에 선택되어 응답이 충돌할 수 있다. 장치별 선택선을 분리해야 한다.

## 참고한 문서

[Raspberry Pi 공식 문서](https://www.raspberrypi.com/documentation/computers/raspberry-pi.html#spi)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: I2C 버스와 주소, SDA·SCL 이해하기]({{ '/study/2021/raspberry-pi/24-i2c/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: UART 직렬 통신과 바이트 단위 읽기 →]({{ '/study/2021/raspberry-pi/26-uart/' | relative_url }})
