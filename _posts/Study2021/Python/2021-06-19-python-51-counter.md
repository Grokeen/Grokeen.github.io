---
layout: content
title: "[파이썬 공부 51] Counter로 항목 빈도와 상위 항목 구하기"
date: 2021-06-19 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 51
study_unit: 5
permalink: /study/2021/python/51-counter/
---

직접 만들었던 빈도 딕셔너리를 표준 라이브러리 Counter로 바꿔 보았다. 자주 나오는 항목을 구하는 코드가 짧아졌다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

collections.Counter는 항목을 키로, 개수를 값으로 다루는 딕셔너리 계열 자료형이다. 반복 가능한 객체를 전달하면 항목을 센다. `most_common(n)`은 빈도가 높은 항목을 쌍으로 반환하고 update는 입력의 개수를 더한다. 일반 dict.update의 값 교체와 의미가 다르다.

## 따라 해 보기

{% raw %}
```python
from collections import Counter

counts = Counter(["ok", "error", "ok", "ok"])
print(counts["ok"], counts["missing"])
counts.update(["error", "error"])
print(counts["error"])
print(counts.most_common(1))
```
{% endraw %}

## 실행 결과

```text
3 0
3
[('ok', 3)]
```

## 코드를 따라 읽기

없는 missing을 읽으면 0을 반환한다. error 두 개를 추가하면 기존 1과 합쳐 3이 된다. ok와 error의 빈도가 같을 때 most_common은 먼저 등장한 항목 순서를 따른다. 표준 도구를 사용하더라도 갱신 규칙은 다시 확인할 필요가 있었다.

## 헷갈린 부분과 주의점

`Counter("hello")`는 단어 하나가 아니라 문자별 빈도를 센다. 단어 빈도가 목적이면 먼저 split 등으로 단어 목록을 만들어야 한다.

## 복습 문제

`Counter(["a", "a"])`[`"b"`]는 무엇일까?

**풀이:** 0이다. 존재하지 않는 항목의 개수를 0으로 읽는다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/library/collections.html#collections.Counter)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: 정규식으로 일정한 형식의 텍스트 추출하기]({{ '/study/2021/python/50-regular-expressions/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: deque로 최근 기록과 큐 만들기 →]({{ '/study/2021/python/52-deque/' | relative_url }})
