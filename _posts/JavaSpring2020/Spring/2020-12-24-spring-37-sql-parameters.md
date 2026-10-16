---
layout: content
title: "[Spring 공부 37] SQL 매개변수 바인딩과 문자열 결합"
date: 2020-12-24 09:00:00 +0900
categories: [Spring2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 77
study_unit: 10
permalink: /study/2020/spring/37-sql-parameters/
---

SQL 매개변수 바인딩과 문자열 결합을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11·Spring Boot 2.3.4.RELEASE·Spring Framework 5.2.9.RELEASE 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

입력값을 SQL 문장에 문자열로 붙이면 문장 구조와 데이터가 섞인다. 바인딩 매개변수를 사용해 값을 전달하고 테이블명·정렬 컬럼처럼 매개변수로 대체할 수 없는 구조는 허용 목록으로 통제한다.

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
     org.springframework.jdbc.core.JdbcTemplate j=new org.springframework.jdbc.core.JdbcTemplate(ds);
     j.execute("create table note(title varchar(100))");j.update("insert into note values(?)","safe");
     String input="x' OR '1'='1";
     assertEquals(0,j.queryForObject("select count(*) from note where title=?",Integer.class,input));
    }finally{ds.shutdown();}
  }
    static org.springframework.jdbc.datasource.embedded.EmbeddedDatabase database(){return new org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder().generateUniqueName(true).setType(org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType.H2).build();}
}
```
{% endraw %}

## 확인 결과

StudyTest의 검사 1개가 실패 없이 통과해야 한다. 아래 해설의 값·상태·예외를 assertion으로 확인한다. HTTP 예제는 MockMvc를 사용하므로 실제 서버 포트를 열지 않는다.

## 코드를 따라 읽기

공격 형태의 문자열도 값으로 전달되어 일치하는 제목이 없으므로 0건이다. 바인딩이 SQL 구조와 값을 분리하는 이유를 확인한다. 임의의 SQL 문자열 결합을 안전하다고 설명하지 않는다.

## 헷갈린 부분과 주의점

매개변수 바인딩은 권한 검사를 대신하지 않는다. LIMIT나 컬럼 이름 처리도 DB와 API 계약에 맞게 확인한다.

## 복습 문제

ORDER BY 컬럼 이름을 ? 값으로 넘기면 원하는 식별자가 될까?

**풀이:** 일반적으로 값 바인딩과 식별자 선택은 다르므로 허용 목록으로 구조를 선택한다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/javadoc-api/org/springframework/jdbc/core/JdbcOperations.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Spring 공부 36] JdbcTemplate로 저장·조회하기](/study/2020/spring/36-jdbc-template/) · [다음: [Spring 공부 38] TransactionTemplate의 롤백 확인](/study/2020/spring/38-transaction-template/)
