---
layout: content
title: "[Spring 공부 38] TransactionTemplate의 롤백 확인"
date: 2020-12-26 09:00:00 +0900
categories: [Spring2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 78
study_unit: 10
permalink: /study/2020/spring/38-transaction-template/
---

TransactionTemplate의 롤백 확인을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11·Spring Boot 2.3.4.RELEASE·Spring Framework 5.2.9.RELEASE 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

트랜잭션은 여러 변경을 하나의 성공·실패 단위로 묶는다. TransactionTemplate의 콜백에서 예외가 전파되면 이 예제의 삽입은 롤백된다. 예외를 삼키는 경우의 의미를 따로 고려한다.

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
    org.springframework.jdbc.datasource.embedded.EmbeddedDatabase ds = database();
    try {
      org.springframework.jdbc.core.JdbcTemplate j =
        new org.springframework.jdbc.core.JdbcTemplate(ds);
      j.execute("create table note(id integer)");
      org.springframework.transaction.support.TransactionTemplate tx =
        new org.springframework.transaction.support.TransactionTemplate(
          new org.springframework.jdbc.datasource.DataSourceTransactionManager(ds)
        );
      assertThrows(IllegalStateException.class, () ->
        tx.execute(s -> {
          j.update("insert into note values(1)");
          throw new IllegalStateException("stop");
        })
      );
      assertEquals(0, j.queryForObject("select count(*) from note", Integer.class));
    } finally {
      ds.shutdown();
    }
  }

  static org.springframework.jdbc.datasource.embedded.EmbeddedDatabase database() {
    return new org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder()
      .generateUniqueName(true)
      .setType(org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType.H2)
      .build();
  }
}
```
{% endraw %}

## 확인 결과

StudyTest의 검사 1개가 실패 없이 통과해야 한다. 아래 해설의 값·상태·예외를 assertion으로 확인한다. HTTP 예제는 MockMvc를 사용하므로 실제 서버 포트를 열지 않는다.

## 코드를 따라 읽기

삽입 후 의도적으로 런타임 예외를 던지고 종료 뒤 행 수가 0인지 확인한다. 단순히 예외 발생만 검사하지 않고 실제 저장 결과를 조회해 롤백을 확인한다.

## 헷갈린 부분과 주의점

트랜잭션 매니저와 JdbcTemplate가 같은 DataSource를 사용해야 한다. 외부 HTTP 호출까지 자동 롤백되는 것은 아니다.

## 복습 문제

서로 다른 DB 연결을 임의로 만들면 같은 트랜잭션일까?

**풀이:** 자동으로 같아지지 않는다. 자원과 매니저의 연결을 확인한다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.spring.io/spring-framework/docs/5.2.9.RELEASE/javadoc-api/org/springframework/transaction/support/TransactionTemplate.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Spring 공부 37] SQL 매개변수 바인딩과 문자열 결합](/study/2020/spring/37-sql-parameters/) · [다음: [Spring 공부 39] Transactional 프록시와 런타임 예외](/study/2020/spring/39-transactional/)
