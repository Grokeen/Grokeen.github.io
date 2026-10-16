---
layout: content
title: "[라즈베리파이 공부 27] 외부 센서 없이 CPU 온도 읽기"
date: 2021-11-26 09:00:00 +0900
categories: [RaspberryPi]
tags: [2021학습노트, 라즈베리파이]
series: study-2021
study_track: raspberry-pi
study_order: 99
study_unit: 9
permalink: /study/2021/raspberry-pi/27-cpu-temperature/
---

외부 배선 없이 장비 내부 상태를 읽는 방법을 정리했다. CPU 온도와 방 온도는 측정 대상이 다르다.

> 장비와 해당 모듈이 필요한 예제. 코드를 `example.py`로 저장하고 라즈베리파이에서 `python3 example.py`로 실행한다. 실제 장비 실행 결과는 확인 방법으로 구분했다.

## 오늘 정리한 개념

GPIO Zero의 CPUTemperature는 리눅스가 제공하는 CPU 온도 값을 읽는 내부 장치다. 방의 기온을 재는 센서가 아니며 부하·냉각·보드 상태의 영향을 받는다. Raspberry Pi OS의 해당 thermal 정보가 있는 장비에서 사용한다. GPIO 헤더에 부품을 추가할 필요는 없다.

## 따라 해 보기

{% raw %}
```python
from gpiozero import CPUTemperature

with CPUTemperature() as cpu:
    print(f"CPU 온도: {cpu.temperature:.1f} C")
```
{% endraw %}

## 장비에서 확인할 내용

장비 확인: 실행 시점의 CPU 온도가 표시된다. 실제 수치를 측정하지 않았으므로 고정된 온도를 결과로 적지 않는다.

## 코드를 따라 읽기

temperature는 섭씨 수치를 반환한다. .1f는 표시를 한 자리로 맞추는 기능이며 센서 정확도를 높이지 않는다. 다른 운영체제나 일반 PC에서는 같은 경로가 없을 수 있다. 모듈 import가 된다는 사실과 실제 장치 값 읽기 성공은 구분해서 확인한다.

## 헷갈린 부분과 주의점

GPIO Zero의 value가 제공하는 정규화 값과 temperature의 섭씨 단위를 혼동하지 않는다. CPU 온도 상승만으로 고장 원인을 단정하지 않는다.

## 복습 문제

CPU가 60도면 실내 온도도 60도일까?

**풀이:** 아니다. 서로 다른 위치와 물리 대상을 측정한다.

## 참고한 문서

[GPIO Zero 1.6.2 공식 문서](https://gpiozero.readthedocs.io/en/v1.6.2/api_internal.html#cputemperature)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: UART 직렬 통신과 바이트 단위 읽기]({{ '/study/2021/raspberry-pi/26-uart/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: CPU 온도를 CSV에 유한 횟수로 기록하기 →]({{ '/study/2021/raspberry-pi/28-csv-logger/' | relative_url }})
