---
layout: content
title: "[C# 공부 31] OrderBy·ThenBy로 정렬 기준 연결하기"
date: 2024-08-01 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 31
study_unit: 4
permalink: /study/2024/csharp/31-linq-ordering/
---

같은 부서의 항목을 순번으로 정렬했다. 두 번째 OrderBy로 이전 정렬을 덮어쓰는 실수를 피했다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

OrderBy는 기본 정렬 기준을 만들고 ThenBy는 앞 기준이 같은 경우의 다음 기준을 추가한다. Descending 계열은 내림차순이다. 메모리 LINQ 정렬은 원본 목록을 제자리 변경하지 않는다. 동률 항목의 표시 순서를 안정적으로 만들려면 업무상 적절한 마지막 식별 기준도 고려한다.

## 따라 해 보기

{% raw %}
```csharp
var items = new[] { (Dept: "B", No: 1), (Dept: "A", No: 2), (Dept: "A", No: 1) };
var ordered = items.OrderBy(item => item.Dept, StringComparer.Ordinal)
                   .ThenBy(item => item.No);
foreach (var item in ordered)
    Console.WriteLine($"{item.Dept}-{item.No}");
```
{% endraw %}

## 실행 결과

```text
A-1
A-2
B-1
```

## 코드를 따라 읽기

먼저 부서 A가 B보다 앞서고 A 안에서는 번호 1이 2보다 앞선다. ThenBy는 앞 정렬을 유지하면서 보조 기준을 더한다. 실제 접수 우선순위는 별도의 승인된 규칙이 필요하며 이 예제는 문자열과 번호 정렬만 보여 준다.

## 헷갈린 부분과 주의점

ThenBy 대신 새 OrderBy를 호출하면 새 기본 기준을 시작한다. 정렬과 우선 업무 판단을 같은 의미로 취급하지 않는다.

## 복습 문제

OrderByDescending만 쓰면 원본 배열도 바뀔까?

**풀이:** 아니다. 정렬 결과를 열거하는 별도 시퀀스를 반환한다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/csharp/linq/standard-query-operators/sorting-data)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 30] LINQ Where·Select로 선별과 변환 분리하기]({{ '/study/2024/csharp/30-linq-filter/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 32] GroupBy로 부서별 건수 집계하기 →]({{ '/study/2024/csharp/32-linq-group/' | relative_url }})
