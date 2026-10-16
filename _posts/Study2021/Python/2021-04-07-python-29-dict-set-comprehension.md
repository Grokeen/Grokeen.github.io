---
layout: content
title: "[파이썬 공부 29] 딕셔너리·집합 컴프리헨션 사용하기"
date: 2021-04-07 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 29
study_unit: 3
permalink: /study/2021/python/29-dict-set-comprehension/
---

중괄호를 쓰더라도 콜론 유무에 따라 결과 자료형이 달랐다. 이름별 정보와 중복 없는 값을 각각 만들어 보았다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

{키: 값 for ...}는 딕셔너리를, {식 for ...}는 집합을 만든다. 딕셔너리에서 키가 중복되면 뒤에서 만든 값이 앞의 값을 덮어쓴다. 집합에서는 같은 결과값이 하나만 남는다. 어떤 정보가 중복될 수 있는지 예상한 뒤 적절한 자료형을 선택해야 한다.

## 따라 해 보기

{% raw %}
```python
names = ["pi", "python", "pi"]
lengths = {name: len(name) for name in names}
unique_lengths = {len(name) for name in names}
print(lengths)
print(sorted(unique_lengths))
print(type(lengths).__name__, type(unique_lengths).__name__)
```
{% endraw %}

## 실행 결과

```text
{'pi': 2, 'python': 6}
[2, 6]
dict set
```

## 코드를 따라 읽기

lengths는 이름을 키로 사용하므로 pi가 한 번만 남는다. unique_lengths는 길이 값만 모은 집합이다. 정렬해서 출력한 [2, 6]은 리스트이며 원래 집합의 자료형을 마지막 줄에서 따로 확인했다. 컴프리헨션의 결과를 예상할 때 키와 값을 먼저 표시해 보았다.

## 헷갈린 부분과 주의점

{}를 빈 집합으로 착각하지 않는다. 딕셔너리 키 충돌로 데이터가 사라져도 문법 오류가 나지 않으므로 키 설계가 중요하다.

## 복습 문제

{x % 2 for x in [1, 2, 3, 4]}에 항목은 몇 개일까?

**풀이:** 2개다. 나머지 0과 1만 남는다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/tutorial/datastructures.html#dictionaries)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: 리스트 컴프리헨션으로 변환과 필터 표현하기]({{ '/study/2021/python/28-list-comprehension/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: sorted와 sort, key로 정렬 기준 정하기 →]({{ '/study/2021/python/30-sorting/' | relative_url }})
