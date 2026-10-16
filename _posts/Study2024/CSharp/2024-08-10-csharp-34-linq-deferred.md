---
layout: content
title: "[C# 공부 34] 지연 실행과 ToList의 스냅샷 차이"
date: 2024-08-10 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 34
study_unit: 5
permalink: /study/2024/csharp/34-linq-deferred/
---

쿼리를 만들었을 때와 실제 열거할 때의 값이 다를 수 있음을 확인했다. 언제 결과를 확정하는지가 중요했다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

IEnumerable에 대한 많은 LINQ 연산은 지연 실행된다. 쿼리 변수는 계산된 결과 목록이 아니라 처리 절차를 보관할 수 있다. ToArray·ToList는 그 시점에 열거해 결과를 저장한다. 이후 원본이 바뀌면 지연 쿼리와 이미 만든 목록의 내용이 달라질 수 있다.

## 따라 해 보기

{% raw %}
```csharp
var values = new List<int> { 1, 2 };
var query = values.Where(value => value > 1);
var snapshot = query.ToArray();
values.Add(3);
Console.WriteLine(string.Join(",", query));
Console.WriteLine(string.Join(",", snapshot));
```
{% endraw %}

## 실행 결과

```text
2,3
2
```

## 코드를 따라 읽기

query를 만든 뒤에는 아직 최종 결과가 고정되지 않는다. snapshot은 3이 추가되기 전에 열거해 2만 담았다. 같은 쿼리를 여러 번 읽으면 계산도 다시 수행될 수 있다. 장시간 작업이나 감사용 자료를 만들 때 필요한 시점과 일관성 수준을 명시해야 한다.

## 헷갈린 부분과 주의점

ToList가 데이터베이스 전체의 트랜잭션 스냅샷을 자동 보장하는 것은 아니다. 원본과 실행 제공자의 계약까지 구분한다.

## 복습 문제

query를 두 번 Count하면 항상 계산이 한 번만 일어날까?

**풀이:** 아니다. 시퀀스와 제공자에 따라 각 열거 때 다시 계산할 수 있다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/standard/linq/deferred-execution-lazy-evaluation)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 33] Join으로 코드와 설명 연결하기]({{ '/study/2024/csharp/33-linq-join/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 35] DateTimeOffset으로 시각과 오프셋 기록하기 →]({{ '/study/2024/csharp/35-datetimeoffset/' | relative_url }})
