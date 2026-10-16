---
layout: content
title: "[병원 업무 공부 25] 일별 집계의 경계 시각 정하기"
date: 2024-12-09 09:00:00 +0900
categories: [HospitalIT]
tags: [2024학습노트, 병원업무자동화]
series: study-2024-csharp-hospital
study_track: hospital
study_order: 73
study_unit: 10
permalink: /study/2024/hospital/25-daily-cutoff/
---

하루 집계에서 마지막 순간을 억지로 계산하지 않고 다음 날 시작 직전까지 포함하는 규칙을 썼다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다. 병원 업무는 가상 자료를 이용한 전산 학습 모델이다.

## 오늘 정리한 개념

[당일 시작, 다음 날 시작) 구간은 소수초 정밀도에 기대지 않고 경계를 정의할 수 있다. 실제 집계의 업무 시간대·마감 시각·정정 반영 정책은 기관마다 정해야 한다. 아래는 UTC 시각의 가상 거래 두 개만 검사한다. 현지 날짜를 UTC 날짜로 무조건 바꾸어 집계하지 않는다.

## 따라 해 보기

{% raw %}
```csharp
var start = new DateTimeOffset(2024, 12, 1, 0, 0, 0, TimeSpan.Zero);
var end = start.AddDays(1);
var stamps = new[] { start.AddHours(23), end };
Console.WriteLine(stamps.Count(stamp => stamp >= start && stamp < end));
Console.WriteLine(stamps.Count(stamp => stamp >= end && stamp < end.AddDays(1)));
```
{% endraw %}

## 실행 결과

```text
1
1
```

## 코드를 따라 읽기

다음 날 0시는 오늘 집계에서 제외되고 다음 날 집계에 들어간다. 같은 사건을 이틀에 중복 포함하지 않는다. 실제 마감 이후 들어오는 지연 자료는 별도 재집계·정정 정책이 필요하다. 발생 시각과 입력 시각도 구분하면 집계 기준을 설명하기 쉽다.

## 헷갈린 부분과 주의점

DateTime의 지역 종류와 오프셋 없는 문자열을 혼용하지 않는다. 데이터베이스와 보고서의 시간대 설정을 대조한다.

## 복습 문제

끝 경계를 <=로 쓰면 어떤 문제가 생길 수 있을까?

**풀이:** 다음 날 시작 자료가 양쪽 날짜에 들어가 중복 집계될 수 있다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/api/system.datetimeoffset?view=net-8.0)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [병원 업무 공부 24] 환불은 원본과 연결한 별도 거래로 기록하기]({{ '/study/2024/hospital/24-refund-ledger/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [병원 업무 공부 26] 가상 소모품 재고의 유효기간별 정렬 →]({{ '/study/2024/hospital/26-inventory-expiry/' | relative_url }})
