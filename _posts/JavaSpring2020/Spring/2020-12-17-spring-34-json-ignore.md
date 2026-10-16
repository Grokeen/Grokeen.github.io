---
layout: content
title: "[Spring 공부 34] JsonIgnore로 응답 노출 필드 확인"
date: 2020-12-17 09:00:00 +0900
categories: [Spring2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 74
study_unit: 10
permalink: /study/2020/spring/34-json-ignore/
---

JsonIgnore로 응답 노출 필드 확인을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11·Spring Boot 2.3.4.RELEASE·Spring Framework 5.2.9.RELEASE 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

JSON 직렬화는 공개 필드나 getter를 통해 내부 값을 노출할 수 있다. @JsonIgnore는 특정 속성 제외에 사용할 수 있지만 민감한 엔티티를 응답 모델로 직접 쓰는 설계 자체도 검토한다.

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
      .perform(get("/account"))
      .andExpect(jsonPath("$.name").value("sample"))
      .andExpect(jsonPath("$.secret").doesNotExist());
  }

  public static class Account {

    public String name = "sample";

    @com.fasterxml.jackson.annotation.JsonIgnore
    public String secret = "fictional";
  }

  @RestController
  static class Api {

    @GetMapping("/account")
    public Account get() {
      return new Account();
    }
  }
}
```
{% endraw %}

## 확인 결과

StudyTest의 검사 1개가 실패 없이 통과해야 한다. 아래 해설의 값·상태·예외를 assertion으로 확인한다. HTTP 예제는 MockMvc를 사용하므로 실제 서버 포트를 열지 않는다.

## 코드를 따라 읽기

응답 객체의 name은 보이고 secret은 제외된다. 예제 비밀값은 가상 문자열이다. 노출해서는 안 되는 필드는 실제 생성된 JSON을 검사해 확인한다.

## 헷갈린 부분과 주의점

어노테이션 하나만 믿기보다 별도의 응답 DTO와 로그 노출도 점검한다. 실제 토큰이나 비밀번호를 예제에 넣지 않는다.

## 복습 문제

필드를 private으로 바꾸면 getter의 직렬화도 자동 차단될까?

**풀이:** 아니다. Jackson이 인식하는 속성 접근 경로를 확인해야 한다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://javadoc.io/doc/com.fasterxml.jackson.core/jackson-annotations/2.11.2/com/fasterxml/jackson/annotation/JsonIgnore.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Spring 공부 33] Mockito로 의존 객체의 반환값 고정하기](/study/2020/spring/33-mockito/) · [다음: [Spring 공부 35] 페이지 요청의 범위와 기본값](/study/2020/spring/35-pagination/)
