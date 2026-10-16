---
layout: content
title: "2024 C#·병원 업무 학습 노트"
permalink: /study/2024/csharp-hospital/
---

**2024년 5월부터 12월까지의 날짜로 구성한 80편의 학습 노트**다. C# 48편에는 문법·실행 예제·결과·해설을, 병원 원무·행정 32편에는 접수·예약·입퇴원·수납·기록 발급 절차와 가상 사례·풀이를 담았다. 각 글에서 주의점과 복습 문제도 확인할 수 있다.

학습 날짜를 재구성한 자료이며, 병원 글은 **가상 병원의 원무·행정 절차 공부**다. 실제 근무 경험을 주장하지 않는다. 제도는 각 글에 표시한 2024년 기준을 확인하고, 기관별 안내는 일반적인 흐름을 이해하는 참고로 사용한다. 실제 적용 시 해당 시점 법령과 기관 규정을 확인한다. 예제의 금액은 산술 연습용 가정이다.

## 실행 준비

2024년에 사용할 수 있었던 **C# 12·.NET 8**을 기준으로 한다. 각 예제는 외부 패키지 없이 콘솔 프로젝트에서 실행한다. `dotnet --version`으로 SDK를 확인한다. 실행용 런타임만 설치한 환경에는 SDK가 추가로 필요하다.

```bash
dotnet new console -n Study
cd Study
```

생성된 `Program.cs`를 해당 글의 C# 코드 전체로 교체하고 `dotnet run`으로 실행한다. 기본 콘솔 프로젝트의 implicit usings와 nullable 설정을 사용한다. 여러 글의 코드를 한 파일에 계속 덧붙이지 않는다. `// 예제용 형식` 아래의 클래스·record 선언도 함께 복사한다.

숫자·날짜 표시가 환경에 따라 달라질 수 있다. 외부 계약 형식은 해당 코드에서 문화권을 명시하며, 검증에서는 문화권을 고정해 결과를 대조한다. HTTP·DB·장비 연동을 설명하는 글도 실제 병원 서버에 접속하지 않는 모의 예제를 사용한다.

{% assign lessons = site.posts | where: 'series', 'study-2024-csharp-hospital' | sort: 'study_order' %}
{% assign chapters = '1|C# 시작·자료형·조건·반복;2|컬렉션·함수·nullable;3|튜플·enum·객체 설계;4|제네릭·이벤트·예외·LINQ;5|LINQ 응용·날짜·파일 데이터;6|비동기·동시성·HTTP·종합 실습;7|외래 접수·본인 확인·예약·의뢰;8|자격·입원·퇴원·진료비;9|수납·환불·증명서·기록 신청;10|특수 신청·정보 보호·보관·민원·마감' | split: ';' %}

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
