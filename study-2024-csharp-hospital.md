---
layout: content
title: "2024 C#·병원 업무 학습 노트"
permalink: /study/2024/csharp-hospital/
---

**2024년 5월부터 12월까지의 날짜로 구성한 80편의 학습 노트**다. C# 48편에서 문법과 표준 API를 익히고, 병원 업무 32편에서 접수·예약·바코드·문서·데이터 처리에 적용한다. 각 글에는 설명, 실행 가능한 예제, 결과, 코드 해설, 주의점, 복습 문제와 풀이를 담았다.

학습 날짜를 재구성한 자료이며, 병원 업무는 **가상 자료를 사용한 전산·업무 자동화 모델**이다. 기관별 업무 규정과 실제 의료 시스템의 전체 계약은 별도로 확인해야 한다. 임의 가격·상태·코드는 각 예제의 가정으로 표시한다.

## 실행 준비

2024년에 사용할 수 있었던 **C# 12·.NET 8**을 기준으로 한다. 각 예제는 외부 패키지 없이 콘솔 프로젝트에서 실행한다. `dotnet --version`으로 SDK를 확인한다. 실행용 런타임만 설치한 환경에는 SDK가 추가로 필요하다.

```bash
dotnet new console -n Study
cd Study
```

생성된 `Program.cs`를 해당 글의 C# 코드 전체로 교체하고 `dotnet run`으로 실행한다. 기본 콘솔 프로젝트의 implicit usings와 nullable 설정을 사용한다. 여러 글의 코드를 한 파일에 계속 덧붙이지 않는다. `// 예제용 형식` 아래의 클래스·record 선언도 함께 복사한다.

숫자·날짜 표시가 환경에 따라 달라질 수 있다. 외부 계약 형식은 해당 코드에서 문화권을 명시하며, 검증에서는 문화권을 고정해 결과를 대조한다. HTTP·DB·장비 연동을 설명하는 글도 실제 병원 서버에 접속하지 않는 모의 예제를 사용한다.

{% assign lessons = site.posts | where: 'series', 'study-2024-csharp-hospital' | sort: 'study_order' %}
{% assign chapters = '1|C# 시작·자료형·조건·반복;2|컬렉션·함수·nullable;3|튜플·enum·객체 설계;4|제네릭·이벤트·예외·LINQ;5|LINQ 응용·날짜·파일 데이터;6|비동기·동시성·HTTP·종합 실습;7|병원 업무·식별자·예약·접수;8|요청·바코드·검체·결과·문서;9|OCR·RPA·표·수납;10|집계·권한·감사·복구·연동' | split: ';' %}

## 과정별 바로 가기

<ul>
{% for chapter in chapters %}
{% assign parts = chapter | split: '|' %}
<li><a href="#unit-{{ parts[0] }}">{{ parts[1] }}</a></li>
{% endfor %}
</ul>

{% for chapter in chapters %}
{% assign parts = chapter | split: '|' %}
{% assign unit = parts[0] | plus: 0 %}
{% assign entries = lessons | where: 'study_unit', unit %}
<h2 id="unit-{{ unit }}">{{ parts[1] }}</h2>
<ul class="study-chapter">
{% for lesson in entries %}
<li><a data-study-post href="{{ lesson.url | relative_url }}">{{ lesson.title | escape }}</a> <small>({{ lesson.date | date: '%Y.%m.%d' }})</small></li>
{% endfor %}
</ul>
{% endfor %}

각 글의 앞뒤 학습 링크로 순서대로 읽거나 이 목차에서 개념을 선택할 수 있다.
