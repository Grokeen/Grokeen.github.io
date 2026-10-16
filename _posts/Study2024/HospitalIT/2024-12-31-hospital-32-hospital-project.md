---
layout: content
title: "[병원 업무 공부 32] 종합 실습: 가상 문서 접수에서 처리 이력까지"
date: 2024-12-31 09:00:00 +0900
categories: [HospitalIT]
tags: [2024학습노트, 병원업무자동화]
series: study-2024-csharp-hospital
study_track: hospital
study_order: 80
study_unit: 10
permalink: /study/2024/hospital/32-hospital-project/
---

마지막에는 검증·중복·처리 결과를 한 흐름으로 묶었다. 실제 병원 시스템에 접속하지 않는 모의 문서 처리기다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다. 병원 업무는 가상 자료를 이용한 전산 학습 모델이다.

## 오늘 정리한 개념

필수 ID를 검사하고 처리 키를 확인한 뒤 결과 이력을 남긴다. 이 프로그램은 가상 문서 ID만 다루고 임상 판정·실제 청구·환자 조회를 하지 않는다. 저장소·권한·동시성·재시도 계약을 붙일 경계를 이해하는 것이 목표다. 앞의 예제들을 무조건 운영에 복사하지 않고 생략한 조건을 확인한다.

## 따라 해 보기

{% raw %}
```csharp
var processed = new HashSet<string>(StringComparer.Ordinal);
var history = new List<string>();
foreach (string? id in new string?[] { "TEST-D01", null, "TEST-D01", "TEST-D02" })
{
    if (string.IsNullOrWhiteSpace(id)) { history.Add("검토 필요"); continue; }
    if (!processed.Add(id)) { history.Add("중복 요청"); continue; }
    history.Add($"완료 {id}");
}
foreach (string item in history) Console.WriteLine(item);
Console.WriteLine($"처리 건수 {processed.Count}");
```
{% endraw %}

## 실행 결과

```text
완료 TEST-D01
검토 필요
중복 요청
완료 TEST-D02
처리 건수 2
```

## 코드를 따라 읽기

누락은 확인 대상으로, 중복은 별도 응답으로 남기고 정상 두 건을 처리한다. 실제 저장 실패를 넣으면 현재 processed 등록 시점의 한계를 확인할 수 있다. 다음 구현에서는 원자적 저장·재처리·감사 기록·목적별 인가를 추가해 각 계약을 검증해야 한다.

## 헷갈린 부분과 주의점

프로세스 종료 후 복구·실제 장비 출력·외부 API 보장까지 검증한 예제가 아니다. 자동화가 내리는 결정의 범위와 담당자 확인 지점을 명확히 둔다.

## 복습 문제

저장 전에 처리 키만 완료로 남기면 무슨 문제가 생길까?

**풀이:** 저장이 실패한 요청의 재시도까지 막을 수 있다. 상태와 실제 변경의 일관성을 설계해야 한다.

## 참고한 문서

[HL7 FHIR R4 공식 문서](https://hl7.org/fhir/R4/task.html)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [병원 업무 공부 31] 연동 자료의 중복·이전 버전 처리]({{ '/study/2024/hospital/31-integration-version/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})
