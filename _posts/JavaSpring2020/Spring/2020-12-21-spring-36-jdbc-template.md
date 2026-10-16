---
layout: content
title: "[Spring 공부 36] JdbcTemplate로 저장·조회하기"
date: 2020-12-21 09:00:00 +0900
categories: [Spring2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 76
study_unit: 10
permalink: /study/2020/spring/36-jdbc-template/
---

JdbcTemplate로 저장·조회하기을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11·Spring Boot 2.3.4.RELEASE·Spring Framework 5.2.9.RELEASE 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

JdbcTemplate는 JDBC 자원 처리와 예외 변환을 도와준다. SQL 자체의 의미와 스키마 설계는 여전히 작성자가 확인해야 한다. 예제는 각 테스트마다 생성한 독립 인메모리 H2를 사용한다.

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
     org.springframework.jdbc.core.JdbcTemplate jdbc=new org.springframework.jdbc.core.JdbcTemplate(ds);
     jdbc.execute("create table note(id integer primary key,title varchar(30))");
     assertEquals(1,jdbc.update("insert into note values(?,?)",1,"study"));
     assertEquals("study",jdbc.queryForObject("select title from note where id=?",String.class,1));
    }finally{ds.shutdown();}
  }
    static org.springframework.jdbc.datasource.embedded.EmbeddedDatabase database(){return new org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder().generateUniqueName(true).setType(org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType.H2).build();}
}
```
{% endraw %}

## 확인 결과

StudyTest의 검사 1개가 실패 없이 통과해야 한다. 아래 해설의 값·상태·예외를 assertion으로 확인한다. HTTP 예제는 MockMvc를 사용하므로 실제 서버 포트를 열지 않는다.

## 코드를 따라 읽기

테이블 생성 후 바인딩 매개변수로 한 건을 넣고 제목을 조회한다. update의 반환값은 영향 받은 행 수다. 종료 시 테스트 DB를 닫아 외부 운영 DB와 완전히 분리한다.

## 헷갈린 부분과 주의점

H2 통과가 모든 DB 방언과 운영 동시성의 호환성을 의미하지 않는다. 실제 대상 DB 통합 검사가 별도로 필요하다.

## 복습 문제

update 결과 1은 생성된 ID인가?

**풀이:** 아니다. 여기서는 영향 받은 행 수다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/javadoc-api/org/springframework/jdbc/core/JdbcTemplate.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Spring 공부 35] 페이지 요청의 범위와 기본값](/study/2020/spring/35-pagination/) · [다음: [Spring 공부 37] SQL 매개변수 바인딩과 문자열 결합](/study/2020/spring/37-sql-parameters/)
