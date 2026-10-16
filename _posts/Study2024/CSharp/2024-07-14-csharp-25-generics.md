---
layout: content
title: "[C# 공부 25] 제네릭으로 같은 구조의 자료형 안전하게 재사용하기"
date: 2024-07-14 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 25
study_unit: 4
permalink: /study/2024/csharp/25-generics/
---

문자열과 정수마다 같은 보관 클래스를 만들지 않으려고 제네릭을 사용했다. object로 바꾸는 것과 달리 자료형 정보가 유지됐다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

제네릭의 T는 나중에 정할 자료형 매개변수다. Box<int>와 Box<string>처럼 실제 자료형을 지정하면 컴파일러가 해당 자료형에 맞는 사용을 검사한다. 제약 where T : ...로 필요한 동작을 요구할 수도 있다. 제네릭은 모든 입력을 동적으로 허용한다는 뜻이 아니다.

## 따라 해 보기

{% raw %}
```csharp
var count = new Box<int>(3);
var code = new Box<string>("TEST-C01");
Console.WriteLine(count.Value + 2);
Console.WriteLine(code.Value);

// 예제용 형식
public class Box<T>
{
    public T Value { get; }
    public Box(T value) => Value = value;
}
```
{% endraw %}

## 실행 결과

```text
5
TEST-C01
```

## 코드를 따라 읽기

count.Value는 int라 숫자 계산을 할 수 있고 code.Value는 string이다. 각 값을 다시 캐스팅하지 않아도 된다. 실제 모델에서 의미가 다른 두 정수는 제네릭만으로 구분되지 않으므로 ID 같은 도메인 자료형을 별도로 고려할 수 있다.

## 헷갈린 부분과 주의점

T 안에서 임의의 멤버를 호출할 수는 없다. 필요한 제약을 선언하거나 해당 동작을 인터페이스로 받는다.

## 복습 문제

Box<int>에 `"3"`이라는 문자열을 그대로 넣을 수 있을까?

**풀이:** 없다. 입력을 먼저 검증·변환해 int로 제공해야 한다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/generics)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 24] interface로 저장 역할을 교체 가능하게 만들기]({{ '/study/2024/csharp/24-interfaces/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 26] Func·Action과 람다로 동작 전달하기 →]({{ '/study/2024/csharp/26-delegates-lambda/' | relative_url }})
