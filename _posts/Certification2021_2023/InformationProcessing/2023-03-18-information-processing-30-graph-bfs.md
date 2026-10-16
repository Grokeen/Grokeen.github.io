---
layout: content
title: "[정보처리기사 30] BFS의 방문 표시와 큐"
date: 2023-03-18 09:00:00 +0900
categories: [InformationProcessingCertification]
tags: [자격증학습, 정보처리기사]
series: study-certifications-2021-2023
study_track: information-processing
study_order: 30
study_unit: 6
permalink: /study/certifications/2021-2023/information-processing/30-graph-bfs/
---

같은 정점을 여러 번 큐에 넣지 않도록 발견할 때 표시했다. 방문 순서는 인접 목록의 순서에 영향을 받았다.

> 2021~2023년 정보처리기사 학습 범위의 개념을 정리한 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

너비 우선 탐색은 시작점 가까운 간선 거리부터 정점을 방문한다. 인접 목록과 적절한 방문 집합을 쓰면 O(V+E)로 설명할 수 있다. 무가중치 그래프에서 최소 간선 수 경로에 활용하지만 가중치가 다른 최단 비용 경로에 그대로 적용하지 않는다. 방문 순서의 유일성은 인접 순서 계약을 확인한다.

## 예제 문제 · 창작

A의 인접 순서는 B,C이고 B와 C가 각각 D로 연결된다. A에서 아래 BFS를 시작할 때 출력 순서는?

## 풀이와 판단 근거

A B C D다. D는 B를 처리할 때 발견되어 방문 표시되고 C에서 다시 넣지 않는다. 방문을 큐에서 꺼낼 때만 표시하면 중복 삽입이 생길 수 있다. 방향 그래프라면 나가는 간선만 따라가며, 연결되지 않은 정점 전체 순회는 시작점을 추가로 선택해야 한다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```python
from collections import deque

graph = {"A": ["B", "C"], "B": ["D"], "C": ["D"], "D": []}
queue = deque(["A"])
visited = {"A"}
order = []
while queue:
    node = queue.popleft()
    order.append(node)
    for neighbor in graph[node]:
        if neighbor not in visited:
            visited.add(neighbor)
            queue.append(neighbor)
print(" ".join(order))
```
{% endraw %}

## 실행 결과

```text
A B C D
```

## 헷갈린 부분과 주의점

BFS가 모든 그래프의 가중 최단 경로를 보장한다고 외우지 않는다. 탐색 순서와 최단 경로 복원 정보도 구별한다.

## 복습 문제

C를 B보다 먼저 인접 목록에 두면 순서가 달라질까?

**풀이:** 가능하다. 같은 거리의 방문 순서는 인접 목록 순서에 영향을 받는다.

## 참고한 문서

[개념·API의 원문 자료](https://www.nist.gov/dads/HTML/breadthfirst.html)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/information-processing/29-sorting-cost/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/information-processing/31-process-thread/' | relative_url }})
