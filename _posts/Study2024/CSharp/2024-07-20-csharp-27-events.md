---
layout: content
title: "[C# 공부 27] event 구독과 해제로 알림 흐름 만들기"
date: 2024-07-20 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 27
study_unit: 4
permalink: /study/2024/csharp/27-events/
---

한 작업 완료를 여러 곳에 알리는 이벤트를 공부했다. 구독한 대상을 언제 해제할지도 수명 관리의 일부였다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

event는 외부에서 델리게이트를 임의로 덮어쓰거나 직접 발생시키지 못하게 제한하는 이벤트 계약이다. +=로 구독하고 -=로 해제한다. ?.Invoke는 구독자가 없을 때 호출을 건너뛴다. 이벤트는 발행자와 구독자를 연결하므로 오래 사는 발행자에 불필요한 구독이 남지 않게 관리한다.

## 따라 해 보기

{% raw %}
```csharp
var worker = new Worker();
void Show(string id) => Console.WriteLine($"완료 {id}");
worker.Completed += Show;
worker.Finish("TEST-J01");
worker.Completed -= Show;
worker.Finish("TEST-J02");

// 예제용 형식
public class Worker
{
    public event Action<string>? Completed;
    public void Finish(string id) => Completed?.Invoke(id);
}
```
{% endraw %}

## 실행 결과

```text
완료 TEST-J01
```

## 코드를 따라 읽기

첫 작업 때는 구독자가 있어 문구가 보인다. 해제한 뒤 두 번째 작업은 아무것도 출력하지 않는다. 이 예제의 이벤트는 동기 호출이며 내구성 있는 메시지 큐가 아니다. 프로세스 중단이나 재전송 보장은 별도 시스템 설계가 필요하다.

## 헷갈린 부분과 주의점

이벤트 핸들러 예외가 호출 흐름에 영향을 줄 수 있다. 익명 람다를 새로 만들어 -=하면 처음 구독한 인스턴스와 달라 해제되지 않을 수 있다.

## 복습 문제

구독자가 없으면 ?.Invoke가 오류를 낼까?

**풀이:** 호출을 건너뛰므로 구독자가 없다는 이유만으로 null 접근 오류가 나지 않는다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/events/)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 26] Func·Action과 람다로 동작 전달하기]({{ '/study/2024/csharp/26-delegates-lambda/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 28] try·catch·finally와 예외 전파 →]({{ '/study/2024/csharp/28-exceptions/' | relative_url }})
