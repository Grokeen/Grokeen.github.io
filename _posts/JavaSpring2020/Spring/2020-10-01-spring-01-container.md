---
layout: content
title: "[Spring 공부 01] Spring 컨테이너와 Bean 조회"
date: 2020-10-01 09:00:00 +0900
categories: [Spring2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 41
study_unit: 6
permalink: /study/2020/spring/01-container/
---

Spring 컨테이너와 Bean 조회을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11·Spring Boot 2.3.4.RELEASE·Spring Framework 5.2.9.RELEASE 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

Spring 컨테이너는 등록된 객체를 만들고 의존관계와 생명주기를 관리한다. AnnotationConfigApplicationContext로 작은 설정만 올리면 웹 서버 없이도 Bean 등록 개념을 확인할 수 있다.

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
     assertEquals("hello",c.getBean(String.class));
    }
  }
    @Configuration static class Config {@Bean String greeting(){return "hello";}}
}
```
{% endraw %}

## 확인 결과

StudyTest의 검사 1개가 실패 없이 통과해야 한다. 아래 해설의 값·상태·예외를 assertion으로 확인한다. HTTP 예제는 MockMvc를 사용하므로 실제 서버 포트를 열지 않는다.

## 코드를 따라 읽기

@Configuration 클래스의 @Bean 메서드가 String 객체를 등록한다. 타입으로 조회한 결과가 hello인지 검증한다. 컨텍스트를 try 블록으로 닫아 자원을 정리한다.

## 헷갈린 부분과 주의점

모든 new 객체가 자동으로 Spring Bean이 되는 것은 아니다. 등록 대상과 컨테이너가 관리하는 범위를 구분한다.

## 복습 문제

getBean에 없는 타입을 요청하면?

**풀이:** 해당 Bean을 찾을 수 없다는 예외가 발생한다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/javadoc-api/org/springframework/context/annotation/AnnotationConfigApplicationContext.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Java 공부 40] 종합 실습: 가상 주문 검증·집계](/study/2020/java/40-mini-project/) · [다음: [Spring 공부 02] 생성자 주입으로 필수 의존관계 표현하기](/study/2020/spring/02-constructor-injection/)
