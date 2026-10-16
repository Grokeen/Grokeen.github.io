---
layout: content
title: "2021~2023 정보처리기사·빅데이터분석기사 개념 노트"
permalink: /study/certifications/2021-2023/
---

**정보처리기사 40편과 빅데이터분석기사 32편, 총 72편**의 개념별 학습 노트다. 정의만 외우지 않도록 문제의 전제, 예시, 풀이, 주의점과 복습 질문을 함께 적었다. 날짜는 2021~2023년의 학습 흐름으로 재구성했다.

모든 문제는 **직접 만든 창작 연습문제**이며 실제 기출 연도·회차를 붙이지 않았다. 공식 출제기준에 포함된 주요 개념을 학습하는 자료로, 출제기준의 모든 세부 항목을 빠짐없이 대체하는 교재는 아니다.

## 학습 범위와 실행 준비

정보처리기사는 [Q-Net 2020~2022 출제기준](https://q-net.or.kr/cst006.do?id=cst00602&gSite=Q&gId=&artlSeq=5205254&brdId=Q006&code=1202)과 [2023~2025 출제기준](https://q-net.or.kr/cst006.do?artlSeq=5210765&brdId=Q006&gSite=Q&id=cst00602)을, 빅데이터분석기사는 [한국데이터산업진흥원 2022 안내 자료](https://www.dataq.or.kr/www/dataq_brochure_2022.pdf)의 기획·탐색·모델링·결과 해석 범위를 참고했다. 현재 시험 운영·패키지 환경을 과거와 같다고 가정하지 않는다.

Python 예제는 **Python 3.9**, NumPy 1.20.3, pandas 1.2.5, SciPy 1.6.3, scikit-learn 0.24.2 기준이다. 이 API들이 제공되던 2021년 7월 이후 날짜에 빅데이터 실습을 배치했다. 과거 문법을 재현하려면 별도 환경을 사용한다.

```bash
python -m venv .venv-cert
# Windows: .venv-cert\Scripts\activate
# macOS/Linux: source .venv-cert/bin/activate
python -m pip install numpy==1.20.3 pandas==1.2.5 scipy==1.6.3 scikit-learn==0.24.2
python example.py
```

각 글의 Python 코드를 example.py로 저장한다. SQL은 SQLite의 WITH·VALUES를 이용해 자료까지 함께 만드는 읽기 전용 예제다. C11·Java 8 코드는 별도 파일로 컴파일하거나 흐름을 추적하며, 해당 글에 예상 출력을 구분해 적었다. 모든 실습은 가상 자료만 사용한다.

{% assign lessons = site.posts | where: 'series', 'study-certifications-2021-2023' | sort: 'study_order' %}
{% assign chapters = '1|요구사항·설계;2|패턴·테스트·형상 관리;3|관계형 데이터 모델;4|SQL·트랜잭션·인덱스;5|C·Java·재귀;6|Python·자료구조·알고리즘;7|운영체제·네트워크 계층;8|주소·프로토콜·보안;9|빅데이터 기획·전처리;10|검증 설계·기초통계;11|추론·검정·회귀;12|모델링·평가·제출 실습' | split: ';' %}

## 개념별 목차

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
