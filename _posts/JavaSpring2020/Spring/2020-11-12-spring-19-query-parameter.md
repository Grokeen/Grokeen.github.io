---
layout: content
title: "[Spring 공부 19] RequestParam과 기본 검색 조건"
date: 2020-11-12 09:00:00 +0900
categories: [Spring2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 59
study_unit: 8
permalink: /study/2020/spring/19-query-parameter/
---

RequestParam과 기본 검색 조건을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11·Spring Boot 2.3.4.RELEASE·Spring Framework 5.2.9.RELEASE 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

쿼리 매개변수는 경로가 아닌 요청의 조건을 전달한다. 기본값을 지정하면 누락 시 동작을 명확히 할 수 있다. 이름과 기본값, 빈 문자열 처리 계약을 함께 확인한다.

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
    mvc.perform(get("/search")).andExpect(content().string("all"));
    mvc.perform(get("/search").param("q","java")).andExpect(content().string("java"));
  }
    @RestController static class Api {@GetMapping("/search") public String search(@RequestParam(name="q",defaultValue="all") String q){return q;}}
}
```
{% endraw %}

## 확인 결과

StudyTest의 검사 1개가 실패 없이 통과해야 한다. 아래 해설의 값·상태·예외를 assertion으로 확인한다. HTTP 예제는 MockMvc를 사용하므로 실제 서버 포트를 열지 않는다.

## 코드를 따라 읽기

q가 없을 때 기본값 all, 있을 때 java가 반환된다. 검색어를 받았다고 SQL이나 HTML에 그대로 삽입하지 않고 다음 계층에서 안전한 처리를 해야 한다.

## 헷갈린 부분과 주의점

기본값을 무조건 두면 필수 입력 누락을 숨길 수 있다. 필수·선택 조건을 API 계약으로 정한다.

## 복습 문제

필수 검색 조건이라면 기본값을 넣는 것이 항상 적절할까?

**풀이:** 아니다. 누락 시 오류를 줄지 기본 검색을 할지 계약에 따라 정한다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/javadoc-api/org/springframework/web/bind/annotation/RequestParam.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Spring 공부 18] PathVariable로 자원 식별자 받기](/study/2020/spring/18-path-variable/) · [다음: [Spring 공부 20] 필수 매개변수와 타입 변환 오류](/study/2020/spring/20-binding-errors/)
