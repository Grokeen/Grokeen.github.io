---
layout: content
title: "[라즈베리파이 공부 31] JSON 설정을 읽고 범위까지 검증하기"
date: 2021-12-10 09:00:00 +0900
categories: [RaspberryPi]
tags: [2021학습노트, 라즈베리파이]
series: study-2021
study_track: raspberry-pi
study_order: 103
study_unit: 10
permalink: /study/2021/raspberry-pi/31-config-json/
---

실행 주기와 횟수를 코드에서 분리하는 구성을 연습했다. JSON이 읽혔다고 설정이 모두 올바른 것은 아니었다.

> 장비 없이 실행하는 모의·계산 예제. Python 3.7 이상 문법을 사용한다.

## 오늘 정리한 개념

설정은 읽기·형식 확인·의미 검증을 거친 뒤 사용한다. json.loads는 문법을 읽을 뿐 count가 양의 정수인지 판단하지 않는다. bool이 int의 하위 유형이라는 점을 고려해 여기서는 `type(count)` is int로 True·False를 횟수로 받지 않게 했다. 입력은 메모리 문자열로 고정했다.

## 따라 해 보기

{% raw %}
```python
import json

def parse_config(text):
    data = json.loads(text)
    if not isinstance(data, dict):
        raise ValueError("객체 설정 필요")
    count = data.get("count", 3)
    if type(count) is not int or not 1 <= count <= 100:
        raise ValueError("count는 1~100 정수")
    return count

print(parse_config('{"count": 5}'))
try:
    parse_config('{"count": true}')
except ValueError as error:
    print(error)
```
{% endraw %}

## 실행 결과

```text
5
count는 1~100 정수
```

## 코드를 따라 읽기

정상 설정은 5를 반환한다. JSON true는 파이썬 True가 되지만 이 예제에서는 횟수로 허용하지 않는다. 파일에서 읽을 때도 같은 검증 함수를 적용할 수 있다. 누락된 키의 기본값과 잘못 입력한 값의 거절 정책을 구분했다.

## 헷갈린 부분과 주의점

설정에 비밀값이 있으면 전체 내용을 로그로 출력하지 않는다. 파일 경로·단위·상한 등 값이 실제 동작에 미치는 영향도 함께 검증한다.

## 복습 문제

최상위 JSON이 [1, 2]이면 왜 거절할까?

**풀이:** 설정 키를 읽을 딕셔너리 객체를 기대하도록 함수 계약을 정했기 때문이다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/library/json.html)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: 이동평균으로 최근 측정 추세 보기]({{ '/study/2021/raspberry-pi/30-moving-average/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: Ctrl+C 뒤에도 GPIO를 정리하는 구조 →]({{ '/study/2021/raspberry-pi/32-cleanup/' | relative_url }})
