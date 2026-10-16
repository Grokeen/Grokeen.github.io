---
layout: content
title: "[Java 공부 13] 상속·오버라이딩·동적 호출"
date: 2020-03-25 09:00:00 +0900
categories: [Java2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 13
study_unit: 2
permalink: /study/2020/java/13-inheritance/
---

상속·오버라이딩·동적 호출을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

상위 타입 변수로 하위 객체를 참조해도 오버라이딩한 인스턴스 메서드는 실제 객체의 구현이 실행된다. 필드 접근과 static 메서드는 같은 규칙으로 일반화하면 안 된다.

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
    Animal a = new Cat();
    System.out.println(a.sound());
  }

  static class Animal {

    String sound() {
      return "?";
    }
  }

  static class Cat extends Animal {

    @Override
    String sound() {
      return "meow";
    }
  }
}
```
{% endraw %}

## 확인 결과

```text
meow
```

## 코드를 따라 읽기

변수 타입은 Animal이지만 객체는 Cat이므로 Cat.sound가 호출된다. @Override는 상위 메서드를 올바르게 재정의했는지 컴파일러가 확인하도록 돕는다.

## 헷갈린 부분과 주의점

상속은 단순 코드 재사용보다 대체 가능한 관계인지 검토한다. 메서드 이름만 같고 매개변수가 다르면 오버로딩일 수 있다.

## 복습 문제

sound의 매개변수를 추가하면 같은 오버라이드일까?

**풀이:** 아니다. 서명이 달라져 별도 오버로드가 될 수 있다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/Override.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Java 공부 12] 인스턴스 상태와 static 상태](/study/2020/java/12-static/) · [다음: [Java 공부 14] 인터페이스로 구현 교체하기](/study/2020/java/14-interfaces/)
