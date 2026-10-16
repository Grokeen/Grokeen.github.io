---
layout: content
title: "[C# 공부 38] 정규식 전체 일치와 시간 제한"
date: 2024-08-23 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 38
study_unit: 5
permalink: /study/2024/csharp/38-regex/
---

가상 작업 코드가 정한 형식인지 확인했다. 일부만 맞는 문자열을 전체가 올바른 것으로 받지 않도록 경계를 넣었다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

정규식의 시작·끝 경계로 전체 입력의 형식을 검사한다. 숫자 세 자리에는 [0-9]{3}을 사용해 허용 범위를 명확히 했다. 외부 입력을 처리할 때는 적절한 시간 제한도 지정한다. 정규식 일치는 코드 형식만 검증하고 실제 코드 존재 여부까지 보장하지 않는다.

## 따라 해 보기

{% raw %}
```csharp
using System.Text.RegularExpressions;

var pattern = new Regex(@"\ATEST-[0-9]{3}\z", RegexOptions.CultureInvariant, TimeSpan.FromSeconds(1));
Console.WriteLine(pattern.IsMatch("TEST-007"));
Console.WriteLine(pattern.IsMatch("XTEST-007"));
Console.WriteLine(pattern.IsMatch("TEST-07"));
```
{% endraw %}

## 실행 결과

```text
True
False
False
```

## 코드를 따라 읽기

첫 입력만 접두사와 세 자리 숫자가 전체 일치한다. @ 문자열은 역슬래시를 그대로 전달한다. 한 초는 예제의 실행 제한이며 모든 작업에 적합한 값은 아니다. 패턴 통과 뒤에도 코드 조회나 권한 확인 같은 업무 검증은 따로 수행한다.

## 헷갈린 부분과 주의점

[0-9]와 숫자 문자 전체를 허용하는 패턴의 범위를 구분한다. 사용자 입력을 정규식 패턴 자체로 바로 실행하는 설계는 별도 제한이 필요하다.

## 복습 문제

앞뒤 공백을 허용하려면 검사 전에 무조건 지워도 될까?

**풀이:** 공백 정규화가 식별자 계약에 맞는지 먼저 정해야 한다. 원본 보존이 필요한 경우도 있다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/standard/base-types/regular-expressions)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 37] 문화권을 명시한 숫자 변환과 표시]({{ '/study/2024/csharp/37-culture-parsing/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 39] System.Text.Json으로 객체와 JSON 변환하기 →]({{ '/study/2024/csharp/39-json/' | relative_url }})
