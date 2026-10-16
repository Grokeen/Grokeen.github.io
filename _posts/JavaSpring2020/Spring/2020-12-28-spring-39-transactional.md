---
layout: content
title: "[Spring 공부 39] Transactional 프록시와 런타임 예외"
date: 2020-12-28 09:00:00 +0900
categories: [Spring2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 79
study_unit: 10
permalink: /study/2020/spring/39-transactional/
---

Transactional 프록시와 런타임 예외을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11·Spring Boot 2.3.4.RELEASE·Spring Framework 5.2.9.RELEASE 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

선언적 트랜잭션은 Spring이 만든 프록시를 통해 호출할 때 적용된다. 기본 롤백 규칙과 자기 호출의 한계를 확인한다. 이 예제는 컨테이너에서 서비스 Bean을 조회해 public 메서드를 호출한다.

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
    try(AnnotationConfigApplicationContext c=new AnnotationConfigApplicationContext(Config.class)){
     org.springframework.jdbc.core.JdbcTemplate j=c.getBean(org.springframework.jdbc.core.JdbcTemplate.class);j.execute("create table note(id integer)");
     assertThrows(IllegalStateException.class,()->c.getBean(Service.class).addThenFail());
     assertEquals(0,j.queryForObject("select count(*) from note",Integer.class));
    }
  }
    public static class Service {final org.springframework.jdbc.core.JdbcTemplate j;Service(org.springframework.jdbc.core.JdbcTemplate j){this.j=j;}@org.springframework.transaction.annotation.Transactional public void addThenFail(){j.update("insert into note values(1)");throw new IllegalStateException();}}
    @Configuration @org.springframework.transaction.annotation.EnableTransactionManagement static class Config {@Bean(destroyMethod="shutdown") org.springframework.jdbc.datasource.embedded.EmbeddedDatabase ds(){return database();}@Bean org.springframework.jdbc.core.JdbcTemplate jdbc(javax.sql.DataSource d){return new org.springframework.jdbc.core.JdbcTemplate(d);}@Bean org.springframework.transaction.PlatformTransactionManager transactionManager(javax.sql.DataSource d){return new org.springframework.jdbc.datasource.DataSourceTransactionManager(d);}@Bean Service service(org.springframework.jdbc.core.JdbcTemplate j){return new Service(j);}}
    static org.springframework.jdbc.datasource.embedded.EmbeddedDatabase database(){return new org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder().generateUniqueName(true).setType(org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType.H2).build();}
}
```
{% endraw %}

## 확인 결과

StudyTest의 검사 1개가 실패 없이 통과해야 한다. 아래 해설의 값·상태·예외를 assertion으로 확인한다. HTTP 예제는 MockMvc를 사용하므로 실제 서버 포트를 열지 않는다.

## 코드를 따라 읽기

EnableTransactionManagement와 트랜잭션 매니저를 등록했다. 서비스 호출은 프록시를 거치고 런타임 예외가 나서 삽입이 롤백된다. 단순히 메서드에 어노테이션이 보이는지만 검사하지 않는다.

## 헷갈린 부분과 주의점

동일 객체 안의 자기 호출이나 직접 new한 서비스에는 같은 프록시 동작을 기대하지 않는다. checked 예외의 기본 규칙도 다르다.

## 복습 문제

new Service로 만든 객체도 이 설정의 프록시일까?

**풀이:** 아니다. 컨테이너가 제공하는 프록시 경로와 구분한다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/javadoc-api/org/springframework/transaction/annotation/Transactional.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Spring 공부 38] TransactionTemplate의 롤백 확인](/study/2020/spring/38-transaction-template/) · [다음: [Spring 공부 40] 종합 실습: 요청·검증·저장·조회 연결](/study/2020/spring/40-web-integration/)
