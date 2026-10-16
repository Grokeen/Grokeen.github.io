---
layout: content
title: "[Java 공부 31] Stream의 filter·map·최종 연산"
date: 2020-07-29 09:00:00 +0900
categories: [Java2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 31
study_unit: 4
permalink: /study/2020/java/31-stream-filter/
---

Stream의 filter·map·최종 연산을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

스트림은 자료를 저장하는 컬렉션이 아니라 처리 흐름이다. 중간 연산은 지연 실행되고 collect 같은 최종 연산이 흐름을 소비한다. Java 11에서는 Stream.toList 대신 collect를 사용한다.

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
    List<Integer> result = Stream.of(1, 2, 3, 4)
      .filter(n -> n % 2 == 0)
      .map(n -> n * n)
      .collect(Collectors.toList());
    System.out.println(result);
  }
}
```
{% endraw %}

## 확인 결과

```text
[4, 16]
```

## 코드를 따라 읽기

짝수 2와 4만 남긴 다음 제곱해 목록에 모았다. 원본을 직접 수정하지 않는다. 한 번 소비한 스트림을 다시 쓰려면 원본으로부터 새 스트림을 만들어야 한다.

## 헷갈린 부분과 주의점

병렬 스트림 안에서 공유 ArrayList에 add하는 식의 부수 효과를 피한다. 출력 순서가 필요하면 연산의 순서 계약을 확인한다.

## 복습 문제

Java 11에서 Stream.toList를 쓸 수 있을까?

**풀이:** 아니다. 해당 API는 이후 버전이므로 Collectors.toList를 사용한다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/stream/Stream.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Java 공부 30] 람다·함수형 인터페이스·메서드 참조](/study/2020/java/30-lambda/) · [다음: [Java 공부 32] 기본형 스트림과 합계·평균](/study/2020/java/32-stream-aggregate/)
