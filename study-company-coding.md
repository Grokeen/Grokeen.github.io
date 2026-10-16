---
layout: content
title: "기업 코딩테스트 대비: 빈출 유형과 공개 기출 36문제"
permalink: /study/company-coding/
---

[백준 추가 100문제](/study/2024/baekjoon/)에 포함하지 않은 **별도 36편**이다. 프로그래머스 공식 고득점 Kit의 유형별 문제 32개와 공식 원문에 카카오 출제 분류가 표시된 공개 문제 4개를 정리했다. 등급 제한 없이 접근 방식·정당성·Java 전체 코드·자체 예제·복잡도·주의점을 담았다.

[프로그래머스 공식 고득점 Kit](https://school.programmers.co.kr/learn/challenges?tab=algorithm_practice_kit)는 자사 테스트 결과를 바탕으로 반복되는 유형과 오답 유형을 모은 자료라고 설명한다. 여기서 이를 기업 대비 학습 기준으로 사용했다. 특정 회사에서 각 문제가 몇 번 나왔다는 통계를 만들거나 모든 문제를 기업 기출로 표시하지 않는다.

| 공식 유형 안내의 빈도 표기 | 유형 |
| --- | --- |
| 높음 | 해시, 정렬, 완전 탐색, DFS/BFS |
| 보통 | 스택/큐, 힙 |
| 낮음 | 탐욕법, 동적 계획법, 이분 탐색, 그래프 |

위 표는 **2026년 10월 16일 공식 Kit의 유형 단위 안내**이며 개별 문제의 실제 출제 빈도는 아니다. 낮음으로 분류된 유형도 기본기 보완을 위해 포함했다. 해시·정렬·탐색부터 풀고 취약한 유형을 보완하는 순서로 사용할 수 있다.

## 실행 방법과 원문 기준

각 글의 전체 코드를 UTF-8 `Main.java`에 넣는다. 로컬 `main`에 있는 자체 예제를 실행하고 기대 출력과 비교한다. 공식 플랫폼 제출은 imports와 `Solution` 클래스만 사용한다.

```bash
javac --release 11 -encoding UTF-8 Main.java
java -Dfile.encoding=UTF-8 Main
```

예제는 Java 11로 컴파일·실행해 확인했으며 온라인 제출 기록은 아니다. 조건은 확인일의 공식 원문을 기준으로 한다. 예를 들어 디스크 컨트롤러는 2024-11-14 개정된 우선순위 규칙을 다루므로 이를 2024년 상반기 문제 조건으로 표시하지 않았다.

{% assign lessons = site.posts | where: 'series', 'company-coding' | sort: 'study_order' %}
{% assign chapters = '1|해시·빈도·다중 정렬;2|스택·큐·이벤트;3|힙·정렬 Map;4|정렬·순서 통계;5|완전 탐색;6|탐욕법;7|동적 계획법;8|이분 탐색;9|DFS/BFS·경로 구성;10|그래프·순위;11|카카오 공개 기출 4문제' | split: ';' %}

{% for chapter in chapters %}
{% assign parts = chapter | split: '|' %}
{% assign unit = parts[0] | plus: 0 %}
<h2>{{ parts[1] }}</h2>
<ul class="study-chapter">
{% assign entries = lessons | where: 'study_unit', unit %}
{% for lesson in entries %}
<li><a data-study-post href="{{ lesson.url | relative_url }}">{{ lesson.title | escape }}</a></li>
{% endfor %}
</ul>
{% endfor %}
