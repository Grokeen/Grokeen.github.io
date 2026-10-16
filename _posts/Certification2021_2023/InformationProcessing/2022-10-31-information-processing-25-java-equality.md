---
layout: content
title: "[정보처리기사 25] Java 문자열의 ==와 equals"
date: 2022-10-31 09:00:00 +0900
categories: [InformationProcessingCertification]
tags: [자격증학습, 정보처리기사]
series: study-certifications-2021-2023
study_track: information-processing
study_order: 25
study_unit: 5
permalink: /study/certifications/2021-2023/information-processing/25-java-equality/
---

문자열 비교에서 같은 글자와 같은 객체를 구별했다. 문자열 상수 풀의 우연한 결과에 기대지 않는 예제를 만들었다.

> 2021~2023년 정보처리기사 학습 범위의 개념을 정리한 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

참조형의 ==는 일반적으로 같은 참조인지 비교한다. String.equals는 문자열 내용의 동등성을 구현한다. new String으로 만든 두 객체는 같은 내용을 가질 수 있어도 서로 다른 객체다. String의 불변성과 참조 동일성은 별도의 개념이다. null일 수 있는 값에서는 비교 호출 경로도 확인한다.

## 예제 문제 · 창작

new String("study")로 각각 만든 a와 b의 a == b, a.equals(b)를 예측하라.

## 풀이와 판단 근거

false와 true다. 두 생성 호출은 다른 객체를 만들지만 내용은 같다. 리터럴만 비교하면 인터닝 때문에 같은 참조로 보일 수 있어 객체 비교 규칙을 잘못 외우기 쉽다. Objects.equals처럼 null을 고려하는 비교도 사용할 수 있다. 이 예제의 boolean 출력은 Java의 소문자 표기다.

## 코드 추적 예제

C11 또는 Java 8 의미를 따라 읽는 추적 문제다. 아래 결과는 코드 흐름으로 풀이한다.

{% raw %}
```java
public class Main {
    public static void main(String[] args) {
        String a = new String("study");
        String b = new String("study");
        System.out.println(a == b);
        System.out.println(a.equals(b));
    }
}
```
{% endraw %}

## 예상 출력

```text
false
true
```

## 헷갈린 부분과 주의점

equals 구현을 재정의하는 일반 객체는 hashCode 계약도 함께 지켜야 한다. 모든 객체의 equals가 String처럼 내용 비교라고 가정하지 않는다.

## 복습 문제

a가 null이면 a.equals(b)는 안전할까?

**풀이:** NullPointerException이 날 수 있다. null 검사나 Objects.equals 등 적절한 방식을 사용한다.

## 참고한 문서

[개념·API의 원문 자료](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#equals-java.lang.Object-)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/information-processing/24-java-overloading/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/information-processing/26-python-defaults/' | relative_url }})
