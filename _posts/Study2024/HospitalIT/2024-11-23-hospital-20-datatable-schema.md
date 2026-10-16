---
layout: content
title: "[병원 업무 공부 20] DataTable로 열 자료형과 행 의미 정의하기"
date: 2024-11-23 09:00:00 +0900
categories: [HospitalIT]
tags: [2024학습노트, 병원업무자동화]
series: study-2024-csharp-hospital
study_track: hospital
study_order: 68
study_unit: 9
permalink: /study/2024/hospital/20-datatable-schema/
---

DB를 연결하기 전에 표의 열과 자료형부터 선언했다. 한 행이 무엇을 뜻하는지 정해야 집계도 맞출 수 있었다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다. 병원 업무는 가상 자료를 이용한 전산 학습 모델이다.

## 오늘 정리한 개념

DataTable은 메모리 안의 표 구조를 제공한다. 열마다 자료형을 정하면 행 값의 구조를 표현할 수 있다. 아래는 가상 문서 처리 건의 ID와 페이지 수다. 실제 DB 연결·영구 저장·트랜잭션을 수행하지 않으며 SQL 테이블의 모든 제약을 대신하지 않는다.

## 따라 해 보기

{% raw %}
```csharp
using System.Data;

using var table = new DataTable("Documents");
table.Columns.Add("Id", typeof(string));
table.Columns.Add("Pages", typeof(int));
table.Rows.Add("TEST-D01", 3);
Console.WriteLine(table.Rows.Count);
Console.WriteLine(table.Rows[0]["Id"]);
Console.WriteLine(table.Columns["Pages"]!.DataType.Name);
```
{% endraw %}

## 실행 결과

```text
1
TEST-D01
Int32
```

## 코드를 따라 읽기

문서 한 건을 행 하나로 정의하고 페이지 수를 int 열로 둔다. DataRow의 인덱서는 object 계열 값을 반환하므로 필요한 변환·null 처리를 명확히 해야 한다. !는 이 코드에서 방금 만든 열의 존재를 알고 경고를 억제한 것이며 일반 외부 입력에서 안전을 보장하는 연산자가 아니다.

## 헷갈린 부분과 주의점

DB의 NULL과 C# null, DataTable의 DBNull을 구분한다. 임의의 값이 없다고 0이나 빈 문자열로 바꾸면 의미가 달라질 수 있다.

## 복습 문제

테이블을 만들면 실제 병원 DB에도 저장될까?

**풀이:** 아니다. 이 예제는 현재 프로그램 메모리 안에서만 표를 다룬다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/framework/data/adonet/dataset-datatable-dataview/datatables)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [병원 업무 공부 19] 일시 실패와 영구 오류를 나누는 재시도]({{ '/study/2024/hospital/19-rpa-retry/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [병원 업무 공부 21] 기본 키와 중복 자료 거절 →]({{ '/study/2024/hospital/21-datatable-key/' | relative_url }})
