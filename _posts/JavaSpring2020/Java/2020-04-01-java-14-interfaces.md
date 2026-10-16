---
layout: content
title: "[Java 공부 14] 인터페이스로 구현 교체하기"
date: 2020-04-01 09:00:00 +0900
categories: [Java2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 14
study_unit: 2
permalink: /study/2020/java/14-interfaces/
---

인터페이스로 구현 교체하기을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

인터페이스는 호출자가 의존할 계약을 표현한다. 생성자로 구현을 전달하면 계산을 사용하는 쪽과 구체적인 정책을 분리할 수 있다.

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
    Fee fee=amount->amount/10;
    System.out.println(total(100,fee));
  }
    @FunctionalInterface interface Fee {int apply(int amount);}
    static int total(int amount,Fee fee){return amount+fee.apply(amount);}
}
```
{% endraw %}

## 확인 결과

```text
110
```

## 코드를 따라 읽기

Fee는 추상 메서드가 하나라 람다로 구현할 수 있다. total은 전달된 정책만 호출하므로 고정 수수료나 다른 계산 정책으로 교체할 수 있다.

## 헷갈린 부분과 주의점

인터페이스가 있다고 자동으로 좋은 추상화가 되는 것은 아니다. 반환값 범위와 예외 등 계약도 함께 정의한다.

## 복습 문제

수수료가 0인 정책은?

**풀이:** amount->0을 전달하면 된다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/FunctionalInterface.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Java 공부 13] 상속·오버라이딩·동적 호출](/study/2020/java/13-inheritance/) · [다음: [Java 공부 15] equals와 hashCode를 함께 정의하기](/study/2020/java/15-equals-hash/)
