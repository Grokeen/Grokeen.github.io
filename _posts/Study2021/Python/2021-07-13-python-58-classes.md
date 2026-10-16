---
layout: content
title: "[파이썬 공부 58] 클래스와 인스턴스로 상태와 동작 묶기"
date: 2021-07-13 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 58
study_unit: 5
permalink: /study/2021/python/58-classes/
---

측정기의 이름과 값을 한 객체에 모았다. 클래스는 설계, 인스턴스는 그 설계로 만든 개별 객체로 생각했다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

class는 새 객체 유형을 정의한다. `__init__`은 인스턴스 초기화 시 호출되며 self는 현재 객체를 받는 관례적 첫 매개변수다. self.name처럼 저장한 값은 인스턴스 속성이다. 객체마다 별도의 상태를 두면 같은 코드로 여러 측정기를 표현할 수 있다.

## 따라 해 보기

{% raw %}
```python
class Sensor:
    def __init__(self, name, value):
        self.name = name
        self.value = value

    def describe(self):
        return f"{self.name}: {self.value}"

room = Sensor("실내", 22)
outside = Sensor("실외", 18)
print(room.describe())
print(outside.describe())
```
{% endraw %}

## 실행 결과

```text
실내: 22
실외: 18
```

## 코드를 따라 읽기

`Sensor(...)`를 호출할 때 두 입력이 `__init__`으로 전달된다. `room.describe()`는 room 자신을 self로 받아 자신의 속성을 읽는다. 두 객체의 값은 별도로 보관된다. 공통 동작을 함수로 정의하면서 개별 상태는 인스턴스에 두는 구조를 연습했다.

## 헷갈린 부분과 주의점

메서드에서 인스턴스 속성을 읽을 때 self를 빼면 다른 지역 이름을 찾게 된다. 변경 가능한 클래스 속성과 인스턴스 속성도 구별해야 한다.

## 복습 문제

room.value를 23으로 바꾸면 outside.value도 바뀔까?

**풀이:** 현재 구조에서는 아니다. 서로 다른 인스턴스의 별도 속성이다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/tutorial/classes.html#class-objects)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: random으로 재현 가능한 모의 데이터 만들기]({{ '/study/2021/python/57-random/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: 인스턴스 속성과 클래스 속성 구별하기 →]({{ '/study/2021/python/59-class-instance-state/' | relative_url }})
