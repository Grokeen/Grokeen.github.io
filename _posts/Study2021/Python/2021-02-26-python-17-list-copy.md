---
layout: content
title: "[파이썬 공부 17] 대입, 얕은 복사, 깊은 복사 구분하기"
date: 2021-02-26 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 17
study_unit: 2
permalink: /study/2021/python/17-list-copy/
---

리스트를 다른 이름에 대입했는데 원본도 바뀌는 이유를 정리했다. 복사는 어느 깊이까지 필요한지 따져야 했다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

다른 변수에 리스트를 대입해도 객체를 복제하지 않는다. `copy()`나 [:]는 바깥 리스트만 새로 만드는 얕은 복사다. 내부 항목이 다시 리스트라면 내부 객체를 공유한다. copy.deepcopy는 내부 구조까지 재귀적으로 복사하므로 중첩 목록을 독립적으로 수정해야 할 때 사용할 수 있다.

## 따라 해 보기

{% raw %}
```python
import copy
original = [[1], [2]]
alias = original
shallow = original.copy()
deep = copy.deepcopy(original)
alias[0].append(9)
print(original)
print(shallow)
print(deep)
print(alias is original)
```
{% endraw %}

## 실행 결과

```text
[[1, 9], [2]]
[[1, 9], [2]]
[[1], [2]]
True
```

## 코드를 따라 읽기

alias는 original과 같은 바깥 객체다. shallow는 바깥만 새 객체이고 [1]이라는 내부 리스트는 공유해서 9가 보인다. deep은 내부 리스트도 별도로 만들어 변경 영향을 받지 않는다. is를 써서 같은 객체인지 확인하는 상황을 값 비교와 구별했다.

## 헷갈린 부분과 주의점

깊은 복사를 무조건 쓰면 비용이 커질 수 있다. 변경할 데이터의 구조와 공유 의도를 먼저 정하고 필요한 부분만 새로 만드는 방법도 고려한다.

## 복습 문제

정수만 든 [1, 2]의 항목을 독립적으로 교체하려면 얕은 복사로 충분할까?

**풀이:** 충분하다. 정수는 변경 불가능하고 바깥 리스트의 항목 교체는 원본 리스트를 바꾸지 않는다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/library/copy.html)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: append, extend, pop으로 리스트 변경하기]({{ '/study/2021/python/16-list-methods/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: 튜플과 언패킹으로 여러 값 받기 →]({{ '/study/2021/python/18-tuples-unpacking/' | relative_url }})
