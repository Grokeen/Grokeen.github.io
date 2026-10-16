---
layout: content
title: "[파이썬 공부 67] unittest로 정상값과 오류 경로 확인하기"
date: 2021-08-12 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 67
study_unit: 6
permalink: /study/2021/python/67-unittest/
---

눈으로 출력만 보던 함수를 자동 검사로 바꿨다. 하나의 정상값뿐 아니라 경계와 잘못된 값도 함께 확인했다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

unittest.TestCase의 test로 시작하는 메서드에 검사를 작성한다. assertEqual은 기대값 비교, assertRaises는 특정 예외 발생을 확인한다. 이 예제는 결과를 일정하게 보여 주기 위해 TestResult를 직접 사용한다. 실제 프로젝트에서는 python3 -m unittest로 테스트를 발견하고 실행할 수 있다.

## 따라 해 보기

{% raw %}
```python
import unittest

def percent(value):
    if not 0 <= value <= 100:
        raise ValueError("범위 오류")
    return value / 100

class PercentTests(unittest.TestCase):
    def test_normal(self):
        self.assertEqual(percent(25), 0.25)
        self.assertEqual(percent(0), 0)

    def test_invalid(self):
        with self.assertRaises(ValueError):
            percent(101)

suite = unittest.defaultTestLoader.loadTestsFromTestCase(PercentTests)
result = unittest.TestResult()
suite.run(result)
print(result.testsRun, result.wasSuccessful())
```
{% endraw %}

## 실행 결과

```text
2 True
```

## 코드를 따라 읽기

검사 메서드 두 개가 실행되어 testsRun은 2다. 하나의 메서드 안에 단언이 여러 개 있어도 메서드 수와 구별한다. 실패가 나면 기대한 동작과 실제 동작 중 어느 쪽이 잘못됐는지 확인한다. 통과 여부만 보지 않고 검사가 실제 요구를 표현하는지도 생각했다.

## 헷갈린 부분과 주의점

예상 출력 문자열을 그대로 복사하는 검사만으로 모든 논리를 검증할 수는 없다. 빈 입력·경계·실패 후 상태처럼 중요한 경우를 골라 추가한다.

## 복습 문제

assertRaises 블록에서 아무 예외도 안 나면 통과할까?

**풀이:** 통과하지 않는다. 지정한 예외가 발생해야 기대한 동작을 만족한다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/library/unittest.html)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: contextmanager로 시작과 정리 흐름 감싸기]({{ '/study/2021/python/66-contextmanager/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: logging으로 실행 수준별 기록 남기기 →]({{ '/study/2021/python/68-logging/' | relative_url }})
