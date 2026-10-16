---
layout: content
title: "[Java 공부 04] BigDecimal로 소수 금액 계산하기"
date: 2020-01-22 09:00:00 +0900
categories: [Java2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 4
study_unit: 1
permalink: /study/2020/java/04-decimal/
---

BigDecimal로 소수 금액 계산하기을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

이진 부동소수점은 일부 십진 소수를 정확히 표현하지 못한다. 정확한 십진 입력은 문자열로 BigDecimal을 만들고 필요한 반올림 정책을 명시한다.

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
    BigDecimal a = new BigDecimal("0.1");
    BigDecimal b = new BigDecimal("0.2");
    System.out.println(a.add(b).toPlainString());
    System.out.println(
      new BigDecimal("10").divide(new BigDecimal("3"), 2, RoundingMode.HALF_UP)
    );
  }
}
```
{% endraw %}

## 확인 결과

```text
0.3
3.33
```

## 코드를 따라 읽기

add는 새 값을 반환한다. 나눗셈에서 소수 자릿수 2와 HALF_UP을 명시해 끝나지 않는 소수의 처리 방법을 정했다. 표시 자릿수와 수치 동등성은 별도로 판단한다.

## 헷갈린 부분과 주의점

new BigDecimal(0.1)은 이미 근삿값인 double에서 시작한다. equals는 scale도 비교하므로 수치 비교에는 compareTo를 검토한다.

## 복습 문제

1.0과 1.00의 compareTo 결과는?

**풀이:** 수치가 같으므로 0이다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/math/BigDecimal.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Java 공부 03] 정수 오버플로와 연산 순서](/study/2020/java/03-overflow/) · [다음: [Java 공부 05] 문자열 동등성과 불변성](/study/2020/java/05-strings/)
