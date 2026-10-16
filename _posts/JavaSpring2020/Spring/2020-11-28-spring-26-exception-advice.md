---
layout: content
title: "[Spring 공부 26] RestControllerAdvice로 오류 형식 모으기"
date: 2020-11-28 09:00:00 +0900
categories: [Spring2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 66
study_unit: 9
permalink: /study/2020/spring/26-exception-advice/
---

RestControllerAdvice로 오류 형식 모으기을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11·Spring Boot 2.3.4.RELEASE·Spring Framework 5.2.9.RELEASE 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

공통 예외 응답을 Advice로 모으면 컨트롤러마다 중복된 처리 코드를 줄일 수 있다. 어떤 예외를 어떤 상태·오류 코드로 변환하는지 명확히 하며 내부 구현 정보 노출을 피한다.

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
    MockMvc mvc=standaloneSetup(new Api()).setControllerAdvice(new Errors()).build();
    mvc.perform(get("/fail")).andExpect(status().isBadRequest()).andExpect(jsonPath("$.code").value("INVALID_INPUT"));
  }
    @RestController static class Api {@GetMapping("/fail") public String fail(){throw new IllegalArgumentException("internal");}}
    @RestControllerAdvice static class Errors {@ExceptionHandler(IllegalArgumentException.class) public ResponseEntity<Map<String,String>> bad(){return ResponseEntity.badRequest().body(Map.of("code","INVALID_INPUT"));}}
}
```
{% endraw %}

## 확인 결과

StudyTest의 검사 1개가 실패 없이 통과해야 한다. 아래 해설의 값·상태·예외를 assertion으로 확인한다. HTTP 예제는 MockMvc를 사용하므로 실제 서버 포트를 열지 않는다.

## 코드를 따라 읽기

컨트롤러가 던진 IllegalArgumentException을 Advice가 처리한다. 응답에는 고정된 공개 코드만 넣고 예외 메시지의 내부 내용을 그대로 반환하지 않는다.

## 헷갈린 부분과 주의점

범용 Exception 처리 하나로 모든 실패를 200으로 바꾸지 않는다. 예상 오류와 예상하지 못한 결함을 구분해 기록한다.

## 복습 문제

Advice를 standalone 테스트에 자동으로 모두 찾을까?

**풀이:** 이 예제는 setControllerAdvice로 명시적으로 등록한다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/javadoc-api/org/springframework/web/bind/annotation/RestControllerAdvice.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Spring 공부 25] 없는 자원과 ResponseStatusException](/study/2020/spring/25-not-found/) · [다음: [Spring 공부 27] 요청 헤더와 응답 헤더 구분하기](/study/2020/spring/27-headers/)
