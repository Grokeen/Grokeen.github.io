---
layout: content
title: "[파이썬 공부 63] 타입 힌트로 함수의 입력·반환 의도 적기"
date: 2021-07-29 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 63
study_unit: 6
permalink: /study/2021/python/63-typing/
---

코드 설명의 일부를 타입 힌트로 옮겨 보았다. 실행을 바꾸기보다 읽는 사람과 검사 도구에 의도를 전달하는 용도로 이해했다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

타입 힌트는 매개변수와 반환값에 기대하는 형태를 적는다. Python은 기본적으로 힌트를 자동 강제하지 않는다. `typing.Optional[T]`는 T 또는 None을 뜻한다. 이 글은 라즈베리파이의 Python 3.7에서도 읽기 쉬운 typing.List 표기를 사용한다. 정적 분석 도구는 별도 설치·실행해야 한다.

## 따라 해 보기

{% raw %}
```python
from typing import List, Optional

def average(values: List[float]) -> Optional[float]:
    if not values:
        return None
    return sum(values) / len(values)

print(average([2.0, 4.0]))
print(average([]))
```
{% endraw %}

## 실행 결과

```text
3.0
None
```

## 코드를 따라 읽기

`List[float]`는 실수 목록을 기대한다는 뜻이고 Optional은 빈 입력에서 None을 반환할 수 있음을 드러낸다. 호출하는 쪽은 반환값이 None인지 확인한 뒤 숫자로 사용해야 한다. Python 3.10의 T | None 문법은 이 시리즈의 3.9 기준에 섞지 않았다.

## 헷갈린 부분과 주의점

타입 주석은 입력 검증을 대신하지 않는다. 인터넷에서 받은 데이터의 범위와 필수 키는 실제 코드로 확인한다.

## 복습 문제

`Optional[float]`가 인자를 생략할 수 있다는 뜻일까?

**풀이:** 아니다. 값의 종류에 None이 포함된다는 뜻이다. 인자 생략 가능 여부는 기본값 등 함수 정의가 결정한다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/library/typing.html)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: dataclass로 데이터 중심 클래스 작성하기]({{ '/study/2021/python/62-dataclasses/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: iter와 next, 반복자가 소진되는 방식 →]({{ '/study/2021/python/64-iterators/' | relative_url }})
