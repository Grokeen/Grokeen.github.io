---
layout: content
title: "[Java 공부 24] Comparator로 여러 정렬 기준 연결하기"
date: 2020-06-10 09:00:00 +0900
categories: [Java2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 24
study_unit: 3
permalink: /study/2020/java/24-comparators/
---

Comparator로 여러 정렬 기준 연결하기을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

첫 기준이 같을 때 다음 기준을 적용하면 동률의 순서를 명확히 할 수 있다. comparingInt와 thenComparing을 사용하면 비교 의도가 드러나고 뺄셈 비교의 오버플로도 피할 수 있다.

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
    List<Person> a=new ArrayList<>(Arrays.asList(new Person("b",20),new Person("a",20),new Person("c",18)));
    a.sort(Comparator.comparingInt((Person p)->p.age).thenComparing(p->p.name));
    for(Person p:a) System.out.println(p.name+":"+p.age);
  }
    static class Person {final String name;final int age;Person(String name,int age){this.name=name;this.age=age;}}
}
```
{% endraw %}

## 확인 결과

```text
c:18
a:20
b:20
```

## 코드를 따라 읽기

나이 18이 먼저이고 나이 20 두 명은 이름 순서다. 안정 정렬에만 의존하기보다 요구 조건에 포함된 동률 기준을 비교 함수에 명시했다.

## 헷갈린 부분과 주의점

Comparator는 일관된 순서를 제공해야 한다. 동일한 두 값을 비교할 때 임의의 결과를 반환하지 않는다.

## 복습 문제

나이만 내림차순으로 바꾸려면?

**풀이:** comparingInt의 결과에 reversed를 적용한 뒤 이름 비교를 연결한다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/Comparator.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Java 공부 23] PriorityQueue와 최소값 우선 처리](/study/2020/java/23-priority-queue/) · [다음: [Java 공부 25] 수정 불가 목록과 고정 크기 목록](/study/2020/java/25-immutable-lists/)
