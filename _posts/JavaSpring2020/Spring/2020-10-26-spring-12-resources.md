---
layout: content
title: "[Spring 공부 12] Resource 추상화로 입력 다루기"
date: 2020-10-26 09:00:00 +0900
categories: [Spring2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 52
study_unit: 7
permalink: /study/2020/spring/12-resources/
---

Resource 추상화로 입력 다루기을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11·Spring Boot 2.3.4.RELEASE·Spring Framework 5.2.9.RELEASE 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

Resource는 파일·클래스패스 등 다양한 입력을 공통 방식으로 다루게 한다. 모든 Resource가 로컬 File로 변환 가능한 것은 아니므로 InputStream 사용 여부를 먼저 검토한다.

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
    org.springframework.core.io.Resource r =
      new org.springframework.core.io.ByteArrayResource(
        "note".getBytes(java.nio.charset.StandardCharsets.UTF_8)
      );
    try (java.io.InputStream in = r.getInputStream()) {
      assertEquals(
        "note",
        new String(in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8)
      );
    }
  }
}
```
{% endraw %}

## 확인 결과

StudyTest의 검사 1개가 실패 없이 통과해야 한다. 아래 해설의 값·상태·예외를 assertion으로 확인한다. HTTP 예제는 MockMvc를 사용하므로 실제 서버 포트를 열지 않는다.

## 코드를 따라 읽기

메모리의 UTF-8 바이트를 Resource로 감싸 스트림으로 읽는다. 파일 경로와 운영체제에 의존하지 않는 예제다. 입력 스트림은 try-with-resources로 닫는다.

## 헷갈린 부분과 주의점

JAR 내부 클래스패스 자원에 무조건 getFile을 호출하면 실패할 수 있다. 대용량 입력을 readAllBytes로 전부 읽을지도 검토한다.

## 복습 문제

Resource는 항상 디스크 파일일까?

**풀이:** 아니다. 메모리나 클래스패스 등 다양한 자원을 표현한다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/javadoc-api/org/springframework/core/io/Resource.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Spring 공부 11] 애플리케이션 이벤트와 내부 알림](/study/2020/spring/11-events/) · [다음: [Spring 공부 13] ApplicationContextRunner로 작은 설정 검사](/study/2020/spring/13-context-runner/)
