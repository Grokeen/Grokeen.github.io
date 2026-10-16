---
layout: content
title: "[Spring 공부 18] PathVariable로 자원 식별자 받기"
date: 2020-11-09 09:00:00 +0900
categories: [Spring2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 58
study_unit: 8
permalink: /study/2020/spring/18-path-variable/
---

PathVariable로 자원 식별자 받기을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11·Spring Boot 2.3.4.RELEASE·Spring Framework 5.2.9.RELEASE 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

경로 변수는 URL 경로의 일부를 메서드 인자로 바인딩한다. 숫자 타입으로 받으면 변환 가능한지 확인되지만 해당 자원이 존재하는지와 접근 권한은 별도로 확인해야 한다.

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
    mvc.perform(get("/notes/7")).andExpect(status().isOk()).andExpect(content().string("note-7"));
  }
    @RestController static class Api {@GetMapping("/notes/{id}") public String note(@PathVariable("id") long id){return "note-"+id;}}
}
```
{% endraw %}

## 확인 결과

StudyTest의 검사 1개가 실패 없이 통과해야 한다. 아래 해설의 값·상태·예외를 assertion으로 확인한다. HTTP 예제는 MockMvc를 사용하므로 실제 서버 포트를 열지 않는다.

## 코드를 따라 읽기

URL의 7이 long id로 변환된다. @PathVariable에 이름을 명시해 컴파일러의 매개변수 이름 보존 설정에 덜 의존하도록 했다. 식별자를 받는 것과 조회 성공은 다른 단계다.

## 헷갈린 부분과 주의점

숫자로 바인딩되었다고 양수나 존재하는 ID라는 뜻은 아니다. 필요한 범위 검증을 추가한다.

## 복습 문제

경로에 abc를 넣으면 long으로 변환될까?

**풀이:** 일반적으로 변환 오류로 400 응답 처리된다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/javadoc-api/org/springframework/web/bind/annotation/PathVariable.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Spring 공부 17] GetMapping과 첫 HTTP 응답 검사](/study/2020/spring/17-get-mapping/) · [다음: [Spring 공부 19] RequestParam과 기본 검색 조건](/study/2020/spring/19-query-parameter/)
