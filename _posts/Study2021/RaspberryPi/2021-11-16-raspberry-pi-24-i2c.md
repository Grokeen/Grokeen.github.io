---
layout: content
title: "[라즈베리파이 공부 24] I2C 버스와 주소, SDA·SCL 이해하기"
date: 2021-11-16 09:00:00 +0900
categories: [RaspberryPi]
tags: [2021학습노트, 라즈베리파이]
series: study-2021
study_track: raspberry-pi
study_order: 96
study_unit: 9
permalink: /study/2021/raspberry-pi/24-i2c/
---

여러 장치가 같은 두 신호선을 공유하는 버스 개념을 공부했다. 버스 번호와 장치 주소는 서로 다른 값이었다.

> 라즈베리파이 OS Buster 계열을 기준으로 한 명령·설정 예제. 실행 위치와 실제 계정·경로를 본문에서 확인한다.

## 오늘 정리한 개념

40핀 Pi에서 I2C1의 SDA는 `BCM2(물리3)`, SCL은 `BCM3(물리5)`다. 3.3V 논리의 모듈과 공통 GND를 사용하고 모듈의 풀업 저항이 5V에 연결되지 않는지 확인한다. raspi-config에서 I2C를 활성화한 뒤 버스 장치를 확인한다. 아래 코드는 목록 확인까지만 하며 임의의 장치에 데이터를 쓰지 않는다.

## 따라 해 보기

{% raw %}
```bash
sudo apt install i2c-tools
i2cdetect -l
ls -l /dev/i2c-*
```
{% endraw %}

## 장비에서 확인할 내용

장비 확인: 활성 I2C 어댑터와 /dev/i2c-1 같은 장치 파일이 표시된다. 비활성 상태에서는 파일이 없을 수 있다.

## 코드를 따라 읽기

장치가 연결되었다고 버스 목록에 주소가 자동 표시되는 것은 아니다. 호환성이 확인된 실습 장치에 한해 i2cdetect -y 1 같은 주소 탐색을 사용할 수 있지만 일부 장치는 탐색 요청에도 영향을 받을 수 있다. 주소를 알아도 레지스터 의미는 각 부품 데이터시트가 정한다.

## 헷갈린 부분과 주의점

주소 0x48은 예시로 자주 쓰이지만 모든 센서의 주소가 아니다. 같은 버스에 같은 주소의 장치 두 개를 붙이면 주소 변경이나 멀티플렉서가 필요할 수 있다.

## 복습 문제

/dev/i2c-1의 1이 센서 주소일까?

**풀이:** 아니다. 버스 번호다. 장치 주소는 해당 버스 안에서 별도로 지정한다.

## 참고한 문서

[Debian Buster 공식 매뉴얼](https://manpages.debian.org/buster/i2c-tools/i2cdetect.8.en.html)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: MCP3008로 아날로그 값을 숫자로 읽기]({{ '/study/2021/raspberry-pi/23-mcp3008/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: SPI의 클록·데이터·칩 선택선 구분하기 →]({{ '/study/2021/raspberry-pi/25-spi/' | relative_url }})
