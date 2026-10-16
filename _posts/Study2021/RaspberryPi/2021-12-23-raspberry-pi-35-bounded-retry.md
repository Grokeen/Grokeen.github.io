---
layout: content
title: "[라즈베리파이 공부 35] 일시 오류에 횟수 제한을 둔 재시도"
date: 2021-12-23 09:00:00 +0900
categories: [RaspberryPi]
tags: [2021학습노트, 라즈베리파이]
series: study-2021
study_track: raspberry-pi
study_order: 107
study_unit: 10
permalink: /study/2021/raspberry-pi/35-bounded-retry/
---

실패할 때 즉시 무한 재시도하면 장비와 네트워크에 부담을 줄 수 있었다. 모의 오류로 제한된 재시도 흐름을 연습했다.

> 장비 없이 실행하는 모의·계산 예제. Python 3.7 이상 문법을 사용한다.

## 오늘 정리한 개념

재시도는 일시적인 오류에만 적용하고 횟수·대기·최종 실패 처리를 정해야 한다. 이번 예제의 read 함수는 첫 호출에만 OSError를 발생시키는 모의 장치다. 실제 네트워크를 사용하지 않고 재시도 논리만 확인한다. 실제 프로그램에서는 재시도 간격과 로그도 추가한다.

## 따라 해 보기

{% raw %}
```python
attempts = 0

def read_mock():
    global attempts
    attempts += 1
    if attempts == 1:
        raise OSError("일시 수신 실패")
    return 23.0

for attempt in range(1, 4):
    try:
        value = read_mock()
    except OSError:
        print("다시 시도", attempt)
    else:
        print("수집 성공", value)
        break
else:
    print("최종 실패")
```
{% endraw %}

## 실행 결과

```text
다시 시도 1
수집 성공 23.0
```

## 코드를 따라 읽기

첫 실패는 처리하고 다음 시도에서 성공하면 break한다. 반복문의 else는 세 번 모두 실패해 break가 없을 때만 실행된다. 이 예제는 대기 시간을 생략한 논리 설명용이다. 실제 읽기 함수의 timeout까지 정해야 전체 대기 시간 상한을 예측할 수 있다.

## 헷갈린 부분과 주의점

모든 Exception을 재시도하면 잘못된 설정 같은 영구 오류도 반복하게 된다. 저장·전송의 재시도는 중복 기록이 생길 가능성도 고려한다.

## 복습 문제

시도 세 번이 모두 실패하면 else가 실행되는 이유는?

**풀이:** 성공에 따른 break 없이 반복이 소진되기 때문이다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/tutorial/controlflow.html#break-and-continue-statements-and-else-clauses-on-loops)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: systemd 서비스 파일의 실행 경로와 재시작 정책]({{ '/study/2021/raspberry-pi/34-systemd/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: 종합 실습: 모의 센서 수집기를 분리해서 만들기 →]({{ '/study/2021/raspberry-pi/36-collector-project/' | relative_url }})
