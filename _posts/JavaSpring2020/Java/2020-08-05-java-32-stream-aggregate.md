---
layout: content
title: "[Java 공부 32] 기본형 스트림과 합계·평균"
date: 2020-08-05 09:00:00 +0900
categories: [Java2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 32
study_unit: 4
permalink: /study/2020/java/32-stream-aggregate/
---

기본형 스트림과 합계·평균을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

mapToInt는 Integer 객체 스트림을 기본형 int 스트림으로 바꾼다. 합계, 평균, 통계 연산을 제공하지만 빈 입력의 결과가 연산마다 다르므로 확인해야 한다.

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
    IntSummaryStatistics s = Stream.of("a", "bbb", "cc")
      .mapToInt(String::length)
      .summaryStatistics();
    System.out.println(s.getCount() + " " + s.getSum());
    System.out.println(s.getMax());
  }
}
```
{% endraw %}

## 확인 결과

```text
3 6
3
```

## 코드를 따라 읽기

문자열 길이 1,3,2의 개수는 3이고 합은 6이다. 통계 객체로 여러 값을 한 번의 순회에서 얻는다. getMax의 빈 입력 값은 실제 최댓값으로 오해하지 않도록 개수와 함께 판단한다.

## 헷갈린 부분과 주의점

int 합계가 범위를 넘을 수 있으면 mapToLong 등 적절한 자료형을 선택한다. 평균의 빈 OptionalDouble 처리도 필요하다.

## 복습 문제

빈 IntStream의 sum은?

**풀이:** 덧셈의 항등값인 0이다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/IntSummaryStatistics.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Java 공부 31] Stream의 filter·map·최종 연산](/study/2020/java/31-stream-filter/) · [다음: [Java 공부 33] groupingBy와 그룹별 집계](/study/2020/java/33-grouping/)
