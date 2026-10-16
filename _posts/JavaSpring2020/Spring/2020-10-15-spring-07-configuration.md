---
layout: content
title: "[Spring 공부 07] Configuration의 Bean 메서드 호출"
date: 2020-10-15 09:00:00 +0900
categories: [Spring2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 47
study_unit: 6
permalink: /study/2020/spring/07-configuration/
---

Configuration의 Bean 메서드 호출을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11·Spring Boot 2.3.4.RELEASE·Spring Framework 5.2.9.RELEASE 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

기본 @Configuration은 Bean 메서드 간 호출도 컨테이너의 singleton 관리와 연결한다. 단순 Java 설정 객체를 new로 만든 경우와 Spring이 관리하는 설정을 구분해야 한다.

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
     assertSame(c.getBean(Box.class),c.getBean(Holder.class).box);
    }
  }
    static class Box {}
    static class Holder {final Box box;Holder(Box box){this.box=box;}}
    @Configuration static class Config {@Bean Box box(){return new Box();}@Bean Holder holder(){return new Holder(box());}}
}
```
{% endraw %}

## 확인 결과

StudyTest의 검사 1개가 실패 없이 통과해야 한다. 아래 해설의 값·상태·예외를 assertion으로 확인한다. HTTP 예제는 MockMvc를 사용하므로 실제 서버 포트를 열지 않는다.

## 코드를 따라 읽기

holder 메서드 안에서 box를 호출했지만 관리되는 설정에서는 등록된 singleton Box를 사용한다. 예제는 기본 proxyBeanMethods=true인 설정을 기준으로 한다.

## 헷갈린 부분과 주의점

proxyBeanMethods=false나 일반 @Component의 @Bean 메서드에서는 같은 호출 의미가 달라질 수 있다. 가능하면 메서드 인자 주입도 검토한다.

## 복습 문제

Config를 직접 new한 뒤 box를 두 번 호출하면?

**풀이:** 일반 Java 메서드 호출이므로 새 객체가 만들어질 수 있다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/javadoc-api/org/springframework/context/annotation/Configuration.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Spring 공부 06] Bean 초기화·종료 콜백](/study/2020/spring/06-lifecycle/) · [다음: [Spring 공부 08] Import로 설정을 조합하기](/study/2020/spring/08-import/)
