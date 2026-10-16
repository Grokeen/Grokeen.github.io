---
layout: content
title: "[라즈베리파이 공부 28] CPU 온도를 CSV에 유한 횟수로 기록하기"
date: 2021-11-30 09:00:00 +0900
categories: [RaspberryPi]
tags: [2021학습노트, 라즈베리파이]
series: study-2021
study_track: raspberry-pi
study_order: 100
study_unit: 9
permalink: /study/2021/raspberry-pi/28-csv-logger/
---

센서 수집, 시각 기록, 파일 저장을 연결했다. 먼저 세 번만 실행해 기록 형식과 종료 경로를 살펴보는 예제로 만들었다.

> 장비와 해당 모듈이 필요한 예제. 코드를 `example.py`로 저장하고 라즈베리파이에서 `python3 example.py`로 실행한다. 실제 장비 실행 결과는 확인 방법으로 구분했다.

## 오늘 정리한 개념

홈 아래 pi-study/data 폴더에 CPU 온도 CSV를 이어 쓴다. 새 파일이거나 비어 있을 때만 헤더를 쓰고 UTC 시각을 함께 기록한다. csv.writer에 넘기는 값은 장비에서 읽은 값이다. 이 글에는 실제 수집 파일 대신 실행 후 확인할 열과 행의 규칙을 적었다.

## 따라 해 보기

{% raw %}
```python
import csv
from datetime import datetime, timezone
from pathlib import Path
from time import sleep
from gpiozero import CPUTemperature

path = Path.home() / "pi-study" / "data" / "cpu.csv"
path.parent.mkdir(parents=True, exist_ok=True)
needs_header = not path.exists() or path.stat().st_size == 0
with CPUTemperature() as cpu, path.open("a", encoding="utf-8", newline="") as file:
    writer = csv.writer(file)
    if needs_header:
        writer.writerow(["timestamp_utc", "cpu_c"])
    for _ in range(3):
        stamp = datetime.now(timezone.utc).isoformat()
        writer.writerow([stamp, round(cpu.temperature, 1)])
        file.flush()
        sleep(1)
print(path.name)
```
{% endraw %}

## 장비에서 확인할 내용

장비 확인: cpu.csv라는 이름이 출력되고 CSV에 UTC 시각과 CPU 온도 세 행이 추가된다. 비어 있던 파일에는 헤더도 생긴다.

## 코드를 따라 읽기

append 모드는 이전 기록을 보존한다. flush는 파이썬 버퍼를 내보내지만 전원 장애 때 디스크 기록을 완전히 보장하는 동작은 아니다. 프로그램 한 개가 파일을 쓴다는 가정이며 여러 프로세스가 동시에 헤더 검사·기록하면 별도 동기화가 필요하다.

## 헷갈린 부분과 주의점

한 번 실행할 때마다 헤더를 무조건 추가하지 않는다. 장기 수집에는 저장 공간·로그 회전·시각 동기화와 오류 기록 정책도 정해야 한다.

## 복습 문제

timezone.utc를 넣는 이유는?

**풀이:** 서로 다른 장비나 지역의 로그를 비교할 때 시각 기준을 명확히 하기 위해서다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/library/csv.html)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: 외부 센서 없이 CPU 온도 읽기]({{ '/study/2021/raspberry-pi/27-cpu-temperature/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: 임계값 부근의 깜빡임을 히스테리시스로 줄이기 →]({{ '/study/2021/raspberry-pi/29-hysteresis/' | relative_url }})
