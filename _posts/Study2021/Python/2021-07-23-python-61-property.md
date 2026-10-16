---
layout: content
title: "[파이썬 공부 61] property로 속성 대입 때 값 검증하기"
date: 2021-07-23 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 61
study_unit: 6
permalink: /study/2021/python/61-property/
---

외부에서는 속성처럼 읽고 쓰되 내부에서는 검증하도록 만들었다. 메서드 호출을 감추는 기능보다 값의 규칙을 한곳에 모으는 데 의미를 두었다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

@property는 메서드를 속성 접근 형태로 제공한다. 같은 이름의 @이름.setter는 대입을 처리한다. 실제 저장용 속성을 _value처럼 별도로 두면 재귀 호출을 피할 수 있다. 밑줄은 내부용이라는 관례이며 강제적인 보안 장벽은 아니다.

## 따라 해 보기

{% raw %}
```python
class Level:
    def __init__(self, value):
        self.value = value

    @property
    def value(self):
        return self._value

    @value.setter
    def value(self, value):
        if not 0 <= value <= 100:
            raise ValueError("0~100 범위 필요")
        self._value = value

level = Level(40)
level.value = 75
print(level.value)
try:
    level.value = 120
except ValueError:
    print("범위 오류")
print(level.value)
```
{% endraw %}

## 실행 결과

```text
75
범위 오류
75
```

## 코드를 따라 읽기

초기화의 self.value 대입도 setter를 거친다. 잘못된 120은 저장하기 전에 거절하므로 기존 75가 유지된다. 읽기와 대입 양쪽에서 같은 공개 이름을 쓸 수 있다. 예제는 숫자 범위 검증만 하며 타입 검증이 필요한 경우는 별도로 추가한다.

## 헷갈린 부분과 주의점

setter 안에서 self.value = value를 다시 쓰면 자신을 계속 호출한다. 속성을 읽는 것만으로 무거운 작업이 일어나게 만들면 사용자가 예상하기 어렵다.

## 복습 문제

setter를 정의하지 않으면 외부에서 value에 대입할 수 있을까?

**풀이:** 일반적으로 해당 property는 읽기 전용이 되어 대입 시 AttributeError가 난다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/library/functions.html#property)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: 상속과 super로 공통 동작 확장하기]({{ '/study/2021/python/60-inheritance/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: dataclass로 데이터 중심 클래스 작성하기 →]({{ '/study/2021/python/62-dataclasses/' | relative_url }})
