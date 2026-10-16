---
layout: content
title: "[파이썬 공부 49] 시간 간격은 monotonic으로 측정하기"
date: 2021-06-13 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 49
study_unit: 5
permalink: /study/2021/python/49-monotonic-time/
---

시각을 표시하는 일과 경과 시간을 재는 일을 나누었다. 결과를 일정하게 설명하려고 비교식만 출력하는 예제로 만들었다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

time.time은 기준 시점 이후의 벽시계 시간을 반환하며 시스템 시간 보정의 영향을 받을 수 있다. monotonic은 뒤로 가지 않는 시계라 시간 간격과 대기 제한에 적합하다. sleep은 초 단위로 실행을 잠시 멈추지만 운영체제 스케줄링 때문에 정확한 주기를 보장하지 않는다.

## 따라 해 보기

{% raw %}
```python
import time

start = time.monotonic()
time.sleep(0.01)
elapsed = time.monotonic() - start
print(elapsed >= 0)
print(isinstance(elapsed, float))
```
{% endraw %}

## 실행 결과

```text
True
True
```

## 코드를 따라 읽기

start와 끝 값을 같은 monotonic 시계에서 읽어 차이를 계산한다. 실제 측정값은 환경마다 다르므로 일정한 밀리초 수를 예상 결과로 고정하지 않았다. `sleep(0.01)`은 10밀리초의 정밀 타이머를 만든다는 뜻이 아니다. 라즈베리파이의 주기적 측정에서도 같은 구분을 적용할 예정이다.

## 헷갈린 부분과 주의점

monotonic의 절대값을 날짜로 해석하면 안 된다. 재시작을 넘어 저장할 시각에는 시간대가 명확한 날짜·시간 표현을 사용한다.

## 복습 문제

시간 제한 5초를 검사할 때 어떤 값을 비교하면 좋을까?

**풀이:** 같은 시계로 잰 `time.monotonic()` - start가 5 이상인지 비교한다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/library/time.html#time.monotonic)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: datetime으로 날짜 차이와 형식 변환하기]({{ '/study/2021/python/48-datetime/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: 정규식으로 일정한 형식의 텍스트 추출하기 →]({{ '/study/2021/python/50-regular-expressions/' | relative_url }})
