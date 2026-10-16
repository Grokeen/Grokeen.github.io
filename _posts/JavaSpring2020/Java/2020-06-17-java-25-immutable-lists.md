---
layout: content
title: "[Java 공부 25] 수정 불가 목록과 고정 크기 목록"
date: 2020-06-17 09:00:00 +0900
categories: [Java2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 25
study_unit: 4
permalink: /study/2020/java/25-immutable-lists/
---

수정 불가 목록과 고정 크기 목록을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

List.of는 수정 불가 목록을 만들고 Arrays.asList는 배열 기반의 고정 크기 목록을 만든다. 둘 다 add는 불가능하지만 set 가능 여부는 다르다.

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
    List<String> fixed = Arrays.asList("a", "b");
    fixed.set(0, "x");
    System.out.println(fixed);
    List<String> frozen = List.of("a", "b");
    try {
      frozen.set(0, "x");
    } catch (UnsupportedOperationException e) {
      System.out.println("blocked");
    }
  }
}
```
{% endraw %}

## 확인 결과

```text
[x, b]
blocked
```

## 코드를 따라 읽기

fixed는 크기를 바꾸지 않는 원소 교체가 가능하다. frozen은 원소 교체도 허용하지 않는다. 변경 가능한 목록이 필요하면 new ArrayList로 복사한다.

## 헷갈린 부분과 주의점

수정 불가 목록에 들어 있는 가변 객체 자체의 변경까지 막는 것은 아니다. List.of는 null 원소도 허용하지 않는다.

## 복습 문제

Arrays.asList에 add하면?

**풀이:** UnsupportedOperationException이 발생한다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/List.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Java 공부 24] Comparator로 여러 정렬 기준 연결하기](/study/2020/java/24-comparators/) · [다음: [Java 공부 26] 예외를 정상 결과와 구분하기](/study/2020/java/26-exceptions/)
