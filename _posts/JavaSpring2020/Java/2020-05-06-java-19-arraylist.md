---
layout: content
title: "[Java 공부 19] ArrayList의 추가·조회·삭제"
date: 2020-05-06 09:00:00 +0900
categories: [Java2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 19
study_unit: 3
permalink: /study/2020/java/19-arraylist/
---

ArrayList의 추가·조회·삭제을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

ArrayList는 인덱스로 원소를 조회하는 가변 길이 목록이다. Integer 목록의 remove에는 인덱스 삭제와 값 삭제가 있어 호출 형태를 구분해야 한다.

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
    List<Integer> a = new ArrayList<>(Arrays.asList(10, 20, 30));
    a.remove(1);
    a.remove(Integer.valueOf(10));
    System.out.println(a);
  }
}
```
{% endraw %}

## 확인 결과

```text
[30]
```

## 코드를 따라 읽기

remove(1)은 인덱스 1의 20을 지운다. Integer.valueOf(10)은 값 10을 대상으로 한다. 삭제 후 뒤쪽 원소의 인덱스가 당겨지는 점도 확인한다.

## 헷갈린 부분과 주의점

반복 중 직접 삭제하면 순회 오류가 발생할 수 있다. 목적에 따라 Iterator.remove나 removeIf를 사용한다.

## 복습 문제

원소 20을 값으로 삭제하려면?

**풀이:** remove(Integer.valueOf(20))처럼 Object 인자를 명시한다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/ArrayList.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Java 공부 18] 와일드카드와 읽기·쓰기 경계](/study/2020/java/18-wildcards/) · [다음: [Java 공부 20] Map으로 빈도 집계하기](/study/2020/java/20-maps/)
