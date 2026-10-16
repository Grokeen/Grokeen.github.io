---
layout: content
title: "[Spring 공부 21] 객체를 JSON 응답으로 변환하기"
date: 2020-11-16 09:00:00 +0900
categories: [Spring2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 61
study_unit: 8
permalink: /study/2020/spring/21-json-response/
---

객체를 JSON 응답으로 변환하기을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11·Spring Boot 2.3.4.RELEASE·Spring Framework 5.2.9.RELEASE 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

컨트롤러가 객체를 반환하면 메시지 컨버터가 JSON으로 직렬화할 수 있다. 응답 필드와 이름은 API 계약이므로 엔티티 내부 구조를 무조건 노출하기보다 응답 모델을 구분한다.

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
    mvc.perform(get("/note")).andExpect(status().isOk()).andExpect(jsonPath("$.id").value(1)).andExpect(jsonPath("$.title").value("study"));
  }
    @RestController static class Api {@GetMapping("/note") public Map<String,Object> note(){return Map.of("id",1,"title","study");}}
}
```
{% endraw %}

## 확인 결과

StudyTest의 검사 1개가 실패 없이 통과해야 한다. 아래 해설의 값·상태·예외를 assertion으로 확인한다. HTTP 예제는 MockMvc를 사용하므로 실제 서버 포트를 열지 않는다.

## 코드를 따라 읽기

Map의 id와 title이 JSON 속성으로 표현된다. JSON 문자열 전체의 공백이나 속성 순서를 비교하지 않고 필요한 경로의 값을 검사한다. 운영 API는 명시적인 DTO도 검토한다.

## 헷갈린 부분과 주의점

JSON 속성 순서는 일반적인 의미의 계약으로 기대하지 않는다. 비밀번호 같은 내부 필드를 포함하지 않는다.

## 복습 문제

JSON 텍스트 전체를 고정 비교하면 어떤 문제가 있을까?

**풀이:** 의미가 같아도 공백·속성 순서 차이로 검사에 실패할 수 있다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/javadoc-api/org/springframework/http/converter/json/MappingJackson2HttpMessageConverter.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Spring 공부 20] 필수 매개변수와 타입 변환 오류](/study/2020/spring/20-binding-errors/) · [다음: [Spring 공부 22] RequestBody로 JSON 입력 받기](/study/2020/spring/22-request-body/)
