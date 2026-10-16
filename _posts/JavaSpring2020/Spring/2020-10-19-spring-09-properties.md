---
layout: content
title: "[Spring 공부 09] Environment에서 설정값 읽기"
date: 2020-10-19 09:00:00 +0900
categories: [Spring2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 49
study_unit: 7
permalink: /study/2020/spring/09-properties/
---

Environment에서 설정값 읽기을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11·Spring Boot 2.3.4.RELEASE·Spring Framework 5.2.9.RELEASE 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

환경 설정은 코드의 상수와 분리할 수 있다. 기본값, 필수값, 타입 변환 실패를 구분해 시작 시점에 확인하면 실행 중 모호한 오류를 줄일 수 있다.

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
      AnnotationConfigApplicationContext c = new AnnotationConfigApplicationContext()
    ) {
      c
        .getEnvironment()
        .getPropertySources()
        .addFirst(
          new org.springframework.core.env.MapPropertySource(
            "test",
            Map.of("study.limit", "5")
          )
        );
      c.register(Config.class);
      c.refresh();
      assertEquals(5, c.getBean(Integer.class));
    }
  }

  @Configuration
  static class Config {

    @Bean
    Integer limit(org.springframework.core.env.Environment e) {
      return e.getProperty("study.limit", Integer.class, 3);
    }
  }
}
```
{% endraw %}

## 확인 결과

StudyTest의 검사 1개가 실패 없이 통과해야 한다. 아래 해설의 값·상태·예외를 assertion으로 확인한다. HTTP 예제는 MockMvc를 사용하므로 실제 서버 포트를 열지 않는다.

## 코드를 따라 읽기

테스트용 PropertySource를 먼저 넣고 컨텍스트를 초기화한다. Bean 메서드는 Environment에서 정수 설정을 읽는다. 사용자 PC의 환경변수에 의존하지 않아 결과가 일정하다.

## 헷갈린 부분과 주의점

비밀 키를 소스나 게시글에 적지 않는다. 기본값이 있다고 잘못된 설정을 무조건 조용히 허용할지도 검토한다.

## 복습 문제

설정이 없으면 예제의 값은?

**풀이:** getProperty에 지정한 기본값 3이다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/javadoc-api/org/springframework/core/env/Environment.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Spring 공부 08] Import로 설정을 조합하기](/study/2020/spring/08-import/) · [다음: [Spring 공부 10] Profile로 환경별 Bean 선택하기](/study/2020/spring/10-profiles/)
