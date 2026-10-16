---
layout: content
title: "[Spring 공부 04] 싱글턴 Bean과 요청별 상태"
date: 2020-10-08 09:00:00 +0900
categories: [Spring2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 44
study_unit: 6
permalink: /study/2020/spring/04-singleton/
---

싱글턴 Bean과 요청별 상태을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11·Spring Boot 2.3.4.RELEASE·Spring Framework 5.2.9.RELEASE 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

기본 Bean 범위는 컨테이너별 singleton이다. 같은 컨테이너에서 반복 조회하면 같은 객체를 받는다. 서버 전체나 여러 JVM을 통틀어 단 하나라는 의미는 아니다.

## 따라 해 보기

목차의 Maven 프로젝트에서 아래 전체를 UTF-8 src/test/java/StudyTest.java에 넣고 mvn -Dtest=StudyTest test로 실행한다. 글마다 파일을 교체하고 이전 예제를 덧붙이지 않는다.

{% raw %}
```java
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.*;

import java.util.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.*;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.bind.annotation.*;

public class StudyTest {

  @Test
  void study() throws Exception {
    try (
      AnnotationConfigApplicationContext c = new AnnotationConfigApplicationContext(
        Config.class
      )
    ) {
      assertSame(c.getBean(Box.class), c.getBean(Box.class));
    }
  }

  static class Box {}

  @Configuration
  static class Config {

    @Bean
    Box box() {
      return new Box();
    }
  }
}
```
{% endraw %}

## 확인 결과

StudyTest의 검사 1개가 실패 없이 통과해야 한다. 아래 해설의 값·상태·예외를 assertion으로 확인한다. HTTP 예제는 MockMvc를 사용하므로 실제 서버 포트를 열지 않는다.

## 코드를 따라 읽기

같은 컨테이너에서 조회한 Box 참조를 assertSame으로 비교한다. equals 비교가 아니라 동일 객체 여부를 확인한다. 여러 요청이 공유할 수 있어 변경 가능한 요청별 데이터를 필드에 보관하지 않는다.

## 헷갈린 부분과 주의점

싱글턴 Bean이라는 사실만으로 메서드가 스레드 안전해지는 것은 아니다. 공유 가변 상태를 검토한다.

## 복습 문제

컨테이너를 두 개 만들면 같은 객체를 보장할까?

**풀이:** 아니다. singleton 범위는 각 컨테이너를 기준으로 한다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/javadoc-api/org/springframework/beans/factory/config/ConfigurableBeanFactory.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Spring 공부 03] 동일 타입 Bean과 Qualifier](/study/2020/spring/03-qualifier/) · [다음: [Spring 공부 05] prototype Bean과 생성 시점](/study/2020/spring/05-prototype/)
