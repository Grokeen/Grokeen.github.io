---
layout: content
title: "[병원 업무 공부 01] 접수·예약·수행·수납을 서로 다른 업무로 나누기"
date: 2024-09-26 09:00:00 +0900
categories: [HospitalIT]
tags: [2024학습노트, 병원업무자동화]
series: study-2024-csharp-hospital
study_track: hospital
study_order: 49
study_unit: 7
permalink: /study/2024/hospital/01-workflow/
---

병원 업무를 화면 순서 하나로만 외우지 않고 각 단계의 목적과 데이터로 나누었다. 예약이 있다고 실제 방문이 완료된 것은 아니었다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다. 병원 업무는 가상 자료를 이용한 전산 학습 모델이다.

## 오늘 정리한 개념

예약은 계획, 접수는 방문 처리, 수행은 요청된 업무의 진행, 수납은 금액 처리라는 서로 다른 사건이다. 실제 기관마다 명칭과 연결 방식은 다를 수 있다. 아래 모델은 접수 전·접수됨·마감이라는 단순 행정 상태만 사용한다. 임상 판단과 실제 표준의 전체 상태 전이를 구현하지 않는다.

## 따라 해 보기

{% raw %}
```csharp
DeskState state = DeskState.Created;
state = Next(state, "접수");
Console.WriteLine(state);
state = Next(state, "마감");
Console.WriteLine(state);

DeskState Next(DeskState current, string action) => (current, action) switch
{
    (DeskState.Created, "접수") => DeskState.CheckedIn,
    (DeskState.CheckedIn, "마감") => DeskState.Closed,
    _ => throw new InvalidOperationException("허용되지 않은 전이")
};

// 예제용 형식
public enum DeskState { Created, CheckedIn, Closed }
```
{% endraw %}

## 실행 결과

```text
CheckedIn
Closed
```

## 코드를 따라 읽기

현재 상태와 행동의 쌍으로 다음 상태를 결정한다. 이행할 수 없는 조합은 조용히 통과시키지 않는다. FHIR의 Appointment와 Encounter도 계획과 실제 활동을 구분하는 참고 개념이지만 이 내부 enum이 표준 상태 전체와 같지는 않다. 상태별 변경 권한과 기록도 실제 업무 설계에 포함한다.

## 헷갈린 부분과 주의점

완료 문구가 화면에 보였다는 이유만으로 저장·수납·수행이 모두 확정되었다고 판단하지 않는다. 각 처리의 확인 근거를 분리한다.

## 복습 문제

예약 취소와 방문 접수 취소는 항상 같은 기록일까?

**풀이:** 대상과 영향이 다를 수 있으므로 별도 업무 사건으로 구분하고 연결 관계를 확인한다.

## 참고한 문서

[HL7 FHIR R4 공식 문서](https://hl7.org/fhir/R4/encounter.html)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 48] 종합 실습: 가상 접수 자료를 검증해 대기열에 넣기]({{ '/study/2024/csharp/48-csharp-project/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [병원 업무 공부 02] 환자·방문·검체 식별자의 발급 범위 →]({{ '/study/2024/hospital/02-identifier-scope/' | relative_url }})
