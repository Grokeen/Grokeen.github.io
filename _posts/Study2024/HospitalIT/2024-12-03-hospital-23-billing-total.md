---
layout: content
title: "[병원 업무 공부 23] 수가 판단과 분리한 가상 수납 합계"
date: 2024-12-03 09:00:00 +0900
categories: [HospitalIT]
tags: [2024학습노트, 병원업무자동화]
series: study-2024-csharp-hospital
study_track: hospital
study_order: 71
study_unit: 9
permalink: /study/2024/hospital/23-billing-total/
---

C# decimal로 가상 내역 금액을 합산했다. 실제 수가·급여·본인부담 기준을 추정해서 코드에 넣지는 않았다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다. 병원 업무는 가상 자료를 이용한 전산 학습 모델이다.

## 오늘 정리한 개념

수납 데이터 처리에서는 항목·수량·단가·조정·최종 금액의 의미를 분리한다. 아래 가격은 학습용 임의 값이며 진료비 청구 규칙을 나타내지 않는다. decimal로 계산하고 최종 표시 형식을 정한다. 실제 비용 산정과 자격·급여 판단은 유효한 업무 규정과 담당 시스템 결과를 따라야 한다.

## 따라 해 보기

{% raw %}
```csharp
var lines = new[] { new Charge("TEST-L01", 1000m, 2), new Charge("TEST-L02", 500m, 1) };
decimal total = lines.Sum(line => line.UnitPrice * line.Count);
Console.WriteLine(total);
Console.WriteLine(lines.Length);

// 예제용 형식
public record Charge(string Id, decimal UnitPrice, int Count);
```
{% endraw %}

## 실행 결과

```text
2500
2
```

## 코드를 따라 읽기

가상 항목 두 개의 금액 2000과 500을 합쳐 2500이다. 실제 저장에서는 취소·정정·중복 항목을 어느 시점 기준으로 포함할지 정해야 한다. 화면에서 보이는 합계와 결제 확정액은 다른 처리 상태일 수 있다. 분류와 계산 로직을 따로 검증한다.

## 헷갈린 부분과 주의점

임의의 할인율이나 부담률을 실제 제도인 것처럼 적용하지 않는다. 반올림·절사 단위도 해당 업무 계약을 확인한다.

## 복습 문제

두 화면의 합계가 다르면 산술 오류만 볼까?

**풀이:** 포함 항목·버전·취소 상태·집계 시점이 같은지부터 함께 확인한다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/api/system.decimal?view=net-8.0)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [병원 업무 공부 22] 동시 수정에서 예상 버전 비교하기]({{ '/study/2024/hospital/22-optimistic-version/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [병원 업무 공부 24] 환불은 원본과 연결한 별도 거래로 기록하기 →]({{ '/study/2024/hospital/24-refund-ledger/' | relative_url }})
