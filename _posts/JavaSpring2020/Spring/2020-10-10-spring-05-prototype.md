---
layout: content
title: "[Spring 공부 05] prototype Bean과 생성 시점"
date: 2020-10-10 09:00:00 +0900
categories: [Spring2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 45
study_unit: 6
permalink: /study/2020/spring/05-prototype/
---

prototype Bean과 생성 시점을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11·Spring Boot 2.3.4.RELEASE·Spring Framework 5.2.9.RELEASE 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

prototype은 요청할 때 새 인스턴스를 생성한다. singleton Bean에 주입된 prototype 객체가 매번 자동 갱신되는 것은 아니므로 새 객체가 필요한 시점과 조회 방식을 구분한다.

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
      assertNotSame(c.getBean(Box.class), c.getBean(Box.class));
    }
  }

  static class Box {}

  @Configuration
  static class Config {

    @Bean
    @Scope("prototype")
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

@Scope에 prototype을 지정해 두 번 조회한 객체가 다름을 확인한다. 이 예제는 직접 조회 기준이다. singleton 생성 시 한 번 주입하는 사례와 동작을 혼동하지 않는다.

## 헷갈린 부분과 주의점

prototype의 소멸 콜백까지 컨테이너가 모두 관리한다고 가정하지 않는다. 사용자가 닫아야 하는 자원은 명확히 처리한다.

## 복습 문제

singleton 생성자에 prototype을 한 번 주입하면?

**풀이:** 그 시점의 객체를 전달받으며 매 메서드 호출마다 새 객체가 되는 것은 아니다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/javadoc-api/org/springframework/context/annotation/Scope.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Spring 공부 04] 싱글턴 Bean과 요청별 상태](/study/2020/spring/04-singleton/) · [다음: [Spring 공부 06] Bean 초기화·종료 콜백](/study/2020/spring/06-lifecycle/)
