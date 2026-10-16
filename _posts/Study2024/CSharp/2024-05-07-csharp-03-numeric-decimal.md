---
layout: content
title: "[C# 공부 03] 정수 나눗셈과 decimal 금액 계산"
date: 2024-05-07 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 3
study_unit: 1
permalink: /study/2024/csharp/03-numeric-decimal/
---

수납 예시를 만들기 전에 숫자 자료형에 따라 계산 결과가 달라지는 부분을 정리했다. 금액은 임의의 학습용 값이다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

정수끼리의 /는 정수 몫을 반환한다. 소수 결과가 필요하면 한쪽 피연산자를 실수형으로 바꾼다. decimal 리터럴에는 m을 붙이며 십진 금액을 표현하는 데 적합하다. 금액 반올림 단위와 정책은 자료형만으로 결정되지 않으므로 업무 규칙을 따로 정해야 한다.

## 따라 해 보기

{% raw %}
```csharp
Console.WriteLine(5 / 2);
Console.WriteLine(5 / 2.0);
decimal unitPrice = 1200.50m;
decimal total = unitPrice * 2;
Console.WriteLine(total.ToString("F2", System.Globalization.CultureInfo.InvariantCulture));
```
{% endraw %}

## 실행 결과

```text
2
2.5
2401.00
```

## 코드를 따라 읽기

첫 연산은 int 나눗셈이라 2다. 2.0을 넣은 연산은 double 결과 2.5다. decimal 금액에 정수 수량을 곱하고 두 자리로 표시했다. 표시 형식을 고정하려고 InvariantCulture를 명시했다. 이 금액과 수량은 실제 진료비 기준을 뜻하지 않는다.

## 헷갈린 부분과 주의점

double과 decimal을 섞은 연산은 명시적 변환이 필요할 수 있다. 정수 나눗셈을 한 뒤 double로 바꾸어도 이미 버린 소수 부분은 돌아오지 않는다.

## 복습 문제

(double)(5 / 2)는 2.5일까?

**풀이:** 아니다. 정수 나눗셈이 먼저 끝나므로 2.0이 된다. 한쪽을 나누기 전에 변환해야 한다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/floating-point-numeric-types)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 02] 명시적 자료형과 var 구분하기]({{ '/study/2024/csharp/02-types-var/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 04] 문자열 보간과 형식 지정 →]({{ '/study/2024/csharp/04-strings/' | relative_url }})
