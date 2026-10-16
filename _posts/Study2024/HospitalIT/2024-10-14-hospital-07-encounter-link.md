---
layout: content
title: "[병원 업무 공부 07] 예약과 실제 방문 기록 연결하기"
date: 2024-10-14 09:00:00 +0900
categories: [HospitalIT]
tags: [2024학습노트, 병원업무자동화]
series: study-2024-csharp-hospital
study_track: hospital
study_order: 55
study_unit: 7
permalink: /study/2024/hospital/07-encounter-link/
---

예약을 만들었다는 사실과 실제 방문 이력이 생겼다는 사실을 분리했다. 연결은 가능하지만 같은 ID로 덮어쓰지는 않았다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다. 병원 업무는 가상 자료를 이용한 전산 학습 모델이다.

## 오늘 정리한 개념

FHIR에서 Appointment는 계획된 일정, Encounter는 실제 의료 서비스 상호작용을 표현하는 자원이다. 실제 업무에서는 당일 방문이나 하나의 예약에서 여러 처리 기록이 생기는 경우도 고려해야 한다. 아래는 가상 예약 ID를 참조하는 방문 한 건만 모델링한다.

## 따라 해 보기

{% raw %}
```csharp
var visit = new Visit("TEST-V01", "TEST-A01");
Console.WriteLine(visit.Id);
Console.WriteLine(visit.AppointmentId ?? "예약 연결 없음");
var walkIn = new Visit("TEST-V02", null);
Console.WriteLine(walkIn.AppointmentId ?? "예약 연결 없음");

// 예제용 형식
public record Visit(string Id, string? AppointmentId);
```
{% endraw %}

## 실행 결과

```text
TEST-V01
TEST-A01
예약 연결 없음
```

## 코드를 따라 읽기

예약 참조가 없는 방문도 표현할 수 있다. 실제 자원의 필수 항목과 참조 구조를 모두 구현한 FHIR 예제는 아니며 관계의 의미를 익히는 내부 모델이다. 예약 상태 변경과 방문 생성은 한 화면 동작이어도 서로 다른 변경으로 기록할 수 있다.

## 헷갈린 부분과 주의점

예약 취소가 이미 수행된 방문 이력을 삭제하는 의미라고 가정하지 않는다. 원본 이력과 잘못 입력한 자료의 정정 정책을 따로 정한다.

## 복습 문제

예약 ID를 방문 ID로 그대로 재사용하면 어떤 문제가 있을까?

**풀이:** 서로 다른 업무 객체의 식별 범위와 관계를 표현하기 어려워지고 다중 방문 등에 취약해질 수 있다.

## 참고한 문서

[HL7 FHIR R4 공식 문서](https://hl7.org/fhir/R4/encounter.html)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [병원 업무 공부 06] 취소 재요청을 같은 결과로 처리하기]({{ '/study/2024/hospital/06-appointment-cancel/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [병원 업무 공부 08] 행정 문서 대기열과 처리 순서 →]({{ '/study/2024/hospital/08-desk-queue/' | relative_url }})
