---
layout: content
title: "[Java 공부 39] CompletableFuture의 변환과 결합"
date: 2020-09-23 09:00:00 +0900
categories: [Java2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 39
study_unit: 5
permalink: /study/2020/java/39-futures/
---

CompletableFuture의 변환과 결합을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

CompletableFuture는 나중에 완료될 결과를 표현한다. thenApply는 결과 변환, thenCombine은 두 결과 결합에 사용한다. 실패 처리와 실행기를 별도로 설계해야 한다.

## 따라 해 보기

아래 전체를 UTF-8 Main.java로 저장한 뒤 javac --release 11 -encoding UTF-8 Main.java, java -Dfile.encoding=UTF-8 Main으로 실행한다.

{% raw %}
```java
import java.util.*;
import java.util.stream.*;
import java.math.*;
import java.io.*;
import java.nio.file.*;
import java.nio.charset.StandardCharsets;
import java.time.*;

public class Main {
  public static void main(String[] args) throws Exception {
    java.util.concurrent.CompletableFuture<Integer> a=java.util.concurrent.CompletableFuture.completedFuture(3);
    java.util.concurrent.CompletableFuture<Integer> b=java.util.concurrent.CompletableFuture.completedFuture(4);
    System.out.println(a.thenCombine(b,Integer::sum).thenApply(n->n*2).join());
  }

}
```
{% endraw %}

## 확인 결과

```text
14
```

## 코드를 따라 읽기

완료된 값 3과 4를 합해 7을 만들고 두 배로 변환한다. 예제는 흐름을 보기 위해 이미 완료된 future를 사용해 비결정적인 시간 측정을 하지 않는다.

## 헷갈린 부분과 주의점

join은 결과를 기다리며 실패 시 CompletionException이 전파될 수 있다. 비동기라고 모든 호출이 자동으로 병렬·비차단인 것은 아니다.

## 복습 문제

thenApply의 함수가 future를 반환하면?

**풀이:** 중첩 future가 생길 수 있어 연결 목적이면 thenCompose를 검토한다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/concurrent/CompletableFuture.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Java 공부 38] 공유 카운터와 AtomicInteger](/study/2020/java/38-synchronization/) · [다음: [Java 공부 40] 종합 실습: 가상 주문 검증·집계](/study/2020/java/40-mini-project/)
