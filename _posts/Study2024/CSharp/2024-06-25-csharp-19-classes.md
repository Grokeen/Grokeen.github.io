---
layout: content
title: "[C# 공부 19] 클래스·생성자·인스턴스로 접수 항목 표현하기"
date: 2024-06-25 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 19
study_unit: 3
permalink: /study/2024/csharp/19-classes/
---

서로 관련된 값을 한 객체에 묶었다. 생성자가 객체의 초기 조건을 잡아 주도록 했다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

class는 참조형을 정의하고 new로 인스턴스를 만든다. 생성자는 새 객체의 초기 상태를 설정한다. 속성은 데이터를 공개하는 인터페이스다. 객체를 다른 변수에 대입하면 같은 객체를 참조할 수 있으므로 복사와 구별한다. 아래 ID는 실제 환자와 연결되지 않는 가상 값이다.

## 따라 해 보기

{% raw %}
```csharp
var first = new Visit("TEST-V01");
var alias = first;
alias.Department = "원무";
Console.WriteLine(first.Id);
Console.WriteLine(first.Department);
Console.WriteLine(ReferenceEquals(first, alias));

// 예제용 형식
public class Visit
{
    public string Id { get; }
    public string Department { get; set; } = "미지정";
    public Visit(string id) => Id = id;
}
```
{% endraw %}

## 실행 결과

```text
TEST-V01
원무
True
```

## 코드를 따라 읽기

Id는 생성할 때 받아 이후 읽기만 하도록 했다. Department는 수정 가능한 속성이다. alias를 통해 변경하면 first에도 같은 상태가 보인다. 실제 모델에서는 누가 어떤 속성을 바꿀 수 있는지 정의하고, 무제한 public set 대신 상태 변경 메서드를 사용할 수 있다.

## 헷갈린 부분과 주의점

참조형의 대입이 깊은 복사를 만드는 것은 아니다. 객체가 유효한 상태로만 만들어지도록 생성자 입력도 검증한다.

## 복습 문제

별도로 new `Visit("TEST-V01")`을 다시 호출하면 같은 객체일까?

**풀이:** 아니다. 같은 ID 문자열을 담아도 별도의 인스턴스가 만들어진다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/classes)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 18] enum으로 유한한 상태 표현하기]({{ '/study/2024/csharp/18-enums/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 20] 속성 setter로 범위 검증하기 →]({{ '/study/2024/csharp/20-properties/' | relative_url }})
