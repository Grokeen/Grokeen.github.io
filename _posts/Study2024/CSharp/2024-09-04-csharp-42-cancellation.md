---
layout: content
title: "[C# 공부 42] CancellationToken으로 취소 의도 전달하기"
date: 2024-09-04 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 42
study_unit: 6
permalink: /study/2024/csharp/42-cancellation/
---

작업 취소를 실패와 분리해 처리했다. 토큰을 만들었다고 모든 작업이 자동 중단되는 것은 아니었다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

CancellationTokenSource는 취소 신호를 만들고 Token을 지원 API에 전달한다. 작업은 취소를 관찰해야 멈출 수 있다. 이미 취소된 토큰을 Task.Delay에 전달하면 취소된 작업이 된다. 취소에도 자원 정리와 상태 기록이 필요하며 완료로 잘못 표시하지 않는다.

## 따라 해 보기

{% raw %}
```csharp
using var source = new CancellationTokenSource();
source.Cancel();
try
{
    await Task.Delay(100, source.Token);
    Console.WriteLine("완료");
}
catch (OperationCanceledException) when (source.IsCancellationRequested)
{
    Console.WriteLine("취소됨");
}
```
{% endraw %}

## 실행 결과

```text
취소됨
```

## 코드를 따라 읽기

시작 전에 취소해 완료 문구는 출력하지 않는다. catch 필터는 현재 요청의 취소 신호와 연결한다. 실제 전송이 완료된 뒤 취소를 받았을 때 저장 상태를 어떻게 알릴지도 정해야 한다. 취소는 협력적 계약이지 강제 스레드 종료가 아니다.

## 헷갈린 부분과 주의점

토큰을 전달하지 않는 내부 작업은 취소를 모를 수 있다. 취소 예외를 정상 성공으로 바꾸지 않는다.

## 복습 문제

Cancel이 원격 서버에 저장한 자료도 자동으로 되돌릴까?

**풀이:** 취소와 원격 변경의 취소·보상 처리는 별도 문제다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/standard/threading/cancellation-in-managed-threads)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 41] Task와 await로 비동기 흐름 읽기]({{ '/study/2024/csharp/41-async-await/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 43] Task.WhenAll로 여러 결과 기다리기 →]({{ '/study/2024/csharp/43-whenall/' | relative_url }})
