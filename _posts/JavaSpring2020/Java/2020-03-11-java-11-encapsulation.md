---
layout: content
title: "[Java 공부 11] 클래스·생성자·접근 제어"
date: 2020-03-11 09:00:00 +0900
categories: [Java2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 11
study_unit: 2
permalink: /study/2020/java/11-encapsulation/
---

클래스·생성자·접근 제어을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

객체의 상태를 private으로 두고 생성자와 메서드에서 허용 조건을 확인한다. 필드를 공개하면 호출자가 검증을 거치지 않고 상태를 바꿀 수 있다.

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
    Counter c=new Counter(2);
    c.increase();
    System.out.println(c.value());
  }
    static class Counter { private int n; Counter(int n){if(n<0)throw new IllegalArgumentException();this.n=n;} void increase(){n++;} int value(){return n;} }
}
```
{% endraw %}

## 확인 결과

```text
3
```

## 코드를 따라 읽기

생성자가 초기값을 받고 increase가 상태 변경을 담당한다. value는 값을 읽는 메서드다. 모든 필드에 무조건 setter를 만들기보다 객체가 수행할 행동으로 표현한다.

## 헷갈린 부분과 주의점

생성 시 유효한 객체가 이후에도 유효하도록 변경 경로를 제한한다. private만 붙여도 모든 설계 문제가 해결되는 것은 아니다.

## 복습 문제

음수 초기값을 막으려면 어디서 확인할까?

**풀이:** 생성자에서 검사해 유효하지 않은 객체 생성을 막을 수 있다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/IllegalArgumentException.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Java 공부 10] 메서드 인자와 값 전달](/study/2020/java/10-methods/) · [다음: [Java 공부 12] 인스턴스 상태와 static 상태](/study/2020/java/12-static/)
