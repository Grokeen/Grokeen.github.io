---
layout: content
title: "[Java 공부 29] Optional의 기본값과 지연 계산"
date: 2020-07-15 09:00:00 +0900
categories: [Java2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 29
study_unit: 4
permalink: /study/2020/java/29-optional/
---

Optional의 기본값과 지연 계산을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

Optional은 값의 부재를 반환 계약에 드러낼 수 있다. orElse는 인자를 먼저 계산하고 orElseGet은 값이 없을 때 공급자를 호출한다. null을 Optional 자체로 반환하지 않는다.

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
    Optional<String> name = Optional.of("java");
    System.out.println(name.map(String::toUpperCase).orElse("NONE"));
    System.out.println(Optional.<String>empty().orElseGet(() -> "fallback"));
  }
}
```
{% endraw %}

## 확인 결과

```text
JAVA
fallback
```

## 코드를 따라 읽기

첫 값은 존재하므로 map의 변환 결과가 나온다. 두 번째는 비어 있어 공급자의 결과를 사용한다. get을 무조건 호출하는 대신 부재 상황을 계약에 맞게 처리한다.

## 헷갈린 부분과 주의점

Optional.of(null)은 예외다. null 가능 값은 ofNullable을 검토한다. 기본값 생성이 비싸면 orElseGet의 지연 여부를 고려한다.

## 복습 문제

빈 Optional에 get을 호출하면?

**풀이:** NoSuchElementException이 발생한다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/Optional.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Java 공부 28] UTF-8 파일 읽기·쓰기와 경로](/study/2020/java/28-files/) · [다음: [Java 공부 30] 람다·함수형 인터페이스·메서드 참조](/study/2020/java/30-lambda/)
