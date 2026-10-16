---
layout: content
title: "[파이썬 공부 52] deque로 최근 기록과 큐 만들기"
date: 2021-06-23 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 52
study_unit: 5
permalink: /study/2021/python/52-deque/
---

최근 값만 남기는 목록과 먼저 들어온 값을 먼저 꺼내는 큐를 만들었다. 왼쪽 삽입·삭제가 잦다면 deque가 맞았다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

collections.deque는 양쪽 끝에 효율적으로 항목을 넣고 뺄 수 있는 자료형이다. append와 popleft를 조합하면 FIFO 큐가 된다. maxlen을 지정하면 가득 찬 상태에서 새 항목을 넣을 때 반대쪽 오래된 항목이 제거된다. 중간 임의 접근이 주목적이라면 리스트와 특성을 비교한다.

## 따라 해 보기

{% raw %}
```python
from collections import deque

recent = deque(maxlen=3)
for value in [10, 20, 30, 40]:
    recent.append(value)
print(list(recent))
queue = deque(["수집", "저장"])
print(queue.popleft())
queue.append("표시")
print(list(queue))
```
{% endraw %}

## 실행 결과

```text
[20, 30, 40]
수집
['저장', '표시']
```

## 코드를 따라 읽기

recent는 최대 세 항목만 보관해 10이 사라진다. queue는 왼쪽에서 수집을 꺼내고 오른쪽에 표시를 추가한다. maxlen은 단순 용량 제한이 아니라 오래된 항목을 자동으로 버리는 정책이다. 손실 없이 모든 작업을 처리해야 하는 큐와 목적이 다르다.

## 헷갈린 부분과 주의점

빈 deque에서 popleft를 호출하면 IndexError가 난다. 스레드 간 대기·작업 완료 관리가 필요하면 queue.Queue 같은 동기화 도구를 검토한다.

## 복습 문제

`deque(maxlen=2)`에 1, 2, 3을 차례로 append하면?

**풀이:** 최종 항목은 [2, 3]이다. 가장 오래된 왼쪽 항목이 밀려난다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/library/collections.html#collections.deque)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: Counter로 항목 빈도와 상위 항목 구하기]({{ '/study/2021/python/51-counter/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: itertools로 조합과 연속 흐름 표현하기 →]({{ '/study/2021/python/53-itertools/' | relative_url }})
