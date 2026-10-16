---
layout: content
title: "[Java 공부 06] 반복 문자열 생성과 StringBuilder"
date: 2020-02-05 09:00:00 +0900
categories: [Java2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 6
study_unit: 1
permalink: /study/2020/java/06-builder/
---

반복 문자열 생성과 StringBuilder을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

반복문에서 결과를 누적할 때 StringBuilder를 사용하면 변경 가능한 버퍼에 추가할 수 있다. 구분자는 마지막에 무조건 붙이는 대신 원소 사이에만 넣는 방법을 연습한다.

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
    StringBuilder out=new StringBuilder();
    for(int i=1;i<=3;i++){
      if(i>1) out.append(",");
      out.append(i);
    }
    System.out.println(out);
  }

}
```
{% endraw %}

## 확인 결과

```text
1,2,3
```

## 코드를 따라 읽기

첫 원소 앞에는 쉼표를 넣지 않고 두 번째부터 붙인다. append는 같은 빌더를 반환해 연쇄 호출도 가능하다. 최종 문자열이 필요하면 toString을 호출한다.

## 헷갈린 부분과 주의점

StringBuilder는 동시 접근에 자동으로 안전하지 않다. 공유 상태가 필요한지 먼저 판단한다.

## 복습 문제

원소가 0개라면 빌더 내용은?

**풀이:** 빈 문자열이며 불필요한 쉼표가 생기지 않는다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/StringBuilder.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Java 공부 05] 문자열 동등성과 불변성](/study/2020/java/05-strings/) · [다음: [Java 공부 07] 조건문에서 경계값을 먼저 확인하기](/study/2020/java/07-branch/)
