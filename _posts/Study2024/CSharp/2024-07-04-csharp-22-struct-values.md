---
layout: content
title: "[C# 공부 22] struct 값 복사와 참조형 차이"
date: 2024-07-04 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 22
study_unit: 3
permalink: /study/2024/csharp/22-struct-values/
---

작은 값 묶음을 복사했을 때 변경이 전파되지 않는 예제를 만들었다. 모든 자료형이 클래스와 같은 방식으로 대입되는 것은 아니었다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

struct는 값 형식이다. 대입하면 해당 값을 복사한다. 다만 struct 안에 참조형 필드가 있으면 그 필드의 참조값이 복사되어 내부 객체를 공유할 수 있다. readonly record struct는 작은 불변 값 모델을 표현하는 한 방법이다. 크고 변경이 복잡한 모델에 무조건 적용하지 않는다.

## 따라 해 보기

{% raw %}
```csharp
var original = new Position(2, 3);
var moved = original with { X = 7 };
Console.WriteLine($"{original.X},{original.Y}");
Console.WriteLine($"{moved.X},{moved.Y}");
Console.WriteLine(original == new Position(2, 3));

// 예제용 형식
public readonly record struct Position(int X, int Y);
```
{% endraw %}

## 실행 결과

```text
2,3
7,3
True
```

## 코드를 따라 읽기

두 좌표는 독립된 값이며 원래 X는 2다. record struct의 값 기반 동등 비교도 확인했다. 실제 자료형을 고를 때는 값 의미·크기·복사 비용·변경 가능성을 함께 고려한다. 예제 좌표는 UI 위치 같은 단순 학습 모델이다.

## 헷갈린 부분과 주의점

값 형식이라는 이유만으로 모든 복사가 싸거나 내부 데이터까지 독립적인 것은 아니다. 참조형 구성 요소가 있는지 확인한다.

## 복습 문제

readonly는 내부 참조 객체의 모든 변경까지 막을까?

**풀이:** 아니다. 참조 재대입 제한과 참조 대상의 변경 가능성은 다르다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/struct)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 21] record와 with로 값 중심 데이터 다루기]({{ '/study/2024/csharp/21-records/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 23] 상속과 override로 동작 확장하기 →]({{ '/study/2024/csharp/23-inheritance/' | relative_url }})
