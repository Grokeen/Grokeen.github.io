---
layout: content
title: "[Spring 공부 08] Import로 설정을 조합하기"
date: 2020-10-17 09:00:00 +0900
categories: [Spring2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 48
study_unit: 6
permalink: /study/2020/spring/08-import/
---

Import로 설정을 조합하기을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11·Spring Boot 2.3.4.RELEASE·Spring Framework 5.2.9.RELEASE 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

작은 설정 클래스를 @Import로 조합하면 어떤 기능을 로드하는지 드러난다. 테스트에서도 필요한 설정만 올려 시작 비용과 외부 의존성을 줄일 수 있다.

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
        App.class
      )
    ) {
      assertEquals(7, c.getBean(Integer.class));
    }
  }

  @Configuration
  static class Numbers {

    @Bean
    Integer number() {
      return 7;
    }
  }

  @Configuration
  @Import(Numbers.class)
  static class App {}
}
```
{% endraw %}

## 확인 결과

StudyTest의 검사 1개가 실패 없이 통과해야 한다. 아래 해설의 값·상태·예외를 assertion으로 확인한다. HTTP 예제는 MockMvc를 사용하므로 실제 서버 포트를 열지 않는다.

## 코드를 따라 읽기

App 설정이 Numbers 설정을 가져오고 그 안의 Integer Bean을 조회한다. 전체 애플리케이션 스캔과 명시적인 설정 조합의 차이를 확인한다.

## 헷갈린 부분과 주의점

운영 설정까지 무조건 가져오면 테스트 중 외부 DB나 비밀값을 요구할 수 있다. 로드 범위를 의도적으로 정한다.

## 복습 문제

Import 대상 설정의 Bean도 조회할 수 있을까?

**풀이:** 같은 컨텍스트에 등록되므로 조회할 수 있다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/javadoc-api/org/springframework/context/annotation/Import.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Spring 공부 07] Configuration의 Bean 메서드 호출](/study/2020/spring/07-configuration/) · [다음: [Spring 공부 09] Environment에서 설정값 읽기](/study/2020/spring/09-properties/)
