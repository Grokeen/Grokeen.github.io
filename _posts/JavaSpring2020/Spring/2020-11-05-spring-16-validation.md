---
layout: content
title: "[Spring 공부 16] Bean Validation으로 입력 제약 확인"
date: 2020-11-05 09:00:00 +0900
categories: [Spring2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 56
study_unit: 7
permalink: /study/2020/spring/16-validation/
---

Bean Validation으로 입력 제약 확인을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11·Spring Boot 2.3.4.RELEASE·Spring Framework 5.2.9.RELEASE 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

Bean Validation은 객체 필드의 제약을 선언하고 Validator로 확인한다. Boot 2.3 계열에서 validation 스타터를 명시하고 javax.validation 패키지를 사용한다. Boot 3의 jakarta 패키지와 섞지 않는다.

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
    try(javax.validation.ValidatorFactory f=javax.validation.Validation.buildDefaultValidatorFactory()){
     assertEquals(1,f.getValidator().validate(new Input("")).size());
     assertTrue(f.getValidator().validate(new Input("note")).isEmpty());
    }
  }
    static class Input {@javax.validation.constraints.NotBlank final String title;Input(String title){this.title=title;}}
}
```
{% endraw %}

## 확인 결과

StudyTest의 검사 1개가 실패 없이 통과해야 한다. 아래 해설의 값·상태·예외를 assertion으로 확인한다. HTTP 예제는 MockMvc를 사용하므로 실제 서버 포트를 열지 않는다.

## 코드를 따라 읽기

공백 문자열은 @NotBlank 위반 한 건이고 note는 통과한다. 객체에 어노테이션만 붙이는 것과 실제 validate 호출을 구분한다. 웹 요청에서는 @Valid 연결 여부를 확인한다.

## 헷갈린 부분과 주의점

입력 형식 검증이 권한 확인이나 DB 중복 검사까지 대신하지 않는다. 오류 메시지에 비밀값을 포함하지 않는다.

## 복습 문제

빈 문자열은 @NotNull만으로 막을 수 있을까?

**풀이:** null이 아니므로 막지 못한다. 목적에 맞는 제약을 사용한다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.jboss.org/hibernate/validator/6.1/reference/en-US/html_single/)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Spring 공부 15] ConditionalOnMissingBean과 기본 구현](/study/2020/spring/15-conditional/) · [다음: [Spring 공부 17] GetMapping과 첫 HTTP 응답 검사](/study/2020/spring/17-get-mapping/)
