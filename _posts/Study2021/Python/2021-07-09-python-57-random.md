---
layout: content
title: "[파이썬 공부 57] random으로 재현 가능한 모의 데이터 만들기"
date: 2021-07-09 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 57
study_unit: 5
permalink: /study/2021/python/57-random/
---

센서 없이도 반복 실습할 수 있게 가상의 값을 만들었다. 모의 데이터와 실제 측정 결과를 구분해 기록했다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

random은 일반 시뮬레이션용 의사난수 도구다. `Random(seed)`로 별도 생성기를 만들면 같은 버전·같은 호출 순서에서 재현 가능한 흐름을 얻는다. randint는 양 끝을 포함하고 choice는 항목 하나를 고른다. 비밀번호나 인증 토큰에는 random 대신 secrets 같은 보안용 도구를 사용한다.

## 따라 해 보기

{% raw %}
```python
import random

first = random.Random(2021)
second = random.Random(2021)
left = [first.randint(18, 28) for _ in range(5)]
right = [second.randint(18, 28) for _ in range(5)]
print(left == right)
print(all(18 <= value <= 28 for value in left))
print(len(left))
```
{% endraw %}

## 실행 결과

```text
True
True
5
```

## 코드를 따라 읽기

두 생성기는 같은 시드와 같은 호출 순서를 사용해 같은 목록을 만든다. 구체적 난수열을 다른 파이썬 버전까지 고정한다고 주장하지 않고 재현성과 범위만 확인했다. _는 반복 횟수에만 관심 있고 현재 번호는 쓰지 않는다는 관례적 이름이다.

## 헷갈린 부분과 주의점

시드를 고정하면 보안적으로 예측할 수 있는 값이 된다. 실행 중 함수 호출 횟수가 달라지면 이후 난수도 달라질 수 있다.

## 복습 문제

`randint(1, 6)`에서 6이 나올 수 있을까?

**풀이:** 가능하다. randint는 양 끝을 포함한다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/library/random.html)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: Decimal로 십진수 계산 의도 표현하기]({{ '/study/2021/python/56-decimal/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: 클래스와 인스턴스로 상태와 동작 묶기 →]({{ '/study/2021/python/58-classes/' | relative_url }})
