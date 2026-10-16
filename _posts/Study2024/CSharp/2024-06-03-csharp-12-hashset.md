---
layout: content
title: "[C# 공부 12] HashSet으로 중복 작업 식별하기"
date: 2024-06-03 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 12
study_unit: 2
permalink: /study/2024/csharp/12-hashset/
---

같은 가상 작업 ID가 다시 들어오는 상황을 집합으로 확인했다. 메모리 중복 검사는 저장소의 중복 방지까지 대신하지는 않았다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

HashSet<T>는 중복 없는 항목을 보관한다. Add는 새 항목이면 true, 이미 존재하면 false를 반환한다. 집합에는 출력 순서 계약이 없으므로 정렬이 필요하면 별도로 수행한다. 문자열 비교자도 키의 의미에 맞춰 지정한다.

## 따라 해 보기

{% raw %}
```csharp
var seen = new HashSet<string>(StringComparer.Ordinal);
foreach (string id in new[] { "TEST-J01", "TEST-J02", "TEST-J01" })
{
    Console.WriteLine($"{id}: {seen.Add(id)}");
}
Console.WriteLine(seen.Count);
```
{% endraw %}

## 실행 결과

```text
TEST-J01: True
TEST-J02: True
TEST-J01: False
2
```

## 코드를 따라 읽기

첫 두 작업은 처음 본 ID이지만 세 번째는 중복이다. set에 보관되는 개수는 2다. 병원 연동에서는 같은 메시지가 재전송될 수 있으므로 식별 키와 보존 범위를 정해야 한다. 이 코드는 단일 프로세스 안의 개념 예제다.

## 헷갈린 부분과 주의점

프로그램이 재시작되면 이 메모리 집합은 사라진다. 동시에 여러 프로세스가 처리한다면 데이터베이스 고유 제약 등 지속성 있는 방식이 필요하다.

## 복습 문제

서로 다른 작업인데 ID만 같으면 HashSet은 구분할까?

**풀이:** 구분하지 못한다. 중복 판정에 적합한 키를 설계해야 한다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.hashset-1?view=net-8.0)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 11] Dictionary와 TryGetValue로 코드 조회하기]({{ '/study/2024/csharp/11-dictionary/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 13] 메서드·지역 함수와 반환값 →]({{ '/study/2024/csharp/13-methods/' | relative_url }})
