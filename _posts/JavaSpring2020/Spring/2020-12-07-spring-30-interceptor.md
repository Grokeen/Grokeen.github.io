---
layout: content
title: "[Spring 공부 30] HandlerInterceptor의 요청 전후 처리"
date: 2020-12-07 09:00:00 +0900
categories: [Spring2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 70
study_unit: 9
permalink: /study/2020/spring/30-interceptor/
---

HandlerInterceptor의 요청 전후 처리을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11·Spring Boot 2.3.4.RELEASE·Spring Framework 5.2.9.RELEASE 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

인터셉터는 MVC 핸들러 실행 전후의 공통 동작에 사용할 수 있다. 모든 HTTP 처리나 보안 경계를 대체하는 것은 아니며 필터와 실행 위치가 다르다.

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
    Count interceptor=new Count();
    MockMvc mvc=standaloneSetup(new Api()).addInterceptors(interceptor).build();
    mvc.perform(get("/ping")).andExpect(status().isOk());
    assertEquals(1,interceptor.count);
  }
    static class Count implements org.springframework.web.servlet.HandlerInterceptor {int count;@Override public boolean preHandle(javax.servlet.http.HttpServletRequest req,javax.servlet.http.HttpServletResponse res,Object handler){count++;return true;}}
    @RestController static class Api {@GetMapping("/ping") public String ping(){return "ok";}}
}
```
{% endraw %}

## 확인 결과

StudyTest의 검사 1개가 실패 없이 통과해야 한다. 아래 해설의 값·상태·예외를 assertion으로 확인한다. HTTP 예제는 MockMvc를 사용하므로 실제 서버 포트를 열지 않는다.

## 코드를 따라 읽기

preHandle이 실행될 때 카운터를 증가시키고 true로 다음 처리를 허용한다. 단일 테스트의 호출 횟수만 확인하며 공유 카운터의 운영 동시성 설계를 구현한 것은 아니다.

## 헷갈린 부분과 주의점

false를 반환하면 요청 흐름이 중단되므로 응답 처리 계약을 함께 정한다. 인증에는 검증된 보안 체계를 사용한다.

## 복습 문제

preHandle에서 true는 어떤 뜻인가?

**풀이:** 다음 인터셉터 또는 핸들러로 진행을 허용한다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/javadoc-api/org/springframework/web/servlet/HandlerInterceptor.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Spring 공부 29] DateTimeFormat으로 날짜 입력 받기](/study/2020/spring/29-date-binding/) · [다음: [Spring 공부 31] OncePerRequestFilter와 필터 체인](/study/2020/spring/31-servlet-filter/)
