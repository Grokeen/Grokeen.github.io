---
layout: content
title: "[C# 공부 32] GroupBy로 부서별 건수 집계하기"
date: 2024-08-04 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 32
study_unit: 4
permalink: /study/2024/csharp/32-linq-group/
---

개별 항목을 그룹으로 묶어 집계했다. 행 수와 실제 업무 대상 수가 같은지 먼저 확인해야 했다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

GroupBy는 같은 키를 가진 항목을 IGrouping으로 묶는다. Key는 그룹 기준이고 Count·Sum 같은 집계를 적용할 수 있다. 빈 그룹을 자동 생성하지 않으므로 데이터에 없는 부서는 결과에 없을 수 있다. 그룹의 숫자를 해석하기 전에 한 행이 무엇을 뜻하는지 정의한다.

## 따라 해 보기

{% raw %}
```csharp
string[] departments = { "ADM", "LAB", "ADM" };
foreach (var group in departments.GroupBy(value => value).OrderBy(group => group.Key, StringComparer.Ordinal))
{
    Console.WriteLine($"{group.Key}: {group.Count()}");
}
```
{% endraw %}

## 실행 결과

```text
ADM: 2
LAB: 1
```

## 코드를 따라 읽기

ADM이 두 번, LAB이 한 번 들어와 두 그룹을 만든다. 키 정렬은 표시 순서를 고정하기 위해 추가했다. 이 입력에서는 한 항목을 한 건으로 정의했으므로 Count가 건수다. 실제 데이터에 중복 이벤트가 있다면 업무 건수보다 커질 수 있다.

## 헷갈린 부분과 주의점

집계 전에 중복·취소·제외 대상의 범위를 정해야 한다. 그룹 평균은 각 그룹의 크기가 다르면 단순 평균으로 전체 평균이 되지 않는다.

## 복습 문제

입력에 없는 부서 X가 Count 0으로 자동 표시될까?

**풀이:** 아니다. 전체 부서 목록과 결합해 0을 채우는 로직이 별도로 필요하다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/csharp/linq/standard-query-operators/grouping-data)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 31] OrderBy·ThenBy로 정렬 기준 연결하기]({{ '/study/2024/csharp/31-linq-ordering/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 33] Join으로 코드와 설명 연결하기 →]({{ '/study/2024/csharp/33-linq-join/' | relative_url }})
