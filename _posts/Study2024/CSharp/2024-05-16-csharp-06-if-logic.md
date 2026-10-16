---
layout: content
title: "[C# 공부 06] if와 단락 평가로 입력 상태 확인하기"
date: 2024-05-16 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 6
study_unit: 1
permalink: /study/2024/csharp/06-if-logic/
---

필수 입력과 길이 조건을 함께 검사했다. null 여부를 먼저 확인하면 뒤의 속성 접근을 안전하게 건너뛸 수 있었다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

if의 조건에는 bool 식을 사용한다. &&는 앞이 거짓이면 뒤를 평가하지 않고 ||는 앞이 참이면 뒤를 평가하지 않는다. 중괄호는 실행 블록을 묶는다. 여러 조건을 연결할 때는 어느 검사를 먼저 해야 뒤의 식이 의미 있는지 생각한다.

## 따라 해 보기

{% raw %}
```csharp
string? code = null;
if (code != null && code.Length > 0)
{
    Console.WriteLine("입력 있음");
}
else
{
    Console.WriteLine("입력 없음");
}
Console.WriteLine(string.IsNullOrWhiteSpace("  "));
```
{% endraw %}

## 실행 결과

```text
입력 없음
True
```

## 코드를 따라 읽기

code가 null이므로 && 오른쪽의 Length 접근은 하지 않는다. 공백만 들어온 문자열은 IsNullOrWhiteSpace로 별도 확인했다. 실제 접수 코드 규칙은 길이와 허용 문자까지 더 검사해야 한다. 이 예제는 null과 빈 입력의 제어 흐름부터 분리했다.

## 헷갈린 부분과 주의점

&&와 &를 같은 것으로 바꾸면 단락 평가 성질이 달라진다. null을 확인하지 않은 속성 접근은 NullReferenceException으로 이어질 수 있다.

## 복습 문제

false && 위험한함수()에서 함수가 실행될까?

**풀이:** 실행되지 않는다. 왼쪽이 거짓이면 전체가 거짓이라 오른쪽을 평가하지 않는다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/boolean-logical-operators)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 05] 대입·비교·증감 연산 구분하기]({{ '/study/2024/csharp/05-operators/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 07] switch 식과 관계 패턴으로 분기하기 →]({{ '/study/2024/csharp/07-switch-patterns/' | relative_url }})
