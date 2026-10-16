---
layout: content
title: "[파이썬 공부 48] datetime으로 날짜 차이와 형식 변환하기"
date: 2021-06-09 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 48
study_unit: 4
permalink: /study/2021/python/48-datetime/
---

날짜를 문자열 덧셈이 아니라 날짜 객체로 다루었다. 오늘 날짜에 의존하지 않는 고정 예제로 결과를 비교했다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

date는 날짜를, datetime은 날짜와 시간을 표현한다. timedelta는 기간이며 날짜에 더하거나 뺄 수 있다. strftime은 객체를 지정 형식의 문자열로 표시하고 strptime은 지정 형식의 문자열을 해석한다. 지역 시간과 UTC를 다룰 때는 시간대 정보가 있는지 따로 확인해야 한다.

## 따라 해 보기

{% raw %}
```python
from datetime import date, datetime, timedelta

start = date(2021, 1, 1)
end = start + timedelta(days=7)
print(end.isoformat())
print((end - start).days)
moment = datetime.strptime("2021-08-15 09:30", "%Y-%m-%d %H:%M")
print(moment.strftime("%Y/%m/%d %H:%M"))
```
{% endraw %}

## 실행 결과

```text
2021-01-08
7
2021/08/15 09:30
```

## 코드를 따라 읽기

1월 1일에 7일을 더하면 1월 8일이다. 날짜 차이는 timedelta이므로 days를 읽는다. strptime과 strftime은 방향이 반대다. 마지막 예제는 시간대 없는 단순 지역 시각이며 UTC 시각이라고 주장하지 않는다. 일정표와 로그에서는 시간대 정책까지 정해야 한다.

## 헷갈린 부분과 주의점

문자열 정렬이 날짜 정렬과 항상 같지는 않다. 01/02처럼 연도와 지역별 순서가 모호한 입력은 형식을 명시한다.

## 복습 문제

`date(2021, 2, 30)`을 만들 수 있을까?

**풀이:** 아니다. 존재하지 않는 날짜라 ValueError가 발생한다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/library/datetime.html)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: JSON 직렬화와 역직렬화 구분하기]({{ '/study/2021/python/47-json/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: 시간 간격은 monotonic으로 측정하기 →]({{ '/study/2021/python/49-monotonic-time/' | relative_url }})
