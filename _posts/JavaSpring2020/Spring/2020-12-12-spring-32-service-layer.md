---
layout: content
title: "[Spring 공부 32] 컨트롤러와 서비스 책임 나누기"
date: 2020-12-12 09:00:00 +0900
categories: [Spring2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 72
study_unit: 9
permalink: /study/2020/spring/32-service-layer/
---

컨트롤러와 서비스 책임 나누기을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11·Spring Boot 2.3.4.RELEASE·Spring Framework 5.2.9.RELEASE 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

컨트롤러는 요청·응답을 연결하고 서비스는 업무 동작을 표현한다. 작은 예제에서도 계산을 컨트롤러 안에 반복 작성하는 대신 별도 객체로 나누면 HTTP 없이 로직을 검사할 수 있다.

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
    Price service = new Price();
    assertEquals(110, service.total(100));
    MockMvc mvc = standaloneSetup(new Api(service)).build();
    mvc.perform(get("/price").param("n", "100")).andExpect(content().string("110"));
  }

  static class Price {

    int total(int n) {
      return Math.addExact(n, 10);
    }
  }

  @RestController
  static class Api {

    final Price p;

    Api(Price p) {
      this.p = p;
    }

    @GetMapping("/price")
    public String total(@RequestParam("n") int n) {
      return Integer.toString(p.total(n));
    }
  }
}
```
{% endraw %}

## 확인 결과

StudyTest의 검사 1개가 실패 없이 통과해야 한다. 아래 해설의 값·상태·예외를 assertion으로 확인한다. HTTP 예제는 MockMvc를 사용하므로 실제 서버 포트를 열지 않는다.

## 코드를 따라 읽기

가상 계산은 금액에 고정 10을 더한다. 서비스 단위 확인과 HTTP 연결 확인을 구분했다. 실제 수수료나 세금 정책을 뜻하지 않으며 계산 가정을 명시한다.

## 헷갈린 부분과 주의점

계층을 나눈 이름만으로 책임이 분리되는 것은 아니다. 서비스가 HttpServletRequest에 과도하게 의존하지 않도록 검토한다.

## 복습 문제

서비스 로직을 MockMvc 없이 검사할 수 있을까?

**풀이:** 일반 Java 객체 메서드로 호출해 검사할 수 있다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/javadoc-api/org/springframework/stereotype/Service.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Spring 공부 31] OncePerRequestFilter와 필터 체인](/study/2020/spring/31-servlet-filter/) · [다음: [Spring 공부 33] Mockito로 의존 객체의 반환값 고정하기](/study/2020/spring/33-mockito/)
