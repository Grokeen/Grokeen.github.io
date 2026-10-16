---
layout: content
title: "[Spring 공부 03] 동일 타입 Bean과 Qualifier"
date: 2020-10-05 09:00:00 +0900
categories: [Spring2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 43
study_unit: 6
permalink: /study/2020/spring/03-qualifier/
---

동일 타입 Bean과 Qualifier을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11·Spring Boot 2.3.4.RELEASE·Spring Framework 5.2.9.RELEASE 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

같은 타입 Bean이 여러 개면 타입만으로는 선택이 모호할 수 있다. @Qualifier로 의도를 지정하거나 기본 후보가 명확할 때 @Primary를 사용한다. 이름을 바꾸면 참조 지점도 함께 확인한다.

## 따라 해 보기

목차의 Maven 프로젝트에서 아래 전체를 UTF-8 src/test/java/StudyTest.java에 넣고 mvn -Dtest=StudyTest test로 실행한다. 글마다 파일을 교체하고 이전 예제를 덧붙이지 않는다.

{% raw %}
```java
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import org.springframework.context.annotation.*;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import java.util.*;

public class StudyTest {
  @Test
  void study() throws Exception {
    try(AnnotationConfigApplicationContext c=new AnnotationConfigApplicationContext(Config.class)){
     assertEquals("fast",c.getBean(Choice.class).value);
    }
  }
    static class Choice {final String value;Choice(String v){value=v;}}
    @Configuration static class Config {@Bean String slow(){return "slow";}@Bean String fast(){return "fast";}@Bean Choice choice(@Qualifier("fast") String v){return new Choice(v);}}
}
```
{% endraw %}

## 확인 결과

StudyTest의 검사 1개가 실패 없이 통과해야 한다. 아래 해설의 값·상태·예외를 assertion으로 확인한다. HTTP 예제는 MockMvc를 사용하므로 실제 서버 포트를 열지 않는다.

## 코드를 따라 읽기

문자열 Bean 두 개 중 fast라는 qualifier를 가진 값을 Choice에 주입한다. Bean 이름과 업무 역할이 드러나도록 설정했다. 단순히 등록 순서에 의존하지 않는다.

## 헷갈린 부분과 주의점

같은 타입이 둘인데 임의로 첫 객체가 선택될 것이라 가정하지 않는다. qualifier와 primary의 목적을 구분한다.

## 복습 문제

qualifier를 빼면 어떤 문제가 생길 수 있을까?

**풀이:** 단일 후보를 정할 수 없어 의존관계 주입이 실패할 수 있다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/javadoc-api/org/springframework/beans/factory/annotation/Qualifier.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Spring 공부 02] 생성자 주입으로 필수 의존관계 표현하기](/study/2020/spring/02-constructor-injection/) · [다음: [Spring 공부 04] 싱글턴 Bean과 요청별 상태](/study/2020/spring/04-singleton/)
