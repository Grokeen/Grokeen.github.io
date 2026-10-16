---
layout: content
title: "[Java 공부 15] equals와 hashCode를 함께 정의하기"
date: 2020-04-08 09:00:00 +0900
categories: [Java2020]
tags: [2020학습노트, 웹개발]
series: java-spring-2020
study_order: 15
study_unit: 2
permalink: /study/2020/java/15-equals-hash/
---

equals와 hashCode를 함께 정의하기을 예제로 확인하며 정리했다.

> 2020년 학습 순서를 재구성한 공부 노트다. Java 11 기준이며 실제 근무·수강 이력을 주장하지 않는다. [실행 준비와 공통 pom.xml](/study/2020/java-spring/#run)을 먼저 확인한다.

## 오늘 정리한 개념

HashSet과 HashMap은 해시값으로 후보를 찾고 equals로 같은 키인지 확인한다. 논리적으로 같은 객체가 같은 해시값을 갖도록 두 메서드를 함께 정의해야 한다.

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
    Set<Key> keys = new HashSet<>();
    keys.add(new Key("A"));
    keys.add(new Key("A"));
    System.out.println(keys.size());
  }

  static final class Key {

    final String id;

    Key(String id) {
      this.id = id;
    }

    @Override
    public boolean equals(Object o) {
      return o instanceof Key && Objects.equals(id, ((Key) o).id);
    }

    @Override
    public int hashCode() {
      return Objects.hash(id);
    }
  }
}
```
{% endraw %}

## 확인 결과

```text
1
```

## 코드를 따라 읽기

서로 다른 Key 객체지만 id가 같으면 equals가 true다. hashCode도 id를 기준으로 계산해 같은 논리 키가 하나만 남는다. 키 필드를 final로 두어 저장 후 해시 기준이 바뀌지 않게 했다.

## 헷갈린 부분과 주의점

가변 필드를 해시 키로 쓰고 변경하면 저장된 원소를 찾기 어려워질 수 있다. instanceof와 null 처리도 확인한다.

## 복습 문제

equals만 정의하면 충분할까?

**풀이:** 아니다. 해시 기반 컬렉션의 계약에 맞게 hashCode도 정의해야 한다.

## 참고한 문서

[해당 버전 공식 API·참고 문서](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/Object.html)

[전체 학습 목차](/study/2020/java-spring/) · [이전: [Java 공부 14] 인터페이스로 구현 교체하기](/study/2020/java/14-interfaces/) · [다음: [Java 공부 16] enum으로 허용된 상태 표현하기](/study/2020/java/16-enum/)
