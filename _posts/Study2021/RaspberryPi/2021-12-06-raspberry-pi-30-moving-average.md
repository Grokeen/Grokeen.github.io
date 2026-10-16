---
layout: content
title: "[라즈베리파이 공부 30] 이동평균으로 최근 측정 추세 보기"
date: 2021-12-06 09:00:00 +0900
categories: [RaspberryPi]
tags: [2021학습노트, 라즈베리파이]
series: study-2021
study_track: raspberry-pi
study_order: 102
study_unit: 10
permalink: /study/2021/raspberry-pi/30-moving-average/
---

측정값의 순간 변동을 줄이는 간단한 필터를 만들었다. 부드러워지는 대신 변화 반응이 늦어질 수 있다는 점을 함께 적었다.

> 장비 없이 실행하는 모의·계산 예제. Python 3.7 이상 문법을 사용한다.

## 오늘 정리한 개념

길이가 제한된 deque에 최근 값만 보관하고 합계를 현재 개수로 나누면 이동평균을 구할 수 있다. 처음에는 창이 아직 덜 찼으므로 실제 들어온 항목 수로 나눈다. 이 예제는 고정된 모의 측정값이며 실제 센서 잡음 성능을 측정한 결과는 아니다.

## 따라 해 보기

{% raw %}
```python
from collections import deque

window = deque(maxlen=3)
for value in [10, 20, 30, 40]:
    window.append(value)
    average = sum(window) / len(window)
    print(f"현재 {value}, 평균 {average:.1f}")
```
{% endraw %}

## 실행 결과

```text
현재 10, 평균 10.0
현재 20, 평균 15.0
현재 30, 평균 20.0
현재 40, 평균 30.0
```

## 코드를 따라 읽기

초기에는 한 개·두 개의 값으로 평균을 계산하고 세 개가 모인 뒤 최근 세 값만 사용한다. 40이 들어오면 10이 빠져 평균은 30이다. 창 길이가 크면 더 부드러워지지만 급격한 변화도 늦게 드러날 수 있다. 결측을 0으로 넣을지 제외할지도 목적에 맞게 정한다.

## 헷갈린 부분과 주의점

평균을 적용한다고 오류 데이터가 자동으로 정상화되지는 않는다. 값의 유효 범위를 먼저 확인하고 이동평균과 이상치 판정을 구분한다.

## 복습 문제

창 길이 2에서 [10, 20, 30]의 마지막 평균은?

**풀이:** 최근 두 값 20과 30의 평균인 25다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/library/collections.html#collections.deque)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: 임계값 부근의 깜빡임을 히스테리시스로 줄이기]({{ '/study/2021/raspberry-pi/29-hysteresis/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: JSON 설정을 읽고 범위까지 검증하기 →]({{ '/study/2021/raspberry-pi/31-config-json/' | relative_url }})
