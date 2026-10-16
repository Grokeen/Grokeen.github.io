---
layout: content
title: "[Spring 공부 14] ConfigurationProperties로 묶음 설정 바인딩"
date: 2020-10-31 09:00:00 +0900
categories: [Spring2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 54
study_unit: 7
permalink: /study/2020/spring/14-configuration-properties/
---

ConfigurationProperties로 묶음 설정 바인딩을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11·Spring Boot 2.3.4.RELEASE·Spring Framework 5.2.9.RELEASE 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

서로 관련된 설정은 객체로 바인딩해 이름과 타입을 모을 수 있다. Spring Boot 2.3.4 예제는 setter 기반 바인딩을 사용하며 최신 버전의 다른 규칙을 그대로 적용하지 않는다.

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
      .withUserConfiguration(Config.class)
      .withPropertyValues("study.limit=8")
      .run(c -> {
        assertEquals(8, c.getBean(Options.class).getLimit());
      });
  }

  @org.springframework.boot.context.properties.ConfigurationProperties(prefix = "study")
  public static class Options {

    private int limit = 3;

    public int getLimit() {
      return limit;
    }

    public void setLimit(int n) {
      limit = n;
    }
  }

  @Configuration
  @org.springframework.boot.context.properties.EnableConfigurationProperties(
    Options.class
  )
  static class Config {}
}
```
{% endraw %}

## 확인 결과

StudyTest의 검사 1개가 실패 없이 통과해야 한다. 아래 해설의 값·상태·예외를 assertion으로 확인한다. HTTP 예제는 MockMvc를 사용하므로 실제 서버 포트를 열지 않는다.

## 코드를 따라 읽기

study.limit 속성이 Options.limit에 바인딩된다. 기본값 3과 외부 설정 8을 구분해 테스트한다. 실제 서비스에서는 유효 범위 검증도 함께 설계한다.

## 헷갈린 부분과 주의점

설정 객체를 만들었다고 모든 값이 자동 검증되는 것은 아니다. Bean 등록과 validation 적용 여부를 확인한다.

## 복습 문제

study.limit가 없으면?

**풀이:** 이 예제는 필드 초기값 3을 사용한다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.spring.io/spring-boot/docs/2.3.4.RELEASE/api/org/springframework/boot/context/properties/ConfigurationProperties.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Spring 공부 13] ApplicationContextRunner로 작은 설정 검사](/study/2020/spring/13-context-runner/) · [다음: [Spring 공부 15] ConditionalOnMissingBean과 기본 구현](/study/2020/spring/15-conditional/)
