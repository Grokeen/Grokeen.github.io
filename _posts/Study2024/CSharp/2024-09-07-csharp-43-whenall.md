---
layout: content
title: "[C# 공부 43] Task.WhenAll로 여러 결과 기다리기"
date: 2024-09-07 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 43
study_unit: 6
permalink: /study/2024/csharp/43-whenall/
---

독립적인 조회 두 개의 완료를 함께 기다렸다. 완료 순서와 결과 배열 순서는 구분했다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

Task.WhenAll은 전달한 작업 모두의 완료를 나타낸다. Task<T>들을 전달하면 결과 배열은 입력 작업 순서에 대응한다. 한 작업 실패가 다른 작업을 자동 취소하지는 않는다. 동시에 실행할 수 있다는 가정과 외부 시스템의 허용 부하도 확인해야 한다.

## 따라 해 보기

{% raw %}
```csharp
async Task<int> ReadAsync(int value)
{
    await Task.Delay(1);
    return value;
}
Task<int>[] tasks = { ReadAsync(2), ReadAsync(3) };
int[] results = await Task.WhenAll(tasks);
Console.WriteLine(string.Join(",", results));
Console.WriteLine(results.Sum());
```
{% endraw %}

## 실행 결과

```text
2,3
5
```

## 코드를 따라 읽기

두 Task를 만든 뒤 함께 기다린다. 결과는 tasks 순서대로 2와 3이다. 예제는 네트워크를 사용하지 않는다. 많은 작업을 무제한 생성하기보다 동시 실행 수를 제한하고 시간 초과·부분 실패를 정의한다. 출력은 완료 후 하므로 결과 비교가 가능하다.

## 헷갈린 부분과 주의점

WhenAll 자체가 모든 작업을 새 스레드에서 시작하는 것은 아니다. 작업 생성과 실제 실행 성질을 따로 이해한다.

## 복습 문제

하나가 실패하면 나머지도 자동 Cancel될까?

**풀이:** 취소 토큰과 호출 구조로 별도 정책을 구현해야 한다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.task.whenall?view=net-8.0)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 42] CancellationToken으로 취소 의도 전달하기]({{ '/study/2024/csharp/42-cancellation/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 44] SemaphoreSlim으로 비동기 공유 구역 보호하기 →]({{ '/study/2024/csharp/44-semaphore/' | relative_url }})
