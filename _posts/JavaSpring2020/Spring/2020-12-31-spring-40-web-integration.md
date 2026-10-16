---
layout: content
title: "[Spring 공부 40] 종합 실습: 요청·검증·저장·조회 연결"
date: 2020-12-31 09:00:00 +0900
categories: [Spring2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 80
study_unit: 10
permalink: /study/2020/spring/40-web-integration/
---

종합 실습: 요청·검증·저장·조회 연결을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11·Spring Boot 2.3.4.RELEASE·Spring Framework 5.2.9.RELEASE 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

HTTP 입력과 간단한 저장소를 연결해 성공 응답뿐 아니라 실제 저장된 값도 확인한다. 예제는 인메모리 H2와 MockMvc만 사용하며 운영 서버·인증·배포 구성을 모두 구현한 서비스는 아니다.

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
    org.springframework.jdbc.datasource.embedded.EmbeddedDatabase ds=database();
    try{
     org.springframework.jdbc.core.JdbcTemplate j=new org.springframework.jdbc.core.JdbcTemplate(ds);j.execute("create table note(id integer primary key,title varchar(30))");
     MockMvc mvc=standaloneSetup(new Api(j)).build();
     mvc.perform(post("/notes").contentType(MediaType.APPLICATION_JSON).content("{\"title\":\"study\"}")).andExpect(status().isCreated());
     assertEquals("study",j.queryForObject("select title from note where id=1",String.class));
     mvc.perform(get("/notes/1")).andExpect(content().string("study"));
    }finally{ds.shutdown();}
  }
    public static class Input {@javax.validation.constraints.NotBlank public String title;}
    @RestController static class Api {final org.springframework.jdbc.core.JdbcTemplate j;Api(org.springframework.jdbc.core.JdbcTemplate j){this.j=j;}@PostMapping("/notes") public ResponseEntity<Void> save(@javax.validation.Valid @RequestBody Input in){j.update("insert into note values(?,?)",1,in.title);return ResponseEntity.status(201).build();}@GetMapping("/notes/{id}") public String get(@PathVariable("id") int id){return j.queryForObject("select title from note where id=?",String.class,id);}}
    static org.springframework.jdbc.datasource.embedded.EmbeddedDatabase database(){return new org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder().generateUniqueName(true).setType(org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType.H2).build();}
}
```
{% endraw %}

## 확인 결과

StudyTest의 검사 1개가 실패 없이 통과해야 한다. 아래 해설의 값·상태·예외를 assertion으로 확인한다. HTTP 예제는 MockMvc를 사용하므로 실제 서버 포트를 열지 않는다.

## 코드를 따라 읽기

정상 제목을 보내 201을 받고 DB 조회로 저장을 확인한 뒤 HTTP 조회 결과도 비교한다. 학습을 단순화해 ID는 1로 고정했으므로 반복 생성 정책을 실제 서비스와 동일하다고 생각하면 안 된다.

## 헷갈린 부분과 주의점

운영 구현에는 ID 발급·중복 처리·권한·오류 응답·동시성 등이 더 필요하다. 한 예제 통과로 운영 준비가 끝났다고 판단하지 않는다.

## 복습 문제

응답 코드만 검사하는 것보다 DB를 확인하는 이유는?

**풀이:** 저장이 누락되었는데 성공 응답만 반환하는 결함을 찾을 수 있기 때문이다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/javadoc-api/org/springframework/test/web/servlet/MockMvc.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Spring 공부 39] Transactional 프록시와 런타임 예외](/study/2020/spring/39-transactional/)
