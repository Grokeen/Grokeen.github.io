---
layout: content
title: "[Java 공부 40] 종합 실습: 가상 주문 검증·집계"
date: 2020-09-30 09:00:00 +0900
categories: [Java2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 40
study_unit: 5
permalink: /study/2020/java/40-mini-project/
---

종합 실습: 가상 주문 검증·집계을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

자료 읽기, 검증, 그룹 집계를 작은 단계로 분리하면 실패 위치를 설명하기 쉽다. 이 예제는 가상 주문의 양수 금액만 코드별로 합산하며 실제 결제나 세금 계산을 수행하지 않는다.

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
    List<Order> orders=Arrays.asList(new Order("A",10),new Order("B",20),new Order("A",5),new Order("B",-1));
    Map<String,Integer> totals=orders.stream().filter(o->o.amount>0).collect(Collectors.groupingBy(o->o.code,TreeMap::new,Collectors.summingInt(o->o.amount)));
    System.out.println(totals);
  }
    static class Order {final String code;final int amount;Order(String code,int amount){this.code=code;this.amount=amount;}}
}
```
{% endraw %}

## 확인 결과

```text
{A=15, B=20}
```

## 코드를 따라 읽기

금액이 음수인 한 건을 제외한 뒤 코드별 합계를 구한다. 요구사항이 오류 거부인지 오류 행 제외인지에 따라 처리 방식이 달라진다. 학습 예제는 제외 정책을 명시했다.

## 헷갈린 부분과 주의점

실무에서는 제외 건의 사유와 추적 정보도 필요하다. 큰 금액 합계는 int 범위를 검토하고 정확한 금액 표현을 선택한다.

## 복습 문제

모든 잘못된 입력을 조용히 버리는 것이 정답일까?

**풀이:** 아니다. 거부·격리·보완 등 업무 계약에 맞는 정책을 정해야 한다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/stream/Collectors.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Java 공부 39] CompletableFuture의 변환과 결합](/study/2020/java/39-futures/) · [다음: [Spring 공부 01] Spring 컨테이너와 Bean 조회](/study/2020/spring/01-container/)
