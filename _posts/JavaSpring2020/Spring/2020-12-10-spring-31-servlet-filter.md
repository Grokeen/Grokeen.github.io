---
layout: content
title: "[Spring 공부 31] OncePerRequestFilter와 필터 체인"
date: 2020-12-10 09:00:00 +0900
categories: [Spring2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 71
study_unit: 9
permalink: /study/2020/spring/31-servlet-filter/
---

OncePerRequestFilter와 필터 체인을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11·Spring Boot 2.3.4.RELEASE·Spring Framework 5.2.9.RELEASE 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

서블릿 필터는 MVC 핸들러보다 앞의 요청·응답 흐름에 참여한다. 체인을 호출해야 다음 처리가 진행된다. OncePerRequestFilter의 비동기·오류 디스패치 동작은 메서드 계약에 따라 확인한다.

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
    MockMvc mvc=standaloneSetup(new Api()).addFilters(new Stamp()).build();
    mvc.perform(get("/ping")).andExpect(status().isOk()).andExpect(header().string("X-Study","2020"));
  }
    static class Stamp extends org.springframework.web.filter.OncePerRequestFilter {@Override protected void doFilterInternal(javax.servlet.http.HttpServletRequest q,javax.servlet.http.HttpServletResponse r,javax.servlet.FilterChain chain)throws javax.servlet.ServletException,java.io.IOException{r.setHeader("X-Study","2020");chain.doFilter(q,r);}}
    @RestController static class Api {@GetMapping("/ping") public String ping(){return "ok";}}
}
```
{% endraw %}

## 확인 결과

StudyTest의 검사 1개가 실패 없이 통과해야 한다. 아래 해설의 값·상태·예외를 assertion으로 확인한다. HTTP 예제는 MockMvc를 사용하므로 실제 서버 포트를 열지 않는다.

## 코드를 따라 읽기

필터가 응답 헤더를 넣고 chain.doFilter로 컨트롤러까지 진행한다. 테스트에서는 필터를 직접 추가해 실제 적용을 확인한다. Boot 전체 필터 등록 순서를 검증한 것은 아니다.

## 헷갈린 부분과 주의점

체인을 빠뜨리면 응답 처리가 중단될 수 있다. 필터·인터셉터·보안 체인의 역할을 혼동하지 않는다.

## 복습 문제

필터에서 chain.doFilter를 호출하지 않으면?

**풀이:** 뒤쪽 처리로 진행하지 않으므로 의도한 차단인지 확인해야 한다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/javadoc-api/org/springframework/web/filter/OncePerRequestFilter.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Spring 공부 30] HandlerInterceptor의 요청 전후 처리](/study/2020/spring/30-interceptor/) · [다음: [Spring 공부 32] 컨트롤러와 서비스 책임 나누기](/study/2020/spring/32-service-layer/)
