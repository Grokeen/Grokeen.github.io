---
layout: content
title: "[C# 공부 26] Func·Action과 람다로 동작 전달하기"
date: 2024-07-17 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 26
study_unit: 4
permalink: /study/2024/csharp/26-delegates-lambda/
---

처리 대상을 고르는 조건을 함수 인자로 전달했다. 함수 자체와 호출 결과를 구별하는 연습이 이어졌다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

Func<T,TResult>는 입력과 반환값이 있는 동작, Action<T>는 반환값이 없는 동작을 나타내는 델리게이트다. 람다의 => 왼쪽은 매개변수, 오른쪽은 식 또는 본문이다. 콜백에 넘길 때는 호출하지 않고 동작 자체를 전달한다. 캡처한 변수의 수명과 변경도 고려해야 한다.

## 따라 해 보기

{% raw %}
```csharp
Func<int, bool> isValid = value => value >= 0;
Action<string> show = text => Console.WriteLine($"확인: {text}");
Console.WriteLine(isValid(3));
Console.WriteLine(isValid(-1));
show("가상 자료");
```
{% endraw %}

## 실행 결과

```text
True
False
확인: 가상 자료
```

## 코드를 따라 읽기

isValid는 숫자를 받아 bool을 돌려준다. show는 화면에 쓰고 결과를 반환하지 않는다. 실제 검증 규칙을 함수로 전달하면 입력 처리 틀을 재사용할 수 있다. 다만 규칙 이름과 책임이 모호해지지 않게 중요한 업무 조건은 이름 있는 메서드로 설명할 수 있다.

## 헷갈린 부분과 주의점

Action을 호출한 결과를 값처럼 저장할 수 없다. 긴 람다에 상태 변경을 여러 개 섞으면 호출자 입장에서 부작용을 알기 어렵다.

## 복습 문제

Func<string, int>의 마지막 자료형 int는 무엇을 뜻할까?

**풀이:** 반환값 자료형이다. 앞의 string은 입력 자료형이다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/lambda-expressions)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 25] 제네릭으로 같은 구조의 자료형 안전하게 재사용하기]({{ '/study/2024/csharp/25-generics/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 27] event 구독과 해제로 알림 흐름 만들기 →]({{ '/study/2024/csharp/27-events/' | relative_url }})
