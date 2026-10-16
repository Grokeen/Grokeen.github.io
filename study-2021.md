---
layout: content
title: "2021 파이썬·라즈베리파이 학습 노트"
permalink: /study/2021/
---

기초 문법을 익힌 뒤 작은 장치 프로그램으로 이어 가는 **108편의 학습 노트**다. 각 글에는 개념 설명, 따라 할 예제, 결과 또는 확인 방법, 코드 해설, 주의점, 복습 문제와 풀이를 담았다.

2021년 날짜로 재구성한 학습 노트이며, 장비 예제는 준비 사항과 예상 동작을 기준으로 설명한다. 먼저 파이썬을 익히고 라즈베리파이에서 리눅스 명령과 GPIO 제어에 적용하는 순서로 읽으면 된다. 이미 아는 내용은 아래 목차에서 골라 읽을 수 있다.

| 과정 | 글 수 | 범위 |
| --- | ---: | --- |
| 파이썬 | 72 | 기본 문법, 자료구조, 함수, 파일, 표준 라이브러리, 객체, 검사와 종합 실습 |
| 라즈베리파이 | 36 | 리눅스, 원격 접속, GPIO, 버튼·LED·센서, 통신, 기록, 실행 관리 |

파이썬 예제는 Python 3.9 기준이다. 라즈베리파이 예제는 Raspberry Pi 3/4의 40핀 헤더, Raspberry Pi OS Buster, Python 3.7 이상 문법, GPIO Zero 1.6.2 API를 기준으로 한다. 최신 장비와 OS에서는 설치 방법이나 제공 인터페이스가 달라질 수 있다. 라즈베리파이는 별도 프로그래밍 언어가 아니므로 셸 명령·설정 파일·파이썬 코드를 각 글에서 구분한다.

장비가 없는 독자는 파이썬 72편과 모의 데이터 실습부터 실행할 수 있다. 회로 예제는 전원을 끈 상태로 배선하고, BCM 번호·물리 핀 번호·3.3V 신호 범위를 확인한다. 실제 센서의 수치와 반응은 장비에서 별도로 확인해야 한다.

{% assign lessons = site.posts | where: 'series', 'study-2021' | sort: 'study_order' %}
{% assign chapters = '1|파이썬 기초와 문자열;2|자료구조와 반복 시작;3|반복문 응용과 함수;4|예외·모듈·파일 데이터;5|표준 라이브러리와 객체;6|객체 설계·검사·종합 실습;7|라즈베리파이 환경과 리눅스;8|GPIO와 입출력 제어;9|센서·통신과 데이터 기록;10|데이터 처리와 실행 관리' | split: ';' %}

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

각 게시글 끝의 이전 학습·다음 학습 링크로 순서대로 이동하거나 이 목차로 돌아올 수 있다.
