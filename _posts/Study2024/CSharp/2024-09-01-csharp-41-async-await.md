---
layout: content
title: "[C# 공부 41] Task와 await로 비동기 흐름 읽기"
date: 2024-09-01 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 41
study_unit: 6
permalink: /study/2024/csharp/41-async-await/
---

대기를 포함한 함수를 호출할 때 완료 결과를 명시적으로 기다렸다. async가 무조건 새 스레드를 만든다는 뜻은 아니었다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

async 메서드는 await를 사용할 수 있고 Task<T>는 나중에 얻을 결과를 나타낸다. await는 완료를 기다린 뒤 이어서 실행하지만 스레드 차단과 동일한 개념은 아니다. I/O 중심 작업에서 비동기 API를 끝까지 연결하는 것이 중요하다. 예제는 실제 서버 대신 짧은 모의 대기를 사용한다.

## 따라 해 보기

{% raw %}
```csharp
async Task<int> ReadCountAsync()
{
    await Task.Delay(1);
    return 3;
}
Console.WriteLine("시작");
int count = await ReadCountAsync();
Console.WriteLine($"완료 {count}");
```
{% endraw %}

## 실행 결과

```text
시작
완료 3
```

## 코드를 따라 읽기

Task를 직접 숫자로 취급하지 않고 await로 결과를 받는다. 완료 후 출력하므로 순서가 일정하다. Async 접미사는 관례이며 이름만 붙여 비동기가 되는 것은 아니다. CPU 병렬화와 외부 I/O 대기는 목적이 다르다.

## 헷갈린 부분과 주의점

Result나 Wait로 차단을 섞으면 UI 정지나 문맥에 따른 교착 문제를 만들 수 있다. 일반 비동기 메서드는 async void보다 Task를 반환한다.

## 복습 문제

반환 Task를 관찰하지 않으면 무엇을 놓칠 수 있을까?

**풀이:** 완료·실패·취소를 놓칠 수 있어 호출 구조에서 명시적으로 관찰해야 한다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 40] Path와 File로 임시 텍스트 읽고 쓰기]({{ '/study/2024/csharp/40-files-paths/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 42] CancellationToken으로 취소 의도 전달하기 →]({{ '/study/2024/csharp/42-cancellation/' | relative_url }})
