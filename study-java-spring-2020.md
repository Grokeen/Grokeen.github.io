---
layout: content
title: "2020 Java·Spring 웹 개발 학습 노트 80편"
permalink: /study/2020/java-spring/
---

Java 40편과 Spring 40편을 개념별로 정리했다. 각 글은 설명·전체 예제·확인 결과·해설·주의점·복습 문제와 풀이·공식 문서를 포함한다. 날짜는 공부 순서로 재구성한 학습 자료이며 실제 수강·근무 이력을 뜻하지 않는다.

Java 11을 기준으로 한다. Spring은 2020년 9월에 사용할 수 있었던 **Spring Boot 2.3.4.RELEASE·Spring Framework 5.2.9.RELEASE**를 사용하고 해당 글은 10~12월에 배치했다. Java record·최신 switch 표현식·Boot 3의 jakarta 패키지를 섞지 않는다.

<h2 id="run">실행 준비</h2>

Java 글은 UTF-8 `Main.java` 한 파일이다. JDK 11에서 다음 명령으로 실행한다.

```bash
javac --release 11 -encoding UTF-8 Main.java
java -Dfile.encoding=UTF-8 Main
```

Spring 글은 JUnit 5 검사 예제로 웹 서버 포트를 열지 않는다. 각 글의 전체 코드를 `src/test/java/StudyTest.java`에 넣는다. 이전 글의 코드를 덧붙이지 않고 교체한다. 저장소의 [`_examples/java-spring-2020/pom.xml`](https://github.com/Grokeen/Grokeen.github.io/blob/main/_examples/java-spring-2020/pom.xml)을 프로젝트 루트에 복사한다. JDK 11과 Maven 3.6.3에서 확인하는 구성이다.

```text
study/
  pom.xml
  src/test/java/StudyTest.java
```

```bash
mvn -Dtest=StudyTest test
```

`Tests run: 1, Failures: 0, Errors: 0`으로 끝나야 한다. 의존성 최초 다운로드에는 인터넷이 필요하다. JDBC 글은 테스트 전용 인메모리 H2만 사용한다. 역사적 버전 학습용 프로젝트이므로 이 설정을 현재 운영 서비스의 배포 설정으로 사용하지 않는다.

{% assign lessons = site.posts | where: 'series', 'java-spring-2020' | sort: 'study_order' %}
{% assign chapters = '1|Java 실행·값·문자열·반복;2|배열·메서드·객체 설계;3|제네릭·컬렉션·정렬;4|예외·자원·함수·스트림;5|집계·날짜·문자·동시성·종합;6|Spring 컨테이너·주입·범위·설정;7|속성·프로필·이벤트·검증;8|MVC 요청·JSON·상태·오류;9|헤더·필터·계층·테스트;10|페이지·JDBC·트랜잭션·종합' | split: ';' %}

{% for chapter in chapters %}
{% assign parts = chapter | split: '|' %}
{% assign unit = parts[0] | plus: 0 %}
<h2>{{ parts[1] }}</h2>
<ul class="study-chapter">
{% assign entries = lessons | where: 'study_unit', unit %}
{% for lesson in entries %}
<li><a data-study-post href="{{ lesson.url | relative_url }}">{{ lesson.title | escape }}</a> <small>{{ lesson.date | date: '%Y.%m.%d' }}</small></li>
{% endfor %}
</ul>
{% endfor %}
