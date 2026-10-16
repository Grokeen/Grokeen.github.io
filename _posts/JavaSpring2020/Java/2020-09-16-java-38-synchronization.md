---
layout: content
title: "[Java 공부 38] 공유 카운터와 AtomicInteger"
date: 2020-09-16 09:00:00 +0900
categories: [Java2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 38
study_unit: 5
permalink: /study/2020/java/38-synchronization/
---

공유 카운터와 AtomicInteger을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

여러 스레드가 같은 int에 ++를 수행하면 읽기·계산·쓰기가 하나의 원자 연산이 아니어서 갱신을 잃을 수 있다. 단일 카운터의 원자적 증가에는 AtomicInteger를 사용할 수 있다.

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
    java.util.concurrent.atomic.AtomicInteger count =
      new java.util.concurrent.atomic.AtomicInteger();
    Thread a = new Thread(() -> {
      for (int i = 0; i < 1000; i++) count.incrementAndGet();
    });
    Thread b = new Thread(() -> {
      for (int i = 0; i < 1000; i++) count.incrementAndGet();
    });
    a.start();
    b.start();
    a.join();
    b.join();
    System.out.println(count.get());
  }
}
```
{% endraw %}

## 확인 결과

```text
2000
```

## 코드를 따라 읽기

두 스레드가 각각 1000번 증가시키고 join으로 둘의 종료를 기다린다. 원자적 증가가 개별 갱신 손실을 막는다. 여러 필드를 함께 변경하는 규칙은 AtomicInteger 하나로 해결되지 않는다.

## 헷갈린 부분과 주의점

volatile은 가시성에 관한 기능이며 ++ 전체를 원자적으로 만들지 않는다. 실행 순서를 우연한 sleep으로 맞추지 않는다.

## 복습 문제

join을 빼면 출력이 언제나 2000일까?

**풀이:** 아니다. 작업이 끝나기 전에 값을 읽을 수 있다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/concurrent/atomic/AtomicInteger.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Java 공부 37] 문자 수·UTF-8 바이트 수 구분하기](/study/2020/java/37-utf8/) · [다음: [Java 공부 39] CompletableFuture의 변환과 결합](/study/2020/java/39-futures/)
