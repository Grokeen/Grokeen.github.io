---
layout: content
title: "[C# 공부 28] try·catch·finally와 예외 전파"
date: 2024-07-23 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 28
study_unit: 4
permalink: /study/2024/csharp/28-exceptions/
---

예상할 수 있는 입력 오류를 처리하고 정리 코드는 별도로 두었다. 모든 오류를 숨겨 성공으로 보이게 만들지 않기로 했다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

try는 실패할 수 있는 구역, catch는 처리할 예외 종류, finally는 정상·실패와 관계없이 수행할 정리 구역이다. 예외를 다시 전파할 때 catch 안의 throw;는 기존 스택 추적을 보존한다. 복구할 수 없는 오류를 넓게 잡아 삼키면 원인 파악이 어렵다.

## 따라 해 보기

{% raw %}
```csharp
try
{
    int value = int.Parse("문자");
    Console.WriteLine(value);
}
catch (FormatException)
{
    Console.WriteLine("숫자 형식 확인");
}
finally
{
    Console.WriteLine("처리 구역 종료");
}
```
{% endraw %}

## 실행 결과

```text
숫자 형식 확인
처리 구역 종료
```

## 코드를 따라 읽기

Parse는 문자열을 정수로 읽지 못해 FormatException을 던진다. catch에서 안내하고 finally가 이어 실행된다. 일반 입력 오류라면 앞에서 배운 TryParse가 더 간단할 수 있다. 예상한 실패의 의미와 필요한 정리를 나누어 설명했다.

## 헷갈린 부분과 주의점

finally가 있다고 예외가 자동으로 없어지지는 않는다. 정리 블록에서 새 예외가 발생하면 원래 오류를 가릴 수 있어 정리 경로도 점검한다.

## 복습 문제

catch가 없는 예외라도 finally는 실행될까?

**풀이:** 일반적인 예외 전파 과정에서는 실행된다. 프로세스 강제 종료 같은 상황까지 보장하는 것은 아니다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/exceptions/exception-handling)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 27] event 구독과 해제로 알림 흐름 만들기]({{ '/study/2024/csharp/27-events/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 29] using과 IDisposable로 자원 수명 관리하기 →]({{ '/study/2024/csharp/29-using-dispose/' | relative_url }})
