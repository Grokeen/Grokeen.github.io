---
layout: content
title: "[Spring 공부 13] ApplicationContextRunner로 작은 설정 검사"
date: 2020-10-29 09:00:00 +0900
categories: [Spring2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 53
study_unit: 7
permalink: /study/2020/spring/13-context-runner/
---

ApplicationContextRunner로 작은 설정 검사을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11·Spring Boot 2.3.4.RELEASE·Spring Framework 5.2.9.RELEASE 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

Spring Boot의 ApplicationContextRunner는 테스트마다 필요한 설정과 속성을 지정해 컨텍스트를 검증한다. 전체 서버를 띄우지 않고 자동 설정이나 Bean 조건을 확인할 때 유용하다.

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
    new org.springframework.boot.test.context.runner.ApplicationContextRunner().withUserConfiguration(Config.class).run(c->{
     assertEquals("ok",c.getBean(String.class));
    });
  }
    @Configuration static class Config {@Bean String value(){return "ok";}}
}
```
{% endraw %}

## 확인 결과

StudyTest의 검사 1개가 실패 없이 통과해야 한다. 아래 해설의 값·상태·예외를 assertion으로 확인한다. HTTP 예제는 MockMvc를 사용하므로 실제 서버 포트를 열지 않는다.

## 코드를 따라 읽기

runner가 컨텍스트를 만들고 콜백이 끝나면 정리한다. 실제 HTTP 서버는 시작하지 않는다. 필요한 구성만 넣어 설정 오류를 좁은 범위에서 찾는 연습이다.

## 헷갈린 부분과 주의점

작은 컨텍스트 검사가 모든 운영 설정과 네트워크 연결을 검증하는 것은 아니다. 검사 범위를 구분한다.

## 복습 문제

테스트 뒤 컨텍스트를 매번 직접 닫아야 할까?

**풀이:** runner가 콜백 종료 후 정리하는 흐름을 제공한다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.spring.io/spring-boot/docs/2.3.4.RELEASE/api/org/springframework/boot/test/context/runner/ApplicationContextRunner.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Spring 공부 12] Resource 추상화로 입력 다루기](/study/2020/spring/12-resources/) · [다음: [Spring 공부 14] ConfigurationProperties로 묶음 설정 바인딩](/study/2020/spring/14-configuration-properties/)
