---
layout: content
title: "[Java 공부 17] 제네릭으로 컬렉션의 원소 타입 정하기"
date: 2020-04-22 09:00:00 +0900
categories: [Java2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 17
study_unit: 3
permalink: /study/2020/java/17-generics/
---

제네릭으로 컬렉션의 원소 타입 정하기을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

제네릭은 컴파일 단계에서 타입을 검사하게 한다. List<String>에서 읽은 원소는 불필요한 강제 형변환 없이 String으로 사용할 수 있다.

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
    List<String> names=new ArrayList<>();
    names.add("java");
    System.out.println(names.get(0).length());
  }

}
```
{% endraw %}

## 확인 결과

```text
4
```

## 코드를 따라 읽기

다이아몬드 연산자가 생성자의 타입 인자를 추론한다. 정수를 add하려 하면 컴파일 오류가 나므로 실행 중 잘못된 형변환으로 발견하는 일을 줄일 수 있다.

## 헷갈린 부분과 주의점

원시 타입 List를 섞으면 타입 안전성을 잃는다. 제네릭 타입 인자로 int 대신 Integer 같은 참조형을 사용한다.

## 복습 문제

List<String>에 3을 추가할 수 있을까?

**풀이:** 컴파일 단계에서 허용되지 않는다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/List.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Java 공부 16] enum으로 허용된 상태 표현하기](/study/2020/java/16-enum/) · [다음: [Java 공부 18] 와일드카드와 읽기·쓰기 경계](/study/2020/java/18-wildcards/)
