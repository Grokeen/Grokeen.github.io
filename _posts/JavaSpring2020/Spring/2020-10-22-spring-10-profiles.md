---
layout: content
title: "[Spring 공부 10] Profile로 환경별 Bean 선택하기"
date: 2020-10-22 09:00:00 +0900
categories: [Spring2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 50
study_unit: 7
permalink: /study/2020/spring/10-profiles/
---

Profile로 환경별 Bean 선택하기을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11·Spring Boot 2.3.4.RELEASE·Spring Framework 5.2.9.RELEASE 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

프로필은 조건에 맞는 Bean 설정을 활성화한다. 개발·테스트·운영의 차이를 표현할 수 있지만 프로필 이름만으로 보안 경계나 비밀 관리가 해결되지는 않는다.

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
    try(AnnotationConfigApplicationContext c=new AnnotationConfigApplicationContext()){
     c.getEnvironment().setActiveProfiles("test");c.register(Config.class);c.refresh();
     assertEquals("memory",c.getBean(String.class));
    }
  }
    @Configuration static class Config {@Bean @Profile("test") String memory(){return "memory";}@Bean @Profile("prod") String remote(){return "remote";}}
}
```
{% endraw %}

## 확인 결과

StudyTest의 검사 1개가 실패 없이 통과해야 한다. 아래 해설의 값·상태·예외를 assertion으로 확인한다. HTTP 예제는 MockMvc를 사용하므로 실제 서버 포트를 열지 않는다.

## 코드를 따라 읽기

활성 프로필을 refresh 이전에 지정했다. test 프로필의 memory Bean만 등록되며 prod Bean은 빠진다. 테스트가 실제 운영 자원을 쓰지 않도록 설정을 분리하는 기본 연습이다.

## 헷갈린 부분과 주의점

여러 프로필을 함께 켜면 동일 타입 후보가 늘 수 있다. 프로필 조합의 유효성을 확인한다.

## 복습 문제

활성 프로필은 언제 정하는 것이 안전할까?

**풀이:** 컨텍스트가 Bean을 구성하기 전 초기화 단계에서 지정한다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/javadoc-api/org/springframework/context/annotation/Profile.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Spring 공부 09] Environment에서 설정값 읽기](/study/2020/spring/09-properties/) · [다음: [Spring 공부 11] 애플리케이션 이벤트와 내부 알림](/study/2020/spring/11-events/)
