---
layout: content
title: "[C# 공부 44] SemaphoreSlim으로 비동기 공유 구역 보호하기"
date: 2024-09-10 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 44
study_unit: 6
permalink: /study/2024/csharp/44-semaphore/
---

여러 작업이 같은 카운터를 바꿀 때 보호 구역을 만들었다. 기다림과 해제는 짝을 맞췄다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

SemaphoreSlim은 동시에 진입할 수 있는 수를 제한한다. WaitAsync 뒤에 보호 구역을 수행하고 finally에서 Release한다. 초기·최대값을 1로 두면 한 번에 하나씩 진입한다. 이 잠금은 현재 프로세스 안의 동기화이며 여러 서버의 중복 처리까지 보장하지 않는다.

## 따라 해 보기

{% raw %}
```csharp
using var gate = new SemaphoreSlim(1, 1);
int count = 0;
async Task IncrementAsync()
{
    await gate.WaitAsync();
    try
    {
        int before = count;
        await Task.Delay(1);
        count = before + 1;
    }
    finally { gate.Release(); }
}
await Task.WhenAll(IncrementAsync(), IncrementAsync(), IncrementAsync());
Console.WriteLine(count);
```
{% endraw %}

## 실행 결과

```text
3
```

## 코드를 따라 읽기

세 작업이 보호 구역을 한 번씩 통과해 count는 3이다. await가 있는 구역에 일반 lock을 그대로 사용할 수는 없다. 필요보다 넓게 잠그면 처리량이 떨어지므로 공유 데이터와 범위를 좁혀 설계한다. 기다리던 작업의 취소까지 추가할 수 있다.

## 헷갈린 부분과 주의점

WaitAsync가 성공하지 않았는데 Release하면 개수가 맞지 않을 수 있다. 여러 잠금의 획득 순서도 맞춰야 교착을 줄인다.

## 복습 문제

다른 서버 프로세스도 이 gate로 보호될까?

**풀이:** 분산 환경은 저장소 제약 등 별도 동시성 제어가 필요하다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/api/system.threading.semaphoreslim?view=net-8.0)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 43] Task.WhenAll로 여러 결과 기다리기]({{ '/study/2024/csharp/43-whenall/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 45] HttpClient와 모의 핸들러로 응답 처리하기 →]({{ '/study/2024/csharp/45-httpclient/' | relative_url }})
