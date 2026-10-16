---
layout: content
title: "[파이썬 공부 16] append, extend, pop으로 리스트 변경하기"
date: 2021-02-23 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 16
study_unit: 2
permalink: /study/2021/python/16-list-methods/
---

항목 하나를 넣는 append와 여러 항목을 펼쳐 넣는 extend를 비교했다. 메서드의 반환값도 직접 확인했다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

`append(x)`는 x 자체를 마지막 항목으로 추가한다. `extend(iterable)`는 반복 가능한 객체의 항목을 하나씩 추가한다. `pop()`은 마지막 항목을 제거해 반환하고 `remove(x)`는 처음 만나는 같은 값을 제거한다. 정렬·추가처럼 제자리에서 바꾸는 메서드는 보통 None을 반환한다.

## 따라 해 보기

{% raw %}
```python
tasks = ["읽기"]
result = tasks.append("정리")
tasks.extend(["실습", "복습"])
print(tasks)
print(result)
last = tasks.pop()
print(last)
print(tasks)
```
{% endraw %}

## 실행 결과

```text
['읽기', '정리', '실습', '복습']
None
복습
['읽기', '정리', '실습']
```

## 코드를 따라 읽기

append 뒤의 result는 새 리스트가 아니라 None이다. 실제 tasks는 변경되어 항목이 늘어난다. pop은 제거한 복습을 last에 넘긴다. 항목을 바꾸는 동작과 값을 반환하는 동작을 함께 확인하면 tasks = `tasks.append(...)` 같은 실수를 피할 수 있다.

## 헷갈린 부분과 주의점

`append([1, 2])`는 숫자 두 개가 아니라 리스트 한 개를 항목으로 추가한다. 없는 값을 remove하면 ValueError가 발생한다.

## 복습 문제

빈 리스트에 `extend("AB")`를 실행하면?

**풀이:** [`"A"`, `"B"`]가 된다. 문자열도 문자 단위로 반복 가능한 객체이기 때문이다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/tutorial/datastructures.html#more-on-lists)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: 리스트로 순서 있는 값 묶기]({{ '/study/2021/python/15-lists/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: 대입, 얕은 복사, 깊은 복사 구분하기 →]({{ '/study/2021/python/17-list-copy/' | relative_url }})
