---
layout: content
title: "[Spring 공부 29] DateTimeFormat으로 날짜 입력 받기"
date: 2020-12-05 09:00:00 +0900
categories: [Spring2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 69
study_unit: 9
permalink: /study/2020/spring/29-date-binding/
---

DateTimeFormat으로 날짜 입력 받기을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11·Spring Boot 2.3.4.RELEASE·Spring Framework 5.2.9.RELEASE 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

문자열 날짜를 LocalDate로 받을 때 ISO 형식을 명시하면 입력 계약이 드러난다. 날짜만 필요한 조건을 서버 기본 시간대의 시각으로 임의 변환하지 않는다.

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
    mvc
      .perform(get("/day").param("value", "2020-10-01"))
      .andExpect(content().string("2020-10-02"));
    mvc
      .perform(get("/day").param("value", "2020-02-30"))
      .andExpect(status().isBadRequest());
  }

  @RestController
  static class Api {

    @GetMapping("/day")
    public String day(
      @RequestParam("value") @org.springframework.format.annotation.DateTimeFormat(
        iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE
      ) java.time.LocalDate day
    ) {
      return day.plusDays(1).toString();
    }
  }
}
```
{% endraw %}

## 확인 결과

StudyTest의 검사 1개가 실패 없이 통과해야 한다. 아래 해설의 값·상태·예외를 assertion으로 확인한다. HTTP 예제는 MockMvc를 사용하므로 실제 서버 포트를 열지 않는다.

## 코드를 따라 읽기

유효한 날짜는 다음 날로 계산하고 존재하지 않는 2월 30일은 변환에 실패한다. 문자열 길이만 맞추는 검증보다 달력 유효성까지 확인할 수 있다.

## 헷갈린 부분과 주의점

입력 형식과 출력 표시 형식은 별도다. 지역별 날짜 표기를 API 계약에 무심코 섞지 않는다.

## 복습 문제

날짜 조건에 언제나 시간대가 필요한가?

**풀이:** 아니다. 달력 날짜만 표현하는 LocalDate와 특정 순간을 구분한다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/javadoc-api/org/springframework/format/annotation/DateTimeFormat.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Spring 공부 28] Content-Type·Accept와 콘텐츠 협상](/study/2020/spring/28-media-types/) · [다음: [Spring 공부 30] HandlerInterceptor의 요청 전후 처리](/study/2020/spring/30-interceptor/)
