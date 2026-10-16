---
layout: content
title: "[Java 공부 33] groupingBy와 그룹별 집계"
date: 2020-08-12 09:00:00 +0900
categories: [Java2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 33
study_unit: 5
permalink: /study/2020/java/33-grouping/
---

groupingBy와 그룹별 집계을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

분류 키로 원소를 모으고 downstream collector로 각 그룹의 집계를 정할 수 있다. 그룹 결과 Map의 출력 순서가 중요하면 Map 공급자도 명시한다.

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
    Map<Integer, Long> groups = Stream.of("a", "bb", "c").collect(
      Collectors.groupingBy(String::length, TreeMap::new, Collectors.counting())
    );
    System.out.println(groups);
  }
}
```
{% endraw %}

## 확인 결과

```text
{1=2, 2=1}
```

## 코드를 따라 읽기

길이 1인 문자열 두 개, 길이 2인 문자열 한 개를 집계했다. TreeMap 공급자로 키 순서를 정했다. 그룹별 원소 전체가 필요하지 않다면 counting으로 불필요한 목록을 만들지 않을 수 있다.

## 헷갈린 부분과 주의점

중복 키를 toMap으로 수집할 때는 병합 규칙이 없으면 예외가 날 수 있다. groupingBy와 목적을 구분한다.

## 복습 문제

길이 3인 문자열 하나를 추가하면?

**풀이:** 키 3에 개수 1인 항목이 생긴다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/stream/Collectors.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Java 공부 32] 기본형 스트림과 합계·평균](/study/2020/java/32-stream-aggregate/) · [다음: [Java 공부 34] LocalDate와 날짜 계산](/study/2020/java/34-date-time/)
