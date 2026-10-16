---
layout: content
title: "2024 백준 공부: 기존 글 정리와 추가 100문제"
permalink: /study/2024/baekjoon/
---

2024년 1~6월의 기존 문제 글 10편을 설명·풀이·정당성·자체 예제로 정리하고, **기존 문제와 겹치지 않는 실버·골드권 추가 100문제**를 별도로 구성했다. 기존 10편에는 기초 브론즈 문제 2개도 포함된다. 날짜는 공부 순서로 재구성한 자료다.

[기업 코딩테스트 빈출 유형·공개 기출 문제집](/study/company-coding/)은 이 100문제에 포함하지 않는 별도 과정이다.

<h2 id="source">원문 접근 상태와 실행 범위</h2>

2026년 10월 16일 확인 당시 [백준 공식 홈페이지](https://www.acmicpc.net/)는 채점 서비스 준비 안내를 표시하고 문제 주소는 404를 반환했다. solved.ac API도 접근 제한으로 현재 등급을 조회하지 못했다. Silver·Gold 표시는 연습 대상의 난도 범위를 나타내며 현재의 세부 등급을 검증한 목록은 아니다. 원래 문제 번호와 주소를 보존하고 원문 전체를 복제하지 않았다.

각 글의 예제는 직접 구성했다. **Java 11로 컴파일하고 자체 입력의 기대 출력을 대조했으며 온라인 제출의 정답·시간 제한 통과를 뜻하지 않는다.** 공식 채점이 가능해지면 해당 원문 조건과 최신 실행 환경도 확인한다.

```bash
javac --release 11 -encoding UTF-8 Main.java
java -Dfile.encoding=UTF-8 Main
```

각 글의 전체 코드를 UTF-8 `Main.java` 하나로 저장한다. 서로 다른 글의 코드를 한 파일에 덧붙이지 않는다. 복잡도의 변수 의미와 입력 조건, 정당성 설명을 먼저 읽고 직접 예제 결과를 예측해 본다.

{% assign lessons = site.posts | where: 'series', 'baekjoon-2024' | sort: 'study_order' %}

## 기존 글 다시 읽기: 10문제

<ul class="study-chapter">
{% assign existing = lessons | where: 'coding_group', 'existing' %}
{% for lesson in existing %}
<li><a data-study-post href="{{ lesson.url | relative_url }}">{{ lesson.title | escape }}</a> <small>{{ lesson.date | date: '%Y.%m.%d' }}</small></li>
{% endfor %}
</ul>

[백준 풀이를 GitHub에 정리하는 방법](/github/백준과깃허브연동/)도 기존 주소에서 다시 정리했다.

## 추가 100문제

{% assign chapters = '1|정렬·집합·해시;2|스택·큐·힙;3|이분 탐색·투 포인터;4|누적합·분할 정복;5|탐욕법·스케줄링;6|그래프·최단 거리 BFS;7|격자·동시 갱신·위험 회피;8|동적 계획법;9|최단 경로·MST·DSU·위상 정렬;10|순열·조합·백트래킹' | split: ';' %}
{% for chapter in chapters %}
{% assign parts = chapter | split: '|' %}
{% assign unit = parts[0] | plus: 0 %}
<h3>{{ parts[1] }}</h3>
<ul class="study-chapter">
{% assign entries = lessons | where: 'study_unit', unit %}
{% for lesson in entries %}
<li><a data-study-post href="{{ lesson.url | relative_url }}">{{ lesson.title | escape }}</a> <small>{{ lesson.date | date: '%Y.%m.%d' }}</small></li>
{% endfor %}
</ul>
{% endfor %}
