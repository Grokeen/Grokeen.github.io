---
layout: content
title: "[C# 공부 16] nullable 참조형과 ?.·??로 null 다루기"
date: 2024-06-16 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 16
study_unit: 2
permalink: /study/2024/csharp/16-nullable-references/
---

문자열이 없을 수 있다는 계약을 타입에 적었다. 컴파일러 경고가 실제 런타임 검증을 전부 대신하지는 않았다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

nullable 참조형 문맥에서 string?는 null일 수 있는 참조라는 의도를 표시한다. ?.는 수신 객체가 null이면 멤버 접근을 건너뛰고 null을 반환한다. ??로 대체 표시를 정할 수 있다. null-forgiving 연산자 !는 경고 억제일 뿐 객체를 생성하거나 검사하지 않는다.

## 따라 해 보기

{% raw %}
```csharp
string? department = null;
Console.WriteLine(department?.Length ?? 0);
department = "원무";
Console.WriteLine(department?.Length ?? 0);
string label = department ?? "미지정";
Console.WriteLine(label);
```
{% endraw %}

## 실행 결과

```text
0
2
원무
```

## 코드를 따라 읽기

첫 줄은 null이라 Length를 읽지 않고 대체값 0을 출력한다. 문자열이 들어오면 길이가 반환된다. 화면의 대체 표시를 실제 데이터의 기본값으로 저장할지는 별도 선택이다. .NET 콘솔 프로젝트의 Nullable 설정을 활성화한 상태로 경고를 함께 읽는다.

## 헷갈린 부분과 주의점

무조건 !를 붙여 경고를 없애면 실제 null 접근은 여전히 실패할 수 있다. 외부 JSON·DB 값은 계약에 맞게 검증한다.

## 복습 문제

department!.Length는 null을 안전하게 처리할까?

**풀이:** 아니다. !는 컴파일러 분석에만 영향을 주므로 null이면 런타임 오류가 날 수 있다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/csharp/nullable-references)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 15] nullable 값 형식으로 미입력과 0 구별하기]({{ '/study/2024/csharp/15-nullable-values/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 17] 이름 있는 튜플로 작은 결과 묶기 →]({{ '/study/2024/csharp/17-tuples/' | relative_url }})
