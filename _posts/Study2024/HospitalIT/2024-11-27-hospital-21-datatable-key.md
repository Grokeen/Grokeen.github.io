---
layout: content
title: "[병원 업무 공부 21] 기본 키와 중복 자료 거절"
date: 2024-11-27 09:00:00 +0900
categories: [HospitalIT]
tags: [2024학습노트, 병원업무자동화]
series: study-2024-csharp-hospital
study_track: hospital
study_order: 69
study_unit: 9
permalink: /study/2024/hospital/21-datatable-key/
---

같은 ID가 두 번 들어오지 않도록 표의 키 제약을 사용했다. 화면 확인만으로 중복을 막는 방식과 비교했다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다. 병원 업무는 가상 자료를 이용한 전산 학습 모델이다.

## 오늘 정리한 개념

기본 키는 각 행을 구별하는 열 또는 열 묶음이다. DataTable.PrimaryKey를 설정하면 메모리 표에서 유일성 제약을 적용할 수 있다. Rows.Find는 기본 키로 조회한다. 실제 DB도 적절한 키·고유 제약이 필요하지만 메모리 제약을 설정했다고 원격 저장소에 자동 적용되는 것은 아니다.

## 따라 해 보기

{% raw %}
```csharp
using System.Data;

using var table = new DataTable();
var idColumn = table.Columns.Add("Id", typeof(string));
table.PrimaryKey = new[] { idColumn };
table.Rows.Add("TEST-D01");
try { table.Rows.Add("TEST-D01"); }
catch (ConstraintException) { Console.WriteLine("중복 거절"); }
Console.WriteLine(table.Rows.Find("TEST-D01") != null);
Console.WriteLine(table.Rows.Count);
```
{% endraw %}

## 실행 결과

```text
중복 거절
True
1
```

## 코드를 따라 읽기

중복 삽입이 거절되어 원래 한 행만 남는다. 실제 업무에서는 ID의 발급 범위와 정정·재처리의 키를 구별해야 한다. 한 번 실패한 삽입을 성공으로 보여 주지 않고 호출자가 기존 자료인지 확인하도록 응답 계약을 정한다.

## 헷갈린 부분과 주의점

환자·방문·검체 등 서로 다른 대상을 같은 기본 키 규칙으로 무조건 묶지 않는다. 키가 같다는 업무상 의미를 먼저 정의한다.

## 복습 문제

키 열이 두 개인 복합 키가 필요한 경우는?

**풀이:** 기관 범위와 외부 번호처럼 두 값이 함께 유일성을 정하는 경우다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/api/system.data.datatable.primarykey?view=net-8.0)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [병원 업무 공부 20] DataTable로 열 자료형과 행 의미 정의하기]({{ '/study/2024/hospital/20-datatable-schema/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [병원 업무 공부 22] 동시 수정에서 예상 버전 비교하기 →]({{ '/study/2024/hospital/22-optimistic-version/' | relative_url }})
