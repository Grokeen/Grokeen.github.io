---
layout: content
title: "[C# 공부 48] 종합 실습: 가상 접수 자료를 검증해 대기열에 넣기"
date: 2024-09-23 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 48
study_unit: 6
permalink: /study/2024/csharp/48-csharp-project/
---

배운 문법을 합쳐 중복과 빈 ID를 걸러 내는 프로그램을 만들었다. 실제 접수 서버와 분리된 모의 예제다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

입력 정규화·필수 검사·중복 검사·큐 적재를 순서대로 나눈다. ID는 Trim 후 비어 있지 않아야 하고 같은 실행 안에서는 한 번만 적재한다. 실제 업무에서는 발급 기관·권한·동시성·저장 성공까지 확인해야 한다. 이 메모리 예제는 기본 처리 흐름을 익히는 용도다.

## 따라 해 보기

{% raw %}
```csharp
string?[] input = ["TEST-V01", null, " TEST-V02 ", "TEST-V01"];
var seen = new HashSet<string>(StringComparer.Ordinal);
var queue = new Queue<string>();
foreach (string? raw in input)
{
    string? id = raw?.Trim();
    if (string.IsNullOrEmpty(id) || !seen.Add(id)) continue;
    queue.Enqueue(id);
}
while (queue.TryDequeue(out string? id))
    Console.WriteLine($"처리 {id}");
Console.WriteLine($"남음 {queue.Count}");
```
{% endraw %}

## 실행 결과

```text
처리 TEST-V01
처리 TEST-V02
남음 0
```

## 코드를 따라 읽기

null은 제외하고 TEST-V02의 바깥 공백은 예제 계약에 따라 제거한다. TEST-V01 중복은 Add가 false라 적재하지 않는다. Queue는 입력 순서로 꺼낸다. 실제 접수 우선순위나 환자 확인 규칙은 다음 업무 모델에서 더 나누어 살펴본다.

## 헷갈린 부분과 주의점

중복 키 등록 뒤 저장에 실패하면 정상 재시도까지 막을 수 있다. 실제 시스템은 처리 상태와 중복 방지 기록을 함께 다룬다.

## 복습 문제

프로세스 재시작 뒤에도 seen이 유지될까?

**풀이:** 내구성 있는 중복 방지가 필요하면 저장소와 트랜잭션 정책을 추가해야 한다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.queue-1?view=net-8.0)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 47] C# 12 컬렉션 식과 펼치기]({{ '/study/2024/csharp/47-collection-expressions/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [병원 업무 공부 01] 접수·예약·수행·수납을 서로 다른 업무로 나누기 →]({{ '/study/2024/hospital/01-workflow/' | relative_url }})
