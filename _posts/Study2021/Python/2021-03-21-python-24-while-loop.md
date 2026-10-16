---
layout: content
title: "[파이썬 공부 24] while문에서 종료 조건과 상태 갱신 챙기기"
date: 2021-03-21 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 24
study_unit: 2
permalink: /study/2021/python/24-while-loop/
---

횟수보다 조건을 기준으로 반복하는 while을 공부했다. 조건에 쓰는 값이 실제로 바뀌는지 점검했다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

while은 블록에 들어가기 전에 조건을 검사하고 참인 동안 반복한다. 반복 횟수가 입력이나 상태에 따라 달라질 때 적합하다. 조건이 처음부터 거짓이면 블록은 한 번도 실행되지 않는다. 종료를 위해 상태를 갱신하거나 명시적인 break 경로를 준비해야 한다.

## 따라 해 보기

{% raw %}
```python
remaining = 3
while remaining > 0:
    print("남은 횟수", remaining)
    remaining -= 1
print("종료", remaining)
```
{% endraw %}

## 실행 결과

```text
남은 횟수 3
남은 횟수 2
남은 횟수 1
종료 0
```

## 코드를 따라 읽기

반복이 한 번 끝날 때마다 remaining을 줄인다. 1을 출력한 다음 0으로 바뀌고 다음 검사에서 조건이 거짓이 되어 종료한다. 센서 대기처럼 실제 시간이 필요한 프로그램은 무한 반복 안에 지연이나 이벤트 대기를 두어 CPU를 계속 점유하지 않도록 한다.

## 헷갈린 부분과 주의점

감소문을 빠뜨리면 remaining이 3으로 유지되어 무한 반복한다. continue가 상태 갱신을 건너뛰지 않는지도 확인해야 한다.

## 복습 문제

remaining이 처음부터 0이면 첫 출력은 무엇일까?

**풀이:** 반복 내부는 실행하지 않고 종료 0만 출력한다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/reference/compound_stmts.html#the-while-statement)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: range의 시작값, 종료값, 간격]({{ '/study/2021/python/23-range/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: break, continue와 반복문의 else →]({{ '/study/2021/python/25-break-continue/' | relative_url }})
