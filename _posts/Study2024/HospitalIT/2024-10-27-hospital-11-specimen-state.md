---
layout: content
title: "[병원 업무 공부 11] 검체 식별자와 수령 상태 이력"
date: 2024-10-27 09:00:00 +0900
categories: [HospitalIT]
tags: [2024학습노트, 병원업무자동화]
series: study-2024-csharp-hospital
study_track: hospital
study_order: 59
study_unit: 8
permalink: /study/2024/hospital/11-specimen-state/
---

검체의 대상 ID와 이동·수령 이력을 나누었다. 현재 상태만 덮어쓰면 이전 처리 과정을 잃을 수 있었다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다. 병원 업무는 가상 자료를 이용한 전산 학습 모델이다.

## 오늘 정리한 개념

FHIR Specimen은 검체와 관련된 식별·수집 정보를 표현하는 참고 자원이다. 아래 Created·Received 상태는 수령 흐름을 설명하기 위한 내부 모델이며 표준의 전체 상태 체계와 같지 않다. 실제 채취·인수 절차는 기관 규정과 담당자 확인을 따라야 한다.

## 따라 해 보기

{% raw %}
```csharp
var history = new List<SpecimenEvent>
{
    new("TEST-S01", "Created", 1),
    new("TEST-S01", "Received", 2)
};
foreach (var item in history.OrderBy(item => item.Sequence))
    Console.WriteLine($"{item.SpecimenId}/{item.State}/{item.Sequence}");

// 예제용 형식
public record SpecimenEvent(string SpecimenId, string State, int Sequence);
```
{% endraw %}

## 실행 결과

```text
TEST-S01/Created/1
TEST-S01/Received/2
```

## 코드를 따라 읽기

동일한 검체에 별도의 사건을 추가해 순서를 보존한다. 실제 기록에는 시각·수행 주체·장소·오류 사유 같은 맥락이 더 필요하다. 표본을 다루는 실제 임상 지침은 이 전산 모델만으로 대체할 수 없다. 입력 정정과 실제 재수령도 다른 사건으로 구분해야 한다.

## 헷갈린 부분과 주의점

최신 수령 상태가 있다는 이유로 잘못된 대상 연결을 정상으로 간주하지 않는다. 검체·요청·방문의 참조 관계를 대조한다.

## 복습 문제

같은 검체 라벨을 다시 출력하면 새 검체로 만들어야 할까?

**풀이:** 재출력과 새 검체 생성은 다른 사건이다. 대상 식별자와 출력 이력을 분리해 관리한다.

## 참고한 문서

[HL7 FHIR R4 공식 문서](https://hl7.org/fhir/R4/specimen.html)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [병원 업무 공부 10] 바코드에서 읽은 문자열 형식 검증하기]({{ '/study/2024/hospital/10-barcode-parse/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [병원 업무 공부 12] 라벨 재출력 번호와 대상 ID 구별하기 →]({{ '/study/2024/hospital/12-label-reprint/' | relative_url }})
