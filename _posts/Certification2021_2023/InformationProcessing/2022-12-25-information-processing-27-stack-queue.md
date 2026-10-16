---
layout: content
title: "[정보처리기사 27] 스택과 큐의 제거 순서"
date: 2022-12-25 09:00:00 +0900
categories: [InformationProcessingCertification]
tags: [자격증학습, 정보처리기사]
series: study-certifications-2021-2023
study_track: information-processing
study_order: 27
study_unit: 6
permalink: /study/certifications/2021-2023/information-processing/27-stack-queue/
---

자료구조 문제는 삽입 순서만 적지 않고 어떤 끝에서 제거하는지 표시했다. 비어 있는 경우도 생각했다.

> 2021~2023년 정보처리기사 학습 범위의 개념을 정리한 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

스택은 LIFO, 큐는 FIFO 성질을 가진다. Python 리스트의 append·pop은 단순 스택으로 쓸 수 있고 deque의 append·popleft는 큐를 표현할 수 있다. 추상 동작과 실제 구현의 시간 비용은 구분한다. 우선순위 큐는 FIFO 큐와 다른 계약이다.

## 예제 문제 · 창작

1·2·3을 차례로 넣고 한 번 꺼낸다. 스택과 큐가 각각 내보내는 값은 무엇인가?

## 풀이와 판단 근거

스택은 3, 큐는 1이다. 아래 예제에서는 두 구조에 같은 입력을 별도로 넣는다. 꺼낸 뒤 남은 순서도 추적할 수 있다. 실제 병원 대기 순서 같은 업무 정책을 단순 자료구조 성질로 결정하지 않고 알고리즘 문제의 가정 안에서 해석한다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```python
from collections import deque

stack = []
queue = deque()
for value in [1, 2, 3]:
    stack.append(value)
    queue.append(value)
print(stack.pop())
print(queue.popleft())
```
{% endraw %}

## 실행 결과

```text
3
1
```

## 헷갈린 부분과 주의점

빈 구조에서 제거하면 예외가 날 수 있다. 파이썬 list.pop(0)으로 큐를 흉내 낼 때의 이동 비용도 고려한다.

## 복습 문제

두 번 꺼낸 스택에서 마지막으로 꺼낸 값은?

**풀이:** 3 다음 2를 꺼내므로 2다.

## 참고한 문서

[개념·API의 원문 자료](https://docs.python.org/3.9/library/collections.html#collections.deque)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/information-processing/26-python-defaults/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/information-processing/28-binary-search/' | relative_url }})
