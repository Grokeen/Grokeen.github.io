---
layout: content
title: "2022 지방세 개념 학습 노트 120편"
permalink: /study/2022/local-tax/
---

**2022년 1월부터 12월까지 120편**으로 구성한 지방세 개념 노트다. 과세요건부터 취득세·등록면허세·재산세·자동차세·주민세·지방소득세, 소비 관련 세목과 목적세, 감면·권리구제까지 나누어 공부한다. 각 글에 설명, 창작 사례, 풀이, 주의점, 복습 질문과 당시 법령 링크를 담았다.

## 기준 시점과 읽는 방법

**2022년 1월 1일에 적용되는 규정을 공통 기준으로 재구성했다.** 게시 날짜는 공부 순서를 나타내며 각 날짜의 연중 개정사항을 모두 반영한 실시간 세무 안내가 아니다. 예를 들어 공정시장가액비율 글은 2022년 초 기준을 설명하며, 이후 1주택 등에 대한 변경을 모든 2022년 고지에 같은 비율로 적용한다고 가정하지 않는다.

사건에 적용할 때는 취득일·과세기준일·귀속연도 등 법정 시점과 부칙의 시행일·적용례·경과조치를 함께 확인한다. 지방소비세는 본문의 25.3%만 읽지 않고 **2022년 부칙 특례 23.7%**를 구분해 설명했다. 2022년 발표된 개정안을 이미 시행한 규정으로 제시하지 않는다.

주요 원문은 국가법령정보센터의 [지방세기본법](https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=238259&efYd=20220101&ancYnChk=0&chrClsCd=010202), [지방세법](https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=238261&efYd=20220101&ancYnChk=0&chrClsCd=010202), [지방세법 시행령](https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=238943&efYd=20220101&ancYnChk=0&chrClsCd=010202), [지방세특례제한법](https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=238265&efYd=20220101&ancYnChk=0&chrClsCd=010202), [당시 적용 지방세징수법](https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=224907&efYd=20210101&ancYnChk=0&chrClsCd=010202)이다. 지역별 세액·탄력세율·공제액은 같은 시점의 조례를 추가 확인한다.

계산 문제는 과세표준·대상·세율 적용 조건을 이미 확정한 가정과 실제 판단이 필요한 부분을 구분했다. 본세만 계산한 결과에 부가 세목·가산세·수수료가 모두 들어 있다고 보지 않는다. 개인의 실제 납세 자료를 사용하지 않는다.

{% assign lessons = site.posts | where: 'series', 'study-local-tax-2022' | sort: 'study_order' %}
{% assign chapters = '1|지방세의 구조와 계산 용어;2|공통 원칙·기간·신고 절차;3|취득세 대상·시기·과세표준;4|주택·증여·상속·간주취득;5|등록면허세 등록분·면허분;6|재산세 과세·고지·상한;7|자동차세 배기량·차령·연납;8|주민세 개인분·사업소분·종업원분;9|지방소득세 개인·법인·특별징수;10|소비 관련 세목과 목적세;11|감면·유지 요건·추징·공제;12|신고 보완·환급·분납·권리구제' | split: ';' %}

## 월별 개념 목차

{% for chapter in chapters %}
{% assign parts = chapter | split: '|' %}
{% assign unit = parts[0] | plus: 0 %}
{% assign entries = lessons | where: 'study_unit', unit %}
<h2 id="unit-{{ unit }}">{{ unit }}월 · {{ parts[1] }}</h2>
<ul class="study-chapter">
{% for lesson in entries %}
<li><a data-study-post href="{{ lesson.url | relative_url }}">{{ lesson.title | escape }}</a> <small>({{ lesson.date | date: '%Y.%m.%d' }})</small></li>
{% endfor %}
</ul>
{% endfor %}
