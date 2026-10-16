---
layout: content
title: "[파이썬 공부 59] 인스턴스 속성과 클래스 속성 구별하기"
date: 2021-07-16 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 59
study_unit: 5
permalink: /study/2021/python/59-class-instance-state/
---

여러 객체가 같은 목록을 공유하는 실수를 피하려고 속성 위치를 비교했다. 공통 정보와 개별 기록의 소유자를 나누었다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

클래스 본문에 정의한 속성은 여러 인스턴스가 함께 참조할 수 있다. `__init__` 안에서 self에 대입한 속성은 개별 인스턴스에 속한다. 공통 단위처럼 공유해도 되는 값은 클래스 속성으로, 각 센서 기록처럼 독립적이어야 하는 값은 인스턴스 속성으로 둔다.

## 따라 해 보기

{% raw %}
```python
class Recorder:
    unit = "C"

    def __init__(self):
        self.values = []

first = Recorder()
second = Recorder()
first.values.append(23)
print(first.values, second.values)
print(first.unit, second.unit)
```
{% endraw %}

## 실행 결과

```text
[23] []
C C
```

## 코드를 따라 읽기

values는 객체를 만들 때마다 새 리스트로 초기화하므로 first의 추가가 second에 영향을 주지 않는다. unit은 두 객체가 클래스의 같은 속성을 읽는다. 메서드 기본값의 리스트 공유 문제와 비슷하게, 객체를 언제 한 번 만들고 언제 매번 만드는지 확인했다.

## 헷갈린 부분과 주의점

values = []를 클래스 본문에 두면 두 객체가 같은 목록을 수정할 수 있다. 공유 상태가 의도인지 명확히 판단해야 한다.

## 복습 문제

first.unit = `"F"`를 하면 second.unit도 바뀔까?

**풀이:** 이 대입은 first의 인스턴스 속성을 만들어 second는 여전히 클래스의 C를 읽는다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/tutorial/classes.html#class-and-instance-variables)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: 클래스와 인스턴스로 상태와 동작 묶기]({{ '/study/2021/python/58-classes/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: 상속과 super로 공통 동작 확장하기 →]({{ '/study/2021/python/60-inheritance/' | relative_url }})
