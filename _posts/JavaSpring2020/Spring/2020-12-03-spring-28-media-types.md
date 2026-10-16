---
layout: content
title: "[Spring 공부 28] Content-Type·Accept와 콘텐츠 협상"
date: 2020-12-03 09:00:00 +0900
categories: [Spring2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 68
study_unit: 9
permalink: /study/2020/spring/28-media-types/
---

Content-Type·Accept와 콘텐츠 협상을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11·Spring Boot 2.3.4.RELEASE·Spring Framework 5.2.9.RELEASE 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

Content-Type은 보낸 본문의 형식이고 Accept는 받고 싶은 응답 형식이다. 컨트롤러의 produces와 클라이언트 요구가 맞지 않으면 406을 반환할 수 있다.

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
    MockMvc mvc=standaloneSetup(new Api()).build();
    mvc.perform(get("/json").accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
    mvc.perform(get("/json").accept(MediaType.TEXT_PLAIN)).andExpect(status().isNotAcceptable());
  }
    @RestController static class Api {@GetMapping(value="/json",produces="application/json") public Map<String,Integer> json(){return Map.of("n",1);}}
}
```
{% endraw %}

## 확인 결과

StudyTest의 검사 1개가 실패 없이 통과해야 한다. 아래 해설의 값·상태·예외를 assertion으로 확인한다. HTTP 예제는 MockMvc를 사용하므로 실제 서버 포트를 열지 않는다.

## 코드를 따라 읽기

이 경로는 JSON 응답만 제공하도록 선언했다. JSON을 요청하면 통과하고 text/plain만 원하면 제공할 수 없어 406이다. 요청 본문 형식이 맞지 않는 415와 구분한다.

## 헷갈린 부분과 주의점

모든 브라우저 요청의 Accept가 같다고 가정하지 않는다. 실제 클라이언트와 계약을 맞춘다.

## 복습 문제

지원하지 않는 요청 본문의 형식은 보통 어떤 상태와 관련될까?

**풀이:** 415 Unsupported Media Type과 관련되며 406과 목적이 다르다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/javadoc-api/org/springframework/web/bind/annotation/RequestMapping.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Spring 공부 27] 요청 헤더와 응답 헤더 구분하기](/study/2020/spring/27-headers/) · [다음: [Spring 공부 29] DateTimeFormat으로 날짜 입력 받기](/study/2020/spring/29-date-binding/)
