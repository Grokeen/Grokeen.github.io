---
layout: content
title: "[Spring 공부 25] 없는 자원과 ResponseStatusException"
date: 2020-11-26 09:00:00 +0900
categories: [Spring2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 65
study_unit: 9
permalink: /study/2020/spring/25-not-found/
---

없는 자원과 ResponseStatusException을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11·Spring Boot 2.3.4.RELEASE·Spring Framework 5.2.9.RELEASE 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

형식상 유효한 식별자라도 자원이 없을 수 있다. 이 경우 정상 빈 문자열과 구분해 404 등 API 계약에 맞는 응답을 반환한다. 내부 예외 상세를 클라이언트에게 그대로 노출하지 않는다.

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
    mvc.perform(get("/items/9")).andExpect(status().isNotFound());
    mvc.perform(get("/items/1")).andExpect(content().string("one"));
  }
    @RestController static class Api {@GetMapping("/items/{id}") public String get(@PathVariable("id") int id){if(id!=1)throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.NOT_FOUND);return "one";}}
}
```
{% endraw %}

## 확인 결과

StudyTest의 검사 1개가 실패 없이 통과해야 한다. 아래 해설의 값·상태·예외를 assertion으로 확인한다. HTTP 예제는 MockMvc를 사용하므로 실제 서버 포트를 열지 않는다.

## 코드를 따라 읽기

예제는 ID 1만 존재하는 가상 저장소다. 9는 ResponseStatusException으로 404를 지정한다. 인증 여부에 따른 정보 노출 정책은 별도 설계가 필요하다.

## 헷갈린 부분과 주의점

없는 자원을 서버 오류 500으로 처리하거나 모든 예외를 404로 바꾸면 원인 파악이 어려워진다.

## 복습 문제

DB 접속 장애도 무조건 404로 바꿀까?

**풀이:** 아니다. 자원 부재와 시스템 실패를 구분한다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/javadoc-api/org/springframework/web/server/ResponseStatusException.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Spring 공부 24] ResponseEntity로 상태·헤더·본문 지정하기](/study/2020/spring/24-created-location/) · [다음: [Spring 공부 26] RestControllerAdvice로 오류 형식 모으기](/study/2020/spring/26-exception-advice/)
