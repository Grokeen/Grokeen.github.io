---
layout: content
title: "[Java 공부 18] 와일드카드와 읽기·쓰기 경계"
date: 2020-04-29 09:00:00 +0900
categories: [Java2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 18
study_unit: 3
permalink: /study/2020/java/18-wildcards/
---

와일드카드와 읽기·쓰기 경계을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

? extends Number는 Number의 어떤 하위 타입인지 모르는 목록이다. 값을 Number로 읽을 수 있지만 Integer를 마음대로 추가할 수는 없다. ? super Integer는 Integer를 넣는 용도로 사용할 수 있다.

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
    List<Integer> values = Arrays.asList(2, 3);
    System.out.println(sumNumbers(values));
  }

  static int sumNumbers(List<? extends Number> values) {
    int sum = 0;
    for (Number n : values) sum += n.intValue();
    return sum;
  }
}
```
{% endraw %}

## 확인 결과

```text
5
```

## 코드를 따라 읽기

메서드는 Integer 목록도 Number 목록도 받아 숫자를 읽는다. 실제 원소 타입이 무엇인지 모르므로 새 숫자를 추가하지 않는다. 생산자는 extends, 소비자는 super라는 기준을 연습한다.

## 헷갈린 부분과 주의점

List<Integer>는 List<Number>의 하위 타입이 아니다. 타입 인자와 클래스 상속을 동일하게 취급하지 않는다.

## 복습 문제

extends 목록에서 읽은 값을 어떤 타입으로 받을까?

**풀이:** 상한인 Number로 안전하게 받을 수 있다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/Number.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Java 공부 17] 제네릭으로 컬렉션의 원소 타입 정하기](/study/2020/java/17-generics/) · [다음: [Java 공부 19] ArrayList의 추가·조회·삭제](/study/2020/java/19-arraylist/)
