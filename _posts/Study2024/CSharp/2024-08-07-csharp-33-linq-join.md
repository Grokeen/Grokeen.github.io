---
layout: content
title: "[C# 공부 33] Join으로 코드와 설명 연결하기"
date: 2024-08-07 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 33
study_unit: 5
permalink: /study/2024/csharp/33-linq-join/
---

코드만 있는 목록에 별도 코드표의 이름을 붙였다. 짝이 없는 행을 어떻게 처리할지도 확인했다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

Join은 두 시퀀스의 키가 같은 항목끼리 연결하는 내부 조인이다. 대응값이 없는 행은 결과에서 빠진다. 양쪽에 같은 키가 여러 번 있으면 여러 조합이 생겨 행 수가 늘 수 있다. 조인 전 키의 유일성과 누락 처리 정책을 정해야 집계 오류를 줄일 수 있다.

## 따라 해 보기

{% raw %}
```csharp
var visits = new[] { (Id: "TEST-V01", Dept: "ADM"), (Id: "TEST-V02", Dept: "ETC") };
var names = new[] { (Code: "ADM", Name: "원무") };
var joined = visits.Join(names, visit => visit.Dept, name => name.Code,
    (visit, name) => $"{visit.Id}/{name.Name}");
Console.WriteLine(string.Join(",", joined));
```
{% endraw %}

## 실행 결과

```text
TEST-V01/원무
```

## 코드를 따라 읽기

ADM은 코드표와 연결되지만 ETC는 없어서 내부 조인 결과에서 사라진다. 실제 데이터 보정에서는 누락 항목을 별도로 표시하거나 외부 조인을 사용해야 한다. 이 예제는 연결 규칙을 보기 위한 것으로 미등록 코드를 자동 무시하는 운영 정책을 권하는 것은 아니다.

## 헷갈린 부분과 주의점

조인 뒤 행 수가 원본과 같다고 가정하지 않는다. 코드표에 중복 키가 있으면 한 접수 항목이 여러 번 나올 수 있다.

## 복습 문제

코드표의 ADM이 두 행이면 첫 방문 결과도 늘어날 수 있을까?

**풀이:** 그렇다. 일치하는 각 조합이 생성되므로 키 유일성을 확인해야 한다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/csharp/linq/standard-query-operators/join-operations)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 32] GroupBy로 부서별 건수 집계하기]({{ '/study/2024/csharp/32-linq-group/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 34] 지연 실행과 ToList의 스냅샷 차이 →]({{ '/study/2024/csharp/34-linq-deferred/' | relative_url }})
