---
layout: content
title: "[Spring 공부 20] 필수 매개변수와 타입 변환 오류"
date: 2020-11-14 09:00:00 +0900
categories: [Spring2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 60
study_unit: 8
permalink: /study/2020/spring/20-binding-errors/
---

필수 매개변수와 타입 변환 오류을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11·Spring Boot 2.3.4.RELEASE·Spring Framework 5.2.9.RELEASE 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

필수 요청 매개변수 누락과 숫자 변환 실패는 정상 입력과 구분해야 한다. HTTP 계층에서 400을 반환하는 것과 업무상 자원이 없는 404를 같은 오류로 처리하지 않는다.

## 따라 해 보기

목차의 Maven 프로젝트에서 아래 전체를 UTF-8 src/test/java/StudyTest.java에 넣고 mvn -Dtest=StudyTest test로 실행한다. 글마다 파일을 교체하고 이전 예제를 덧붙이지 않는다.

{% raw %}
```java
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.*;

import java.util.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.*;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.bind.annotation.*;

public class StudyTest {

  @Test
  void study() throws Exception {
    MockMvc mvc = standaloneSetup(new Api()).build();
    mvc.perform(get("/square")).andExpect(status().isBadRequest());
    mvc.perform(get("/square").param("n", "abc")).andExpect(status().isBadRequest());
    mvc.perform(get("/square").param("n", "3")).andExpect(content().string("9"));
  }

  @RestController
  static class Api {

    @GetMapping("/square")
    public String square(@RequestParam("n") int n) {
      return Integer.toString(Math.multiplyExact(n, n));
    }
  }
}
```
{% endraw %}

## 확인 결과

StudyTest의 검사 1개가 실패 없이 통과해야 한다. 아래 해설의 값·상태·예외를 assertion으로 확인한다. HTTP 예제는 MockMvc를 사용하므로 실제 서버 포트를 열지 않는다.

## 코드를 따라 읽기

필수 n이 없거나 숫자로 바꿀 수 없으면 400이고, 3은 제곱값 9를 돌려준다. 실제 계산 입력 범위는 별도 제약으로 제한해야 한다.

## 헷갈린 부분과 주의점

int 제곱은 큰 값에서 오버플로가 난다. 이 글의 작은 예제 값을 일반 입력 범위로 오해하지 않는다.

## 복습 문제

400과 404는 같은 뜻인가?

**풀이:** 아니다. 잘못된 요청과 자원 부재는 서로 다른 상황이다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/javadoc-api/org/springframework/web/bind/annotation/RequestParam.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Spring 공부 19] RequestParam과 기본 검색 조건](/study/2020/spring/19-query-parameter/) · [다음: [Spring 공부 21] 객체를 JSON 응답으로 변환하기](/study/2020/spring/21-json-response/)
