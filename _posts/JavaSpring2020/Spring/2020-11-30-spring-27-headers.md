---
layout: content
title: "[Spring 공부 27] 요청 헤더와 응답 헤더 구분하기"
date: 2020-11-30 09:00:00 +0900
categories: [Spring2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 67
study_unit: 9
permalink: /study/2020/spring/27-headers/
---

요청 헤더와 응답 헤더 구분하기을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11·Spring Boot 2.3.4.RELEASE·Spring Framework 5.2.9.RELEASE 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

요청 헤더는 클라이언트가 보낸 메타데이터이고 응답 헤더는 서버가 돌려주는 메타데이터다. 입력 헤더를 그대로 신뢰해 인증·권한 결정을 하지 않는다. 예제는 단순한 추적용 문자열을 전달한다.

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
    mvc.perform(get("/trace").header("X-Trace","test-1")).andExpect(status().isOk()).andExpect(header().string("X-Trace","test-1"));
  }
    @RestController static class Api {@GetMapping("/trace") public ResponseEntity<String> trace(@RequestHeader("X-Trace") String id){return ResponseEntity.ok().header("X-Trace",id).body("ok");}}
}
```
{% endraw %}

## 확인 결과

StudyTest의 검사 1개가 실패 없이 통과해야 한다. 아래 해설의 값·상태·예외를 assertion으로 확인한다. HTTP 예제는 MockMvc를 사용하므로 실제 서버 포트를 열지 않는다.

## 코드를 따라 읽기

RequestHeader로 값을 받고 ResponseEntity의 header로 응답에 넣는다. 실제 추적 ID는 형식과 길이를 제한하고 로그 삽입 문제도 고려한다.

## 헷갈린 부분과 주의점

사용자가 보낸 관리자 여부 같은 헤더를 무검증으로 권한으로 사용하지 않는다. 보안은 신뢰 경계를 확인한다.

## 복습 문제

요청 헤더와 응답 헤더는 같은 객체인가?

**풀이:** 아니다. 수신한 정보와 서버가 구성한 응답 정보를 구분한다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/javadoc-api/org/springframework/web/bind/annotation/RequestHeader.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Spring 공부 26] RestControllerAdvice로 오류 형식 모으기](/study/2020/spring/26-exception-advice/) · [다음: [Spring 공부 28] Content-Type·Accept와 콘텐츠 협상](/study/2020/spring/28-media-types/)
