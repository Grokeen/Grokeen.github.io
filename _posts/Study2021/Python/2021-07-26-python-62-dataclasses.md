---
layout: content
title: "[파이썬 공부 62] dataclass로 데이터 중심 클래스 작성하기"
date: 2021-07-26 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 62
study_unit: 6
permalink: /study/2021/python/62-dataclasses/
---

측정값을 담는 클래스의 반복적인 초기화 코드를 줄였다. 자동으로 제공되는 기능과 직접 검증해야 할 부분을 구분했다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

@dataclass는 타입 주석으로 선언한 필드를 바탕으로 `__init__`, `__repr__`, 동등 비교 메서드 등을 만들어 준다. 타입 주석을 적는 것만으로 런타임 타입 검사가 강제되지는 않는다. 변경 가능한 기본 필드는 `field(default_factory=list)`처럼 매번 새 객체를 만드는 방식으로 선언한다.

## 따라 해 보기

{% raw %}
```python
from dataclasses import dataclass, field

@dataclass
class Reading:
    name: str
    value: float
    tags: list = field(default_factory=list)

first = Reading("실내", 22.0)
second = Reading("실내", 22.0)
print(first == second)
first.tags.append("오전")
print(first.tags, second.tags)
print(first.name, first.value)
```
{% endraw %}

## 실행 결과

```text
True
['오전'] []
실내 22.0
```

## 코드를 따라 읽기

같은 필드 값으로 만든 두 객체는 ==에서 같다고 비교된다. tags는 각 인스턴스마다 새 목록이어서 공유되지 않는다. 자동 생성된 초기화로 데이터 구조를 드러내되 센서 값 범위 같은 규칙은 별도로 구현해야 한다. frozen 옵션 역시 깊은 불변성을 보장하는 도구는 아니다.

## 헷갈린 부분과 주의점

기본값으로 []를 직접 두지 않는다. 데이터 클래스를 만들었다고 입력의 잘못된 자료형이 자동으로 거부된다고 생각하지 않는다.

## 복습 문제

`field(default_factory=list)`의 list는 왜 호출 괄호가 없을까?

**풀이:** 필요할 때 새 목록을 만들 함수 자체를 전달하기 때문이다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/library/dataclasses.html)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: property로 속성 대입 때 값 검증하기]({{ '/study/2021/python/61-property/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: 타입 힌트로 함수의 입력·반환 의도 적기 →]({{ '/study/2021/python/63-typing/' | relative_url }})
