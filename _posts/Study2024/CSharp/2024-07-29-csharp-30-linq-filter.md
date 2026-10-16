---
layout: content
title: "[C# 공부 30] LINQ Where·Select로 선별과 변환 분리하기"
date: 2024-07-29 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 30
study_unit: 4
permalink: /study/2024/csharp/30-linq-filter/
---

조회 결과에서 필요한 항목만 고르고 표시 형태로 바꾸었다. 어떤 단계가 개수를 바꾸는지 구별했다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

Where는 조건을 만족하는 항목을 남기고 Select는 각 항목을 다른 값으로 변환한다. 보통 IEnumerable에 대한 연산은 지연 실행되므로 열거할 때 처리된다. ToArray·ToList로 결과를 구체화할 수 있다. 실제 DB의 IQueryable은 다른 실행 규칙과 번역 제약이 있다는 점도 구분한다.

## 따라 해 보기

{% raw %}
```csharp
int[] counts = { 0, 2, 3, -1 };
string[] labels = counts
    .Where(value => value > 0)
    .Select(value => $"건수 {value}")
    .ToArray();
Console.WriteLine(string.Join(" / ", labels));
```
{% endraw %}

## 실행 결과

```text
건수 2 / 건수 3
```

## 코드를 따라 읽기

Where가 0과 -1을 제외하고 Select가 남은 숫자를 문장으로 바꾼다. ToArray에서 결과를 실제 배열로 만든다. 검증과 표시를 같은 람다에 숨기지 않아 각 단계의 책임을 설명하기 쉽다. 메모리 예제 성공이 DB 쿼리 번역 가능성을 뜻하지는 않는다.

## 헷갈린 부분과 주의점

조건에 맞는 항목이 없을 때도 빈 결과가 정상일 수 있다. First를 바로 호출하기 전에 빈 결과 계약을 정한다.

## 복습 문제

`Select(value => value > 0)`는 양수 항목만 남길까?

**풀이:** 아니다. 모든 항목을 bool로 변환한다. 개수 선별은 Where의 역할이다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/csharp/linq/standard-query-operators/filtering-data)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 29] using과 IDisposable로 자원 수명 관리하기]({{ '/study/2024/csharp/29-using-dispose/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 31] OrderBy·ThenBy로 정렬 기준 연결하기 →]({{ '/study/2024/csharp/31-linq-ordering/' | relative_url }})
