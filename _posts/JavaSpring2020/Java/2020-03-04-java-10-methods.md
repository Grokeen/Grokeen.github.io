---
layout: content
title: "[Java 공부 10] 메서드 인자와 값 전달"
date: 2020-03-04 09:00:00 +0900
categories: [Java2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 10
study_unit: 2
permalink: /study/2020/java/10-methods/
---

메서드 인자와 값 전달을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

Java는 인자 값을 전달한다. 참조형도 참조 값이 복사되므로 전달받은 객체를 바꾸는 것과 매개변수에 다른 객체를 대입하는 것은 효과가 다르다.

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
    int[] a={1};
    change(a);
    System.out.println(a[0]);
  }
    static void change(int[] a){a[0]=7; a=new int[]{9};}
}
```
{% endraw %}

## 확인 결과

```text
7
```

## 코드를 따라 읽기

change의 첫 줄은 공유 배열 원소를 바꾼다. 다음 줄의 재대입은 메서드 안 매개변수만 새 배열을 가리키게 하며 호출자의 a를 재대입하지 않는다.

## 헷갈린 부분과 주의점

참조형 인자를 참조 전달이라고 부르면 재대입 동작을 잘못 예상하기 쉽다.

## 복습 문제

새 배열의 값 9가 출력되지 않는 이유는?

**풀이:** 매개변수 a의 재대입은 호출자의 변수에 영향을 주지 않기 때문이다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/Object.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Java 공부 09] 배열 정렬과 복사 범위](/study/2020/java/09-arrays/) · [다음: [Java 공부 11] 클래스·생성자·접근 제어](/study/2020/java/11-encapsulation/)
