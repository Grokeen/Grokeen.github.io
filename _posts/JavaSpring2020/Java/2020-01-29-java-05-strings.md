---
layout: content
title: "[Java 공부 05] 문자열 동등성과 불변성"
date: 2020-01-29 09:00:00 +0900
categories: [Java2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 5
study_unit: 1
permalink: /study/2020/java/05-strings/
---

문자열 동등성과 불변성을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

String의 ==는 같은 참조인지 확인하고 equals는 내용을 비교한다. 문자열 변경처럼 보이는 메서드도 기존 객체를 바꾸지 않고 새 문자열을 반환한다.

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
    String a=new String("note");
    String b=new String("note");
    System.out.println(a==b);
    System.out.println(a.equals(b));
    a.toUpperCase(Locale.ROOT);
    System.out.println(a);
  }

}
```
{% endraw %}

## 확인 결과

```text
false
true
note
```

## 코드를 따라 읽기

두 객체를 따로 만들었으므로 참조 비교는 false다. 내용 비교는 true다. 대문자 변환 결과를 변수에 다시 대입하지 않았기 때문에 a는 원래 내용이다.

## 헷갈린 부분과 주의점

문자열 리터럴 풀 때문에 ==가 우연히 true인 예제만 보고 내용 비교에 사용하면 안 된다. null 가능성도 확인한다.

## 복습 문제

대문자 문자열을 보관하려면?

**풀이:** a=a.toUpperCase(Locale.ROOT)처럼 반환값을 사용한다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/String.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Java 공부 04] BigDecimal로 소수 금액 계산하기](/study/2020/java/04-decimal/) · [다음: [Java 공부 06] 반복 문자열 생성과 StringBuilder](/study/2020/java/06-builder/)
