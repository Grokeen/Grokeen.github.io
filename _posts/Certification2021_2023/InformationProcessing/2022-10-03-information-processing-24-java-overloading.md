---
layout: content
title: "[정보처리기사 24] Java 오버로딩과 선언형에 따른 선택"
date: 2022-10-03 09:00:00 +0900
categories: [InformationProcessingCertification]
tags: [자격증학습, 정보처리기사]
series: study-certifications-2021-2023
study_track: information-processing
study_order: 24
study_unit: 5
permalink: /study/certifications/2021-2023/information-processing/24-java-overloading/
---

같은 이름의 메서드가 여러 개일 때 실행 객체만 보고 선택하면 틀릴 수 있었다. 먼저 컴파일 시 인자형을 확인했다.

> 2021~2023년 정보처리기사 학습 범위의 개념을 정리한 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

오버로딩은 이름이 같고 매개변수 목록이 다른 메서드를 정의하는 것이다. 호출할 시그니처는 컴파일 시 선언형과 변환 규칙을 바탕으로 선택한다. 선택된 인스턴스 메서드의 재정의 구현을 런타임에 찾는 오버라이딩과 구분한다. 아래는 정적 메서드의 오버로딩만 보여 준다.

## 예제 문제 · 창작

Object형 변수 text가 실제로 String 객체를 가리킨다. pick(text)와 pick("x")의 출력을 예측하라.

## 풀이와 판단 근거

Object와 String이 차례로 출력된다. text의 선언형이 Object라 첫 호출은 pick(Object)를 선택한다. 문자열 리터럴은 String으로 더 구체적인 오버로드가 선택된다. 반환형만 다르게 정의하는 것은 오버로딩 조건이 아니다. 이 풀이는 Java 언어 규칙의 추적이며 컴파일 실행 결과 검증 여부와 구분한다.

## 코드 추적 예제

C11 또는 Java 8 의미를 따라 읽는 추적 문제다. 아래 결과는 코드 흐름으로 풀이한다.

{% raw %}
```java
public class Main {
    static String pick(Object value) { return "Object"; }
    static String pick(String value) { return "String"; }
    public static void main(String[] args) {
        Object text = "x";
        System.out.println(pick(text));
        System.out.println(pick("x"));
    }
}
```
{% endraw %}

## 예상 출력

```text
Object
String
```

## 헷갈린 부분과 주의점

오버로드를 실제 객체의 런타임 자료형만 보고 고르지 않는다. null 인자는 서로 관련 없는 참조형 오버로드 사이에서 모호할 수 있다.

## 복습 문제

pick((String)text)는 어떤 오버로드를 고를까?

**풀이:** 해당 캐스트가 유효한 경우 String형 인자로 보아 pick(String)을 선택한다.

## 참고한 문서

[개념·API의 원문 자료](https://docs.oracle.com/javase/specs/jls/se8/html/jls-15.html#jls-15.12)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/information-processing/23-recursion/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/information-processing/25-java-equality/' | relative_url }})
