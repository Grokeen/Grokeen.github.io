---
layout: content
title: "[병원 업무 공부 26] 가상 소모품 재고의 유효기간별 정렬"
date: 2024-12-12 09:00:00 +0900
categories: [HospitalIT]
tags: [2024학습노트, 병원업무자동화]
series: study-2024-csharp-hospital
study_track: hospital
study_order: 74
study_unit: 10
permalink: /study/2024/hospital/26-inventory-expiry/
---

입고 순서와 만료 순서가 다를 수 있어 날짜 기준을 분리했다. 실제 사용 가능 여부 판단은 별도 규정이 필요했다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다. 병원 업무는 가상 자료를 이용한 전산 학습 모델이다.

## 오늘 정리한 개념

아래는 가상 소모품 로트를 유효일 기준으로 정렬하는 전산 예제다. 기준일 이후인 로트만 후보로 고르고 먼저 만료되는 순서를 표시한다. 기준일 당일은 제외한다는 학습 규칙을 명시했다. 실제 약품·멸균물품의 사용·회수·보관 판정은 이 단순 날짜 비교로 결정할 수 없다.

## 따라 해 보기

{% raw %}
```csharp
var day = new DateOnly(2024, 12, 1);
var lots = new[]
{
    new Lot("TEST-L01", new DateOnly(2024, 12, 10)),
    new Lot("TEST-L02", new DateOnly(2024, 11, 30)),
    new Lot("TEST-L03", new DateOnly(2024, 12, 5))
};
foreach (var lot in lots.Where(lot => lot.Expires > day).OrderBy(lot => lot.Expires))
    Console.WriteLine(lot.Id);

// 예제용 형식
public record Lot(string Id, DateOnly Expires);
```
{% endraw %}

## 실행 결과

```text
TEST-L03
TEST-L01
```

## 코드를 따라 읽기

11월30일 로트는 후보에서 빠지고 12월5일이 12월10일보다 먼저 나온다. 재고 수량·보관 조건·개봉 후 기한·리콜 여부는 포함하지 않았다. 실제 우선 출고와 사용 승인은 여러 조건을 함께 검증해야 한다. 날짜는 표시 문자열 대신 DateOnly로 비교한다.

## 헷갈린 부분과 주의점

품목별로 유효기간의 마지막 날 해석이 다를 수 있다. 이 예제의 > 비교를 실제 제품 규정으로 그대로 사용하지 않는다.

## 복습 문제

입고가 빨랐다고 항상 만료도 빠를까?

**풀이:** 아니다. 입고일과 제조·만료일은 다른 속성이므로 필요한 기준으로 정렬한다.

## 참고한 문서

[HL7 FHIR R4 공식 문서](https://hl7.org/fhir/R4/supplydelivery.html)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [병원 업무 공부 25] 일별 집계의 경계 시각 정하기]({{ '/study/2024/hospital/25-daily-cutoff/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [병원 업무 공부 27] 로그인과 자료 접근 권한 분리하기 →]({{ '/study/2024/hospital/27-authorization/' | relative_url }})
