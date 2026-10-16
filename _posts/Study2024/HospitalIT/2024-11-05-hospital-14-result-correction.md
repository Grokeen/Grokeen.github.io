---
layout: content
title: "[병원 업무 공부 14] 결과 정정 버전과 원본 이력"
date: 2024-11-05 09:00:00 +0900
categories: [HospitalIT]
tags: [2024학습노트, 병원업무자동화]
series: study-2024-csharp-hospital
study_track: hospital
study_order: 62
study_unit: 8
permalink: /study/2024/hospital/14-result-correction/
---

정정된 값만 덮어쓰면 이전 보고를 추적하기 어렵다고 생각했다. 원본 버전과 새 버전을 함께 남겼다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다. 병원 업무는 가상 자료를 이용한 전산 학습 모델이다.

## 오늘 정리한 개념

결과의 수정은 새 버전·수정 사유·수행 주체·확인 시각을 포함해 추적할 수 있어야 한다. 아래는 가상 문서 결과의 정수 버전만 모델링한다. 실제 의료 결과 정정·통보·승인 기준은 기관 규정과 관련 표준의 상태 정의를 확인해야 한다.

## 따라 해 보기

{% raw %}
```csharp
var versions = new List<ReportVersion>
{
    new("TEST-R01", 1, "초안"),
    new("TEST-R01", 2, "표기 정정")
};
var latest = versions.OrderByDescending(item => item.Version).First();
Console.WriteLine($"최신 {latest.Version}/{latest.Text}");
Console.WriteLine($"보존 {versions.Count}");

// 예제용 형식
public record ReportVersion(string Id, int Version, string Text);
```
{% endraw %}

## 실행 결과

```text
최신 2/표기 정정
보존 2
```

## 코드를 따라 읽기

최신 표시는 2번이지만 원본 1번을 목록에서 제거하지 않는다. 버전 순서를 클라이언트가 임의로 증가시키면 동시 수정에서 충돌할 수 있어 저장소가 제어해야 한다. 실제 결과 내용의 임상적 타당성을 이 코드는 판단하지 않는다. 표시와 보존 계약을 분리했다.

## 헷갈린 부분과 주의점

내용 해시가 같다고 승인·발행 상태까지 같다는 뜻은 아니다. 상태와 변경 사유도 업무 기록의 일부다.

## 복습 문제

정정 결과를 저장한 뒤 이전 수신처에는 무엇이 필요할까?

**풀이:** 기존 전송과 새 버전의 관계를 알리는 계약과 재통보·확인 절차를 정의해야 한다.

## 참고한 문서

[HL7 FHIR R4 공식 문서](https://hl7.org/fhir/R4/diagnosticreport.html)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [병원 업무 공부 13] 결과 데이터의 값·단위·상태 함께 다루기]({{ '/study/2024/hospital/13-result-units/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [병원 업무 공부 15] DICOM의 Study·Series·Instance 계층 →]({{ '/study/2024/hospital/15-dicom-identifiers/' | relative_url }})
