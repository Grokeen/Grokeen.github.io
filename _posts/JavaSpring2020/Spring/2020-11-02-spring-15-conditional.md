---
layout: content
title: "[Spring 공부 15] ConditionalOnMissingBean과 기본 구현"
date: 2020-11-02 09:00:00 +0900
categories: [Spring2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 55
study_unit: 7
permalink: /study/2020/spring/15-conditional/
---

ConditionalOnMissingBean과 기본 구현을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11·Spring Boot 2.3.4.RELEASE·Spring Framework 5.2.9.RELEASE 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

자동 설정은 사용자가 명시적으로 제공한 구성을 존중하는 조건이 필요할 수 있다. @ConditionalOnMissingBean은 현재 확인되는 Bean 정의에 따라 등록 여부를 결정하므로 설정 처리 순서도 중요하다.

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
    new org.springframework.boot.test.context.runner.ApplicationContextRunner()
      .withConfiguration(
        org.springframework.boot.autoconfigure.AutoConfigurations.of(DefaultConfig.class)
      )
      .withUserConfiguration(UserConfig.class)
      .run(c -> {
        assertEquals("custom", c.getBean(String.class));
        assertEquals(1, c.getBeansOfType(String.class).size());
      });
  }

  @Configuration
  static class UserConfig {

    @Bean
    String custom() {
      return "custom";
    }
  }

  @Configuration
  static class DefaultConfig {

    @Bean
    @org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean(
      String.class
    )
    String fallback() {
      return "default";
    }
  }
}
```
{% endraw %}

## 확인 결과

StudyTest의 검사 1개가 실패 없이 통과해야 한다. 아래 해설의 값·상태·예외를 assertion으로 확인한다. HTTP 예제는 MockMvc를 사용하므로 실제 서버 포트를 열지 않는다.

## 코드를 따라 읽기

사용자 String Bean이 있으면 자동 설정의 기본 String은 추가되지 않는다. user 설정과 auto 설정의 역할을 분리한 테스트다. 조건을 아무 위치에나 붙이는 것과 자동 설정의 조건 설계를 구분한다.

## 헷갈린 부분과 주의점

조건은 Bean 정의가 처리되는 순서에 영향을 받는다. 운영에서 Bean 이름과 타입이 의도대로 구성되는지 검증한다.

## 복습 문제

사용자 String Bean이 없으면?

**풀이:** 기본 설정의 default 값이 등록될 수 있다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.spring.io/spring-boot/docs/2.3.4.RELEASE/api/org/springframework/boot/autoconfigure/condition/ConditionalOnMissingBean.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Spring 공부 14] ConfigurationProperties로 묶음 설정 바인딩](/study/2020/spring/14-configuration-properties/) · [다음: [Spring 공부 16] Bean Validation으로 입력 제약 확인](/study/2020/spring/16-validation/)
