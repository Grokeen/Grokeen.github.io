---
layout: content
title: "[Java 공부 26] 예외를 정상 결과와 구분하기"
date: 2020-06-24 09:00:00 +0900
categories: [Java2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 26
study_unit: 4
permalink: /study/2020/java/26-exceptions/
---

예외를 정상 결과와 구분하기을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

실패를 의미 없는 숫자로 숨기기보다 예외를 적절한 경계에서 처리한다. 예외 메시지를 사용자 응답으로 그대로 노출하기보다 문맥에 맞게 안내하고 원인을 보존한다.

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
    for (String s : Arrays.asList("12", "bad")) {
      try {
        System.out.println(Integer.parseInt(s));
      } catch (NumberFormatException e) {
        System.out.println("invalid");
      }
    }
  }
}
```
{% endraw %}

## 확인 결과

```text
12
invalid
```

## 코드를 따라 읽기

정상 숫자는 출력하고 변환 불가능한 문자열은 예외 분기로 처리한다. 반복문 안에서 처리했으므로 다음 항목이 있다면 계속 진행한다. 모든 예외를 한 번에 삼키는 패턴을 피한다.

## 헷갈린 부분과 주의점

catch(Exception)으로 무조건 성공처럼 반환하면 실제 결함을 숨길 수 있다. 필요한 예외 종류와 복구 범위를 정한다.

## 복습 문제

빈 문자열 parseInt는 0일까?

**풀이:** 아니다. NumberFormatException이 발생한다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/NumberFormatException.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Java 공부 25] 수정 불가 목록과 고정 크기 목록](/study/2020/java/25-immutable-lists/) · [다음: [Java 공부 27] try-with-resources와 자원 종료](/study/2020/java/27-resources/)
