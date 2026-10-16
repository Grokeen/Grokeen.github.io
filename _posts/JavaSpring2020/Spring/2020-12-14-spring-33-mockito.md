---
layout: content
title: "[Spring 공부 33] Mockito로 의존 객체의 반환값 고정하기"
date: 2020-12-14 09:00:00 +0900
categories: [Spring2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 73
study_unit: 10
permalink: /study/2020/spring/33-mockito/
---

Mockito로 의존 객체의 반환값 고정하기을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11·Spring Boot 2.3.4.RELEASE·Spring Framework 5.2.9.RELEASE 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

웹 계층을 검사할 때 서비스의 복잡한 외부 의존성을 테스트 더블로 대체할 수 있다. stub은 반환값을 정하고 verify는 실제 호출을 확인한다. 모든 내부 호출을 과하게 고정하지 않는다.

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
    Lookup service = org.mockito.Mockito.mock(Lookup.class);
    org.mockito.Mockito.when(service.find(7)).thenReturn("seven");
    MockMvc mvc = standaloneSetup(new Api(service)).build();
    mvc.perform(get("/lookup/7")).andExpect(content().string("seven"));
    org.mockito.Mockito.verify(service).find(7);
  }

  interface Lookup {
    String find(int id);
  }

  @RestController
  static class Api {

    final Lookup lookup;

    Api(Lookup l) {
      lookup = l;
    }

    @GetMapping("/lookup/{id}")
    public String find(@PathVariable("id") int id) {
      return lookup.find(id);
    }
  }
}
```
{% endraw %}

## 확인 결과

StudyTest의 검사 1개가 실패 없이 통과해야 한다. 아래 해설의 값·상태·예외를 assertion으로 확인한다. HTTP 예제는 MockMvc를 사용하므로 실제 서버 포트를 열지 않는다.

## 코드를 따라 읽기

서비스가 7을 받으면 seven을 돌려주도록 정하고 컨트롤러가 그 값을 응답하는지 확인한다. 실제 DB나 네트워크를 호출하지 않아 HTTP 바인딩 오류를 좁게 찾을 수 있다.

## 헷갈린 부분과 주의점

mock 기반 검사가 실제 저장소와의 SQL 호환성까지 증명하지 않는다. 통합 검사를 보완한다.

## 복습 문제

stub과 verify는 무엇이 다를까?

**풀이:** stub은 동작을 준비하고 verify는 호출이 일어났는지 확인한다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://javadoc.io/doc/org.mockito/mockito-core/3.3.3/org/mockito/Mockito.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Spring 공부 32] 컨트롤러와 서비스 책임 나누기](/study/2020/spring/32-service-layer/) · [다음: [Spring 공부 34] JsonIgnore로 응답 노출 필드 확인](/study/2020/spring/34-json-ignore/)
