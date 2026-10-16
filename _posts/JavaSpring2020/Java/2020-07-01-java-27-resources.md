---
layout: content
title: "[Java 공부 27] try-with-resources와 자원 종료"
date: 2020-07-01 09:00:00 +0900
categories: [Java2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 27
study_unit: 4
permalink: /study/2020/java/27-resources/
---

try-with-resources와 자원 종료을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

AutoCloseable 자원은 try-with-resources에 선언해 정상 종료와 예외 상황 모두에서 close가 호출되도록 한다. 파일·스트림 등 외부 자원은 참조가 사라지는 것만으로 즉시 해제된다고 가정하지 않는다.

## 따라 해 보기

아래 전체를 UTF-8 Main.java로 저장한 뒤 javac --release 11 -encoding UTF-8 Main.java, java -Dfile.encoding=UTF-8 Main으로 실행한다.

{% raw %}
```java
import java.io.*;
import java.math.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.time.*;
import java.util.*;
import java.util.stream.*;

public class Main {

  public static void main(String[] args) throws Exception {
    try (BufferedReader reader = new BufferedReader(new StringReader("first\nsecond"))) {
      System.out.println(reader.readLine());
      System.out.println(reader.readLine());
    }
  }
}
```
{% endraw %}

## 확인 결과

```text
first
second
```

## 코드를 따라 읽기

문자열을 읽는 Reader를 예제로 사용해 실제 파일에 의존하지 않는다. 블록이 끝나면 reader가 닫힌다. 여러 자원은 선언의 역순으로 종료된다.

## 헷갈린 부분과 주의점

close 중 예외와 본문 예외가 함께 생기면 suppressed 예외도 확인할 수 있다. System.in 같은 공유 자원을 무심코 닫지 않는다.

## 복습 문제

본문에서 예외가 나도 close가 실행될까?

**풀이:** try-with-resources가 관리하는 자원은 종료 처리가 수행된다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/AutoCloseable.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Java 공부 26] 예외를 정상 결과와 구분하기](/study/2020/java/26-exceptions/) · [다음: [Java 공부 28] UTF-8 파일 읽기·쓰기와 경로](/study/2020/java/28-files/)
