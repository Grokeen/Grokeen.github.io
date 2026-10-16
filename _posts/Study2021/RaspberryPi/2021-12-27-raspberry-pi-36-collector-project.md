---
layout: content
title: "[라즈베리파이 공부 36] 종합 실습: 모의 센서 수집기를 분리해서 만들기"
date: 2021-12-27 09:00:00 +0900
categories: [RaspberryPi]
tags: [2021학습노트, 라즈베리파이]
series: study-2021
study_track: raspberry-pi
study_order: 108
study_unit: 10
permalink: /study/2021/raspberry-pi/36-collector-project/
---

마지막에는 장치 읽기와 자료 저장을 분리한 작은 수집기를 작성했다. 실제 센서가 없어도 처리·제외·저장 규칙을 재현할 수 있게 했다.

> 장비 없이 실행하는 모의·계산 예제. Python 3.7 이상 문법을 사용한다.

## 오늘 정리한 개념

read 함수를 입력받으면 실제 GPIO 코드와 계산을 느슨하게 연결할 수 있다. 여기서는 모의 값 21·None·23을 순서대로 제공한다. 수집 횟수는 세 번으로 제한하고 누락값은 제외한다. 저장은 메모리 CSV로 만들어 파일 권한이나 장치 연결 문제와 계산 논리를 분리했다.

## 따라 해 보기

{% raw %}
```python
import csv
import io

def collect(read, count):
    rows = []
    for sequence in range(1, count + 1):
        value = read()
        if value is None:
            continue
        rows.append((sequence, value))
    return rows

samples = iter([21.0, None, 23.0])
rows = collect(lambda: next(samples), 3)
buffer = io.StringIO(newline="")
writer = csv.writer(buffer, lineterminator="\n")
writer.writerow(["sequence", "temperature_c"])
writer.writerows(rows)
print(buffer.getvalue(), end="")
```
{% endraw %}

## 실행 결과

```text
sequence,temperature_c
1,21.0
3,23.0
```

## 코드를 따라 읽기

실패한 두 번째 순번을 0으로 채우지 않고 기록에서 제외해 실제 읽힌 값만 저장한다. 다음 단계에서는 read를 실제 센서 함수로 바꾸고 시각·오류 횟수·종료 정리·파일 회전을 추가할 수 있다. 실제 장비 검증은 그때 별도로 수행해야 하며 이 결과는 모의 입력의 출력이다.

## 헷갈린 부분과 주의점

계산 예제의 성공이 배선·장치 권한·실제 타이밍까지 검증했다는 뜻은 아니다. count가 입력보다 크면 현재 모의 반복자는 소진되므로 계약을 맞춰야 한다.

## 복습 문제

실제 센서 함수에도 같은 collect를 쓰려면 어떤 약속이 필요할까?

**풀이:** 인자 없이 값을 읽고 정상값 또는 명시한 누락값을 돌려주는 인터페이스를 맞춰야 한다. 예외 처리 정책도 정해야 한다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/library/csv.html)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: 일시 오류에 횟수 제한을 둔 재시도]({{ '/study/2021/raspberry-pi/35-bounded-retry/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})
