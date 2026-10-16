---
layout: content
title: "[C# 공부 29] using과 IDisposable로 자원 수명 관리하기"
date: 2024-07-26 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 29
study_unit: 4
permalink: /study/2024/csharp/29-using-dispose/
---

파일이나 연결 객체를 닫는 코드를 빠뜨리지 않도록 using을 사용했다. 자원 해제와 가비지 수집은 다른 역할이었다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

IDisposable의 Dispose는 더 이상 쓰지 않는 자원을 정리하는 계약이다. using 문이나 using 선언은 구역 종료 시 Dispose를 호출한다. 예외가 발생해도 일반적인 흐름에서는 정리된다. 관리 메모리 회수 시점에 외부 자원 종료를 모두 맡기지 않는 이유를 이해했다.

## 따라 해 보기

{% raw %}
```csharp
using (var session = new Session())
{
    Console.WriteLine("사용");
}
Console.WriteLine("다음 작업");

// 예제용 형식
public class Session : IDisposable
{
    public void Dispose() => Console.WriteLine("정리");
}
```
{% endraw %}

## 실행 결과

```text
사용
정리
다음 작업
```

## 코드를 따라 읽기

using 블록이 끝나기 전에 정리가 일어나고 그 뒤 다음 작업을 출력한다. 예제 Session은 순서 확인용으로 실제 DB에 연결하지 않는다. 비동기 정리만 제공하는 자원은 IAsyncDisposable과 await using을 사용한다. 자원의 소유자가 누구인지 명확히 해야 이중 정리도 줄어든다.

## 헷갈린 부분과 주의점

using은 외부 작업의 성공이나 트랜잭션 커밋을 자동으로 보장하지 않는다. Dispose가 해야 할 동작은 각 API 계약을 확인한다.

## 복습 문제

using 선언을 메서드 맨 위에 두면 언제 Dispose가 호출될까?

**풀이:** 해당 선언이 속한 범위를 벗어날 때 호출된다. 다음 줄 직후에 자동 종료되는 것은 아니다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/using)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 28] try·catch·finally와 예외 전파]({{ '/study/2024/csharp/28-exceptions/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 30] LINQ Where·Select로 선별과 변환 분리하기 →]({{ '/study/2024/csharp/30-linq-filter/' | relative_url }})
