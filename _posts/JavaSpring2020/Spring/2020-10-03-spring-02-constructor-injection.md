---
layout: content
title: "[Spring 공부 02] 생성자 주입으로 필수 의존관계 표현하기"
date: 2020-10-03 09:00:00 +0900
categories: [Spring2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 42
study_unit: 6
permalink: /study/2020/spring/02-constructor-injection/
---

생성자 주입으로 필수 의존관계 표현하기을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11·Spring Boot 2.3.4.RELEASE·Spring Framework 5.2.9.RELEASE 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

생성자 주입은 객체를 만들 때 필요한 의존관계를 명확히 한다. 이 예제는 @Bean 메서드의 매개변수로 다른 Bean을 받아 서비스에 전달하며 실제 DB나 외부 통신을 사용하지 않는다.

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
      assertEquals("saved:A", c.getBean(Service.class).save("A"));
    }
  }

  static class Repo {

    String save(String s) {
      return "saved:" + s;
    }
  }

  static class Service {

    final Repo repo;

    Service(Repo repo) {
      this.repo = repo;
    }

    String save(String s) {
      return repo.save(s);
    }
  }

  @Configuration
  static class Config {

    @Bean
    Repo repo() {
      return new Repo();
    }

    @Bean
    Service service(Repo repo) {
      return new Service(repo);
    }
  }
}
```
{% endraw %}

## 확인 결과

StudyTest의 검사 1개가 실패 없이 통과해야 한다. 아래 해설의 값·상태·예외를 assertion으로 확인한다. HTTP 예제는 MockMvc를 사용하므로 실제 서버 포트를 열지 않는다.

## 코드를 따라 읽기

Repo Bean을 먼저 준비하고 Service의 생성자 인자로 연결한다. 서비스는 구체적인 생성 위치 대신 전달받은 객체를 사용한다. 일반 Java 코드로도 생성해 단위 테스트할 수 있다.

## 헷갈린 부분과 주의점

필드에 @Autowired만 붙이면 의존관계가 숨겨지기 쉽다. 순환 의존관계는 설계 경계를 다시 확인한다.

## 복습 문제

서비스를 Spring 없이 만들 수 있을까?

**풀이:** new Service(new Repo())로 생성해 같은 로직을 검사할 수 있다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/javadoc-api/org/springframework/context/annotation/Bean.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Spring 공부 01] Spring 컨테이너와 Bean 조회](/study/2020/spring/01-container/) · [다음: [Spring 공부 03] 동일 타입 Bean과 Qualifier](/study/2020/spring/03-qualifier/)
