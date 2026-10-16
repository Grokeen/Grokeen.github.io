---
layout: content
title: "[Java 공부 23] PriorityQueue와 최소값 우선 처리"
date: 2020-06-03 09:00:00 +0900
categories: [Java2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 23
study_unit: 3
permalink: /study/2020/java/23-priority-queue/
---

PriorityQueue와 최소값 우선 처리을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

우선순위 큐는 poll할 때 우선순위가 가장 높은 원소를 반환한다. 기본 숫자 순서는 작은 값 우선이며 내부 전체가 정렬된 목록이라는 뜻은 아니다.

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
    PriorityQueue<Integer> q = new PriorityQueue<>();
    q.addAll(Arrays.asList(7, 2, 5));
    while (!q.isEmpty()) System.out.println(q.poll());
  }
}
```
{% endraw %}

## 확인 결과

```text
2
5
7
```

## 코드를 따라 읽기

매번 현재 최소값을 제거하기 때문에 출력이 오름차순이다. iterator로 순회한 순서나 toString 결과가 정렬되어 있다고 가정하면 안 된다. 최대값 우선은 역순 Comparator를 전달할 수 있다.

## 헷갈린 부분과 주의점

비교 함수를 a-b로 만들면 큰 정수에서 오버플로가 날 수 있다. Integer.compare를 사용한다.

## 복습 문제

peek는 원소를 제거할까?

**풀이:** 아니다. 현재 우선 원소를 조회만 한다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/PriorityQueue.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Java 공부 22] ArrayDeque로 큐와 스택 다루기](/study/2020/java/22-deque/) · [다음: [Java 공부 24] Comparator로 여러 정렬 기준 연결하기](/study/2020/java/24-comparators/)
