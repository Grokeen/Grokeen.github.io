---
layout: content
title: "[Spring 공부 35] 페이지 요청의 범위와 기본값"
date: 2020-12-19 09:00:00 +0900
categories: [Spring2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 75
study_unit: 10
permalink: /study/2020/spring/35-pagination/
---

페이지 요청의 범위와 기본값을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11·Spring Boot 2.3.4.RELEASE·Spring Framework 5.2.9.RELEASE 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

페이지 번호와 크기는 숫자로 변환되는지만 아니라 허용 범위도 확인해야 한다. 예제는 0부터 시작하는 페이지와 1~50 크기 계약을 명시하며 실제 DB 페이지 조회를 구현하지 않는다.

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
    mvc.perform(get("/pages")).andExpect(jsonPath("$.size").value(10));
    mvc.perform(get("/pages").param("size", "0")).andExpect(status().isBadRequest());
    mvc.perform(get("/pages").param("page", "-1")).andExpect(status().isBadRequest());
  }

  @RestController
  static class Api {

    @GetMapping("/pages")
    public Map<String, Integer> pages(
      @RequestParam(name = "page", defaultValue = "0") int p,
      @RequestParam(name = "size", defaultValue = "10") int s
    ) {
      if (
        p < 0 || s < 1 || s > 50
      ) throw new org.springframework.web.server.ResponseStatusException(
        org.springframework.http.HttpStatus.BAD_REQUEST
      );
      return Map.of("page", p, "size", s);
    }
  }
}
```
{% endraw %}

## 확인 결과

StudyTest의 검사 1개가 실패 없이 통과해야 한다. 아래 해설의 값·상태·예외를 assertion으로 확인한다. HTTP 예제는 MockMvc를 사용하므로 실제 서버 포트를 열지 않는다.

## 코드를 따라 읽기

기본 페이지 0과 크기 10을 사용하고 범위를 벗어나면 400으로 처리한다. 한 번에 무제한 데이터를 반환하는 실수를 줄이는 요청 계약 연습이다.

## 헷갈린 부분과 주의점

페이지 번호의 0·1 시작 기준을 클라이언트와 맞춘다. 큰 page 곱셈의 오버플로와 조회 비용도 검토한다.

## 복습 문제

숫자 0이므로 타입 변환만 통과하면 size가 유효할까?

**풀이:** 아니다. 이 계약에서는 최소 1이므로 범위 검증에 실패한다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/javadoc-api/org/springframework/web/bind/annotation/RequestParam.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Spring 공부 34] JsonIgnore로 응답 노출 필드 확인](/study/2020/spring/34-json-ignore/) · [다음: [Spring 공부 36] JdbcTemplate로 저장·조회하기](/study/2020/spring/36-jdbc-template/)
