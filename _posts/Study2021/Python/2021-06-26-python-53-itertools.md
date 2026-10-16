---
layout: content
title: "[파이썬 공부 53] itertools로 조합과 연속 흐름 표현하기"
date: 2021-06-26 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 53
study_unit: 5
permalink: /study/2021/python/53-itertools/
---

중첩 반복을 직접 쓰지 않고 조합과 데카르트 곱을 구했다. 결과를 한꺼번에 만들지 않는 반복자라는 점도 기억했다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

combinations는 중복 없는 위치 조합을, product는 여러 입력의 모든 조합을 생성한다. chain은 여러 반복 가능 객체를 이어 순회한다. 이 도구들은 보통 지연 평가하는 반복자이므로 필요할 때 항목이 나온다. 조합 수가 매우 커질 수 있어 무작정 list로 변환하지 않는다.

## 따라 해 보기

{% raw %}
```python
from itertools import combinations, product, chain

print(list(combinations([1, 2, 3], 2)))
print(list(product(["A", "B"], [0, 1])))
print(list(chain([1, 2], [3])))
```
{% endraw %}

## 실행 결과

```text
[(1, 2), (1, 3), (2, 3)]
[('A', 0), ('A', 1), ('B', 0), ('B', 1)]
[1, 2, 3]
```

## 코드를 따라 읽기

세 항목에서 두 개를 고르는 combinations는 순서만 바꾼 (2, 1)을 별도로 만들지 않는다. product는 각 문자와 각 숫자의 가능한 짝을 모두 만든다. chain은 내부 목록을 복사해 붙이는 대신 차례로 항목을 내어 준다. 예제는 작아서 list로 결과를 눈으로 확인했다.

## 헷갈린 부분과 주의점

값이 중복된 입력에서는 위치가 다른 조합이 같은 값으로 보일 수 있다. product의 입력 크기를 곱해 결과 개수를 먼저 예상한다.

## 복습 문제

두 항목과 세 항목의 product는 몇 쌍을 만들까?

**풀이:** 2 × 3 = 6쌍이다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/library/itertools.html)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: deque로 최근 기록과 큐 만들기]({{ '/study/2021/python/52-deque/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: math로 제곱근과 실수 비교 다루기 →]({{ '/study/2021/python/54-math-isclose/' | relative_url }})
