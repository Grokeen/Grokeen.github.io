---
layout: content
title: "[파이썬 공부 60] 상속과 super로 공통 동작 확장하기"
date: 2021-07-19 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 60
study_unit: 5
permalink: /study/2021/python/60-inheritance/
---

공통 측정기에서 온도 측정기를 파생시켰다. 비슷한 속성을 복사하지 않고 상위 초기화 동작을 재사용했다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

class 자식(부모)는 부모의 속성과 메서드를 이어받는다. 자식은 필요한 메서드를 새로 정의해 동작을 바꿀 수 있다. `super()`는 메서드 해석 순서에 따라 다음 클래스의 구현을 호출한다. 단순히 코드가 비슷하다는 이유보다 자식이 부모 역할을 대신할 수 있는 관계인지 생각해야 한다.

## 따라 해 보기

{% raw %}
```python
class Sensor:
    def __init__(self, name):
        self.name = name

    def unit(self):
        return "없음"

class TemperatureSensor(Sensor):
    def __init__(self, name):
        super().__init__(name)

    def unit(self):
        return "C"

sensor = TemperatureSensor("실내")
print(sensor.name, sensor.unit())
print(isinstance(sensor, Sensor))
```
{% endraw %}

## 실행 결과

```text
실내 C
True
```

## 코드를 따라 읽기

`super()`.`__init__`은 name을 초기화하는 공통 코드를 실행한다. unit은 자식의 구현이 선택된다. isinstance는 자식 객체가 부모 유형에도 해당함을 보여 준다. 변경될 수 있는 장치 부분을 교체할 때는 상속뿐 아니라 별도 객체를 조합하는 방식도 가능하다.

## 헷갈린 부분과 주의점

자식에서 `__init__`을 재정의하면 부모 초기화가 자동으로 다시 실행되는 것은 아니다. 필요한 경우 명시적으로 super를 호출한다.

## 복습 문제

자식이 unit을 정의하지 않으면 어떤 결과가 나올까?

**풀이:** 부모 Sensor의 unit 구현을 찾아 `"없음"`을 반환한다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/tutorial/classes.html#inheritance)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: 인스턴스 속성과 클래스 속성 구별하기]({{ '/study/2021/python/59-class-instance-state/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: property로 속성 대입 때 값 검증하기 →]({{ '/study/2021/python/61-property/' | relative_url }})
