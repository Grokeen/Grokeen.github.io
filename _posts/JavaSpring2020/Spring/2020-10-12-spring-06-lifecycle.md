---
layout: content
title: "[Spring 공부 06] Bean 초기화·종료 콜백"
date: 2020-10-12 09:00:00 +0900
categories: [Spring2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 46
study_unit: 6
permalink: /study/2020/spring/06-lifecycle/
---

Bean 초기화·종료 콜백을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11·Spring Boot 2.3.4.RELEASE·Spring Framework 5.2.9.RELEASE 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

객체 생성, 의존관계 연결, 초기화, 사용, 종료의 순서를 구분한다. @Bean의 initMethod와 destroyMethod로 외부 자원의 시작·정리를 연결할 수 있다. 이 예제는 상태 값만 사용한다.

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
    Box box;
    try (
      AnnotationConfigApplicationContext c = new AnnotationConfigApplicationContext(
        Config.class
      )
    ) {
      box = c.getBean(Box.class);
      assertEquals("ready", box.state);
    }
    assertEquals("closed", box.state);
  }

  static class Box {

    String state = "new";

    public void start() {
      state = "ready";
    }

    public void stop() {
      state = "closed";
    }
  }

  @Configuration
  static class Config {

    @Bean(initMethod = "start", destroyMethod = "stop")
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

컨텍스트 초기화 후 state는 ready이고 닫은 후 closed다. 종료 경로를 테스트해 자원 누수를 예방하는 연습이다. 실제 외부 연결을 만들지 않아 환경에 의존하지 않는다.

## 헷갈린 부분과 주의점

정상 종료 콜백만으로 강제 종료나 프로세스 중단의 모든 상황을 보장할 수는 없다.

## 복습 문제

destroyMethod는 컨텍스트를 닫기 전에 호출될까?

**풀이:** 정상 사용 중이 아니라 컨텍스트 종료 과정에서 호출된다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/javadoc-api/org/springframework/context/annotation/Bean.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Spring 공부 05] prototype Bean과 생성 시점](/study/2020/spring/05-prototype/) · [다음: [Spring 공부 07] Configuration의 Bean 메서드 호출](/study/2020/spring/07-configuration/)
