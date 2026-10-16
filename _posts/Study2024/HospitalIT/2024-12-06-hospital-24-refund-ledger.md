---
layout: content
title: "[병원 업무 공부 24] 환불은 원본과 연결한 별도 거래로 기록하기"
date: 2024-12-06 09:00:00 +0900
categories: [HospitalIT]
tags: [2024학습노트, 병원업무자동화]
series: study-2024-csharp-hospital
study_track: hospital
study_order: 72
study_unit: 9
permalink: /study/2024/hospital/24-refund-ledger/
---

환불하면서 원래 수납 행을 지우면 이력을 알기 어렵다고 생각했다. 가상 원장에 반대 금액의 거래를 추가했다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다. 병원 업무는 가상 자료를 이용한 전산 학습 모델이다.

## 오늘 정리한 개념

원장 모델에서 수납과 환불을 별도 거래로 남기면 이전 처리와 정정 관계를 추적할 수 있다. 아래 부호 규칙은 학습 모델의 가정이다. 실제 환불 승인·결제 취소·회계 기준은 기관 정책에 맞춰야 한다. 프로그램 계산은 결제사에 환불을 요청하거나 실제 돈을 이동시키지 않는다.

## 따라 해 보기

{% raw %}
```csharp
var entries = new[]
{
    new Entry("TEST-T01", null, 2500m),
    new Entry("TEST-T02", "TEST-T01", -500m)
};
Console.WriteLine(entries.Sum(entry => entry.Amount));
Console.WriteLine(entries[1].OriginalId);

// 예제용 형식
public record Entry(string Id, string? OriginalId, decimal Amount);
```
{% endraw %}

## 실행 결과

```text
2000
TEST-T01
```

## 코드를 따라 읽기

-500은 원본 거래를 참조하는 부분 환불 예시다. 총액은 2000이지만 원래 수납과 환불 행은 모두 보존된다. 실제로는 환불 누계가 원본을 초과하지 않는지, 요청과 확정이 다른 상태인지도 검증해야 한다. 감사 이력과 화면 합계를 함께 설계한다.

## 헷갈린 부분과 주의점

마이너스 행 하나를 만들었다고 외부 결제 취소가 확정된 것은 아니다. 재요청 중복과 실패 후 재확인도 처리한다.

## 복습 문제

환불 때 원본 수납을 삭제하면 어떤 정보가 사라질까?

**풀이:** 처음 처리한 금액·시점·정정 관계를 추적하기 어려워질 수 있다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/api/system.decimal?view=net-8.0)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [병원 업무 공부 23] 수가 판단과 분리한 가상 수납 합계]({{ '/study/2024/hospital/23-billing-total/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [병원 업무 공부 25] 일별 집계의 경계 시각 정하기 →]({{ '/study/2024/hospital/25-daily-cutoff/' | relative_url }})
