---
layout: content
title: "[Spring 공부 17] GetMapping과 첫 HTTP 응답 검사"
date: 2020-11-07 09:00:00 +0900
categories: [Spring2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 57
study_unit: 8
permalink: /study/2020/spring/17-get-mapping/
---

GetMapping과 첫 HTTP 응답 검사을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11·Spring Boot 2.3.4.RELEASE·Spring Framework 5.2.9.RELEASE 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

@RestController는 메서드 반환값을 HTTP 응답 본문으로 처리한다. MockMvc는 Servlet MVC 요청 처리를 테스트하며 실제 포트에 서버를 열지 않고 상태 코드와 본문을 확인할 수 있다.

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
    MockMvc mvc = standaloneSetup(new Api()).build();
    mvc
      .perform(get("/hello"))
      .andExpect(status().isOk())
      .andExpect(content().string("hello"));
  }

  @RestController
  static class Api {

    @GetMapping("/hello")
    public String hello() {
      return "hello";
    }
  }
}
```
{% endraw %}

## 확인 결과

StudyTest의 검사 1개가 실패 없이 통과해야 한다. 아래 해설의 값·상태·예외를 assertion으로 확인한다. HTTP 예제는 MockMvc를 사용하므로 실제 서버 포트를 열지 않는다.

## 코드를 따라 읽기

GET 요청을 컨트롤러에 전달해 200과 hello 본문을 검사한다. 브라우저 주소 입력, 요청 매핑, 반환값의 연결을 작은 예제로 읽는다. 테스트용 컨트롤러는 중첩 클래스로 함께 제공한다.

## 헷갈린 부분과 주의점

standaloneSetup은 전체 Boot 자동 설정과 필터를 모두 검증하지 않는다. 실제 통합 검사의 범위를 별도로 구분한다.

## 복습 문제

이 예제는 localhost 포트를 열까?

**풀이:** 아니다. MockMvc가 테스트 환경에서 요청을 처리한다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/javadoc-api/org/springframework/web/bind/annotation/GetMapping.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Spring 공부 16] Bean Validation으로 입력 제약 확인](/study/2020/spring/16-validation/) · [다음: [Spring 공부 18] PathVariable로 자원 식별자 받기](/study/2020/spring/18-path-variable/)
