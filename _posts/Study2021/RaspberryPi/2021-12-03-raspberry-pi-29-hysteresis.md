---
layout: content
title: "[라즈베리파이 공부 29] 임계값 부근의 깜빡임을 히스테리시스로 줄이기"
date: 2021-12-03 09:00:00 +0900
categories: [RaspberryPi]
tags: [2021학습노트, 라즈베리파이]
series: study-2021
study_track: raspberry-pi
study_order: 101
study_unit: 10
permalink: /study/2021/raspberry-pi/29-hysteresis/
---

온도가 경계 부근에서 오르내릴 때 출력이 너무 자주 바뀌는 문제를 모의 데이터로 살폈다. 켜기와 끄기 기준을 나누었다.

> 장비 없이 실행하는 모의·계산 예제. Python 3.7 이상 문법을 사용한다.

## 오늘 정리한 개념

히스테리시스는 켜는 임계값과 끄는 임계값을 다르게 정하는 방식이다. 현재 꺼져 있을 때 28 이상이면 켜고, 켜져 있을 때 26 이하이면 끈다. 그 사이에서는 이전 상태를 유지한다. 실제 장치 대신 bool 상태만 출력해 계산 규칙을 먼저 검증한다.

## 따라 해 보기

{% raw %}
```python
active = False
for temperature in [27, 28, 27, 26, 27]:
    if not active and temperature >= 28:
        active = True
    elif active and temperature <= 26:
        active = False
    print(temperature, active)
```
{% endraw %}

## 실행 결과

```text
27 False
28 True
27 True
26 False
27 False
```

## 코드를 따라 읽기

28에서 켜진 뒤 27로 내려와도 유지되고 26에서 꺼진다. 같은 27이라도 이전 상태에 따라 결과가 다를 수 있는 것이 핵심이다. 임계값은 예제 규칙일 뿐 실제 팬이나 난방 장치의 적정 제어값은 아니다. 센서 오류와 안전 동작은 별도로 설계해야 한다.

## 헷갈린 부분과 주의점

현재 측정값만 보고 상태를 계산하면 유지 구간의 의미가 사라진다. 켜기·끄기 임계값 순서를 반대로 정하지 않는다.

## 복습 문제

처음 active=True이고 온도가 27이면?

**풀이:** 유지 구간이므로 True를 유지한다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/reference/compound_stmts.html#the-if-statement)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: CPU 온도를 CSV에 유한 횟수로 기록하기]({{ '/study/2021/raspberry-pi/28-csv-logger/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: 이동평균으로 최근 측정 추세 보기 →]({{ '/study/2021/raspberry-pi/30-moving-average/' | relative_url }})
