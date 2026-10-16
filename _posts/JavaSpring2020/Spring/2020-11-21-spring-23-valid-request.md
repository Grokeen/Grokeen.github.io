---
layout: content
title: "[Spring 공부 23] Valid로 웹 입력 제약 실행하기"
date: 2020-11-21 09:00:00 +0900
categories: [Spring2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 63
study_unit: 8
permalink: /study/2020/spring/23-valid-request/
---

Valid로 웹 입력 제약 실행하기을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11·Spring Boot 2.3.4.RELEASE·Spring Framework 5.2.9.RELEASE 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

요청 DTO의 제약은 @Valid 등 검증 실행 경로와 연결되어야 한다. Spring Boot 2.3.4에서는 validation 스타터와 javax.validation을 사용한다. 입력 검증 실패와 서버 내부 오류를 구분한다.

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
    mvc.perform(post("/notes").contentType(MediaType.APPLICATION_JSON).content("{\"title\":\"\"}")).andExpect(status().isBadRequest());
    mvc.perform(post("/notes").contentType(MediaType.APPLICATION_JSON).content("{\"title\":\"ok\"}")).andExpect(status().isCreated());
  }
    public static class Input {@javax.validation.constraints.NotBlank public String title;}
    @RestController static class Api {@PostMapping("/notes") public ResponseEntity<Void> save(@javax.validation.Valid @RequestBody Input in){return ResponseEntity.status(201).build();}}
}
```
{% endraw %}

## 확인 결과

StudyTest의 검사 1개가 실패 없이 통과해야 한다. 아래 해설의 값·상태·예외를 assertion으로 확인한다. HTTP 예제는 MockMvc를 사용하므로 실제 서버 포트를 열지 않는다.

## 코드를 따라 읽기

빈 title은 NotBlank 위반으로 400이 된다. 정상 요청은 201이다. 제약 어노테이션을 선언하는 것과 @Valid로 요청 처리 시 검사하는 단계를 함께 확인한다.

## 헷갈린 부분과 주의점

이 검사가 중복 제목, 작성 권한, 동시 갱신 문제까지 해결하지는 않는다. 각 계층의 책임을 나눈다.

## 복습 문제

NotBlank는 공백만 있는 문자열도 막을까?

**풀이:** 그렇다. null과 빈 문자열 및 공백만 있는 값의 제약을 제공한다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/javadoc-api/org/springframework/web/bind/annotation/RequestBody.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Spring 공부 22] RequestBody로 JSON 입력 받기](/study/2020/spring/22-request-body/) · [다음: [Spring 공부 24] ResponseEntity로 상태·헤더·본문 지정하기](/study/2020/spring/24-created-location/)
