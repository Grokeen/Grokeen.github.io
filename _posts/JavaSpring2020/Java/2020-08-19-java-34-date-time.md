---
layout: content
title: "[Java 공부 34] LocalDate와 날짜 계산"
date: 2020-08-19 09:00:00 +0900
categories: [Java2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 34
study_unit: 5
permalink: /study/2020/java/34-date-time/
---

LocalDate와 날짜 계산을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

LocalDate는 시간대나 시각이 없는 달력 날짜다. 날짜를 문자열로 잘라 계산하는 대신 plusDays 같은 달력 연산을 사용하면 월말·윤년 처리를 API에 맡길 수 있다.

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
    LocalDate day = LocalDate.of(2020, 2, 28);
    System.out.println(day.plusDays(1));
    System.out.println(day.plusDays(2));
  }
}
```
{% endraw %}

## 확인 결과

```text
2020-02-29
2020-03-01
```

## 코드를 따라 읽기

2020년은 윤년이므로 다음 날이 2월 29일이다. plusDays는 원본을 변경하지 않고 새 LocalDate를 반환한다. 날짜와 특정 지역의 자정 순간은 같은 타입이 아니다.

## 헷갈린 부분과 주의점

날짜만 있는 정보를 무조건 UTC 자정으로 변환하면 지역에 따라 표시 날짜가 달라질 수 있다.

## 복습 문제

plusDays 후 원래 day는 변할까?

**풀이:** 불변 객체이므로 2020-02-28로 남는다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/time/LocalDate.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Java 공부 33] groupingBy와 그룹별 집계](/study/2020/java/33-grouping/) · [다음: [Java 공부 35] Instant·OffsetDateTime·시간대](/study/2020/java/35-zones/)
