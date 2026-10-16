---
layout: content
title: "[Java 공부 03] 정수 오버플로와 연산 순서"
date: 2020-01-15 09:00:00 +0900
categories: [Java2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 3
study_unit: 1
permalink: /study/2020/java/03-overflow/
---

정수 오버플로와 연산 순서을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

int끼리 먼저 계산하면 결과를 long에 넣더라도 이미 오버플로가 난 뒤일 수 있다. 연산 이전에 피연산자를 long으로 승격해야 한다.

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
    int n=50000;
    long wrong=n*n;
    long right=1L*n*n;
    System.out.println(wrong);
    System.out.println(right);
  }

}
```
{% endraw %}

## 확인 결과

```text
-1794967296
2500000000
```

## 코드를 따라 읽기

첫 곱셈은 int 범위에서 실행된다. 1L을 앞에 두면 long 연산이 이어져 25억을 표현한다. 중간 결과의 자료형을 식 단위로 확인하는 습관이 중요하다.

## 헷갈린 부분과 주의점

결과 변수만 long으로 바꾸는 것으로 충분하지 않다. 곱셈 여러 번이면 최종 long 범위도 확인한다.

## 복습 문제

Math.multiplyExact(int,int)는 범위를 넘으면?

**풀이:** 조용히 잘못된 값을 주는 대신 ArithmeticException을 발생시킨다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/Math.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Java 공부 02] 기본형·참조형·배열 복사의 차이](/study/2020/java/02-types/) · [다음: [Java 공부 04] BigDecimal로 소수 금액 계산하기](/study/2020/java/04-decimal/)
