---
layout: content
title: "[Spring 공부 11] 애플리케이션 이벤트와 내부 알림"
date: 2020-10-24 09:00:00 +0900
categories: [Spring2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 51
study_unit: 7
permalink: /study/2020/spring/11-events/
---

애플리케이션 이벤트와 내부 알림을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11·Spring Boot 2.3.4.RELEASE·Spring Framework 5.2.9.RELEASE 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

Spring 이벤트는 컨텍스트 안의 관심사를 느슨하게 연결할 수 있다. 기본 이벤트 전달은 동기 방식이므로 메시지 브로커나 영속 큐와 같은 전달 보장을 자동 제공하지 않는다.

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
    try (
      AnnotationConfigApplicationContext c = new AnnotationConfigApplicationContext(
        Config.class
      )
    ) {
      c.publishEvent("saved");
      assertEquals("saved", c.getBean(Listener.class).last);
    }
  }

  static class Listener {

    String last;

    @org.springframework.context.event.EventListener
    public void on(String s) {
      last = s;
    }
  }

  @Configuration
  static class Config {

    @Bean
    Listener listener() {
      return new Listener();
    }
  }
}
```
{% endraw %}

## 확인 결과

StudyTest의 검사 1개가 실패 없이 통과해야 한다. 아래 해설의 값·상태·예외를 assertion으로 확인한다. HTTP 예제는 MockMvc를 사용하므로 실제 서버 포트를 열지 않는다.

## 코드를 따라 읽기

문자열 이벤트를 발행하고 @EventListener 메서드가 값을 받았는지 확인한다. 간단한 내부 알림 예제이며 프로세스 종료 후 복구되는 업무 메시지를 구현한 것은 아니다.

## 헷갈린 부분과 주의점

이벤트 수신 중 예외가 발생하거나 오래 걸릴 때 발행자에게 미치는 영향을 검토한다. 비동기 설정은 별도다.

## 복습 문제

이 이벤트는 서버 재시작 후 자동 복원될까?

**풀이:** 아니다. 영속 메시지 저장과 재처리를 별도로 설계해야 한다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/javadoc-api/org/springframework/context/event/EventListener.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Spring 공부 10] Profile로 환경별 Bean 선택하기](/study/2020/spring/10-profiles/) · [다음: [Spring 공부 12] Resource 추상화로 입력 다루기](/study/2020/spring/12-resources/)
