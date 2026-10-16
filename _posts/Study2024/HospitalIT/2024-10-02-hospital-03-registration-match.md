---
layout: content
title: "[병원 업무 공부 03] 등록 자료의 정확 일치와 확인 필요 상태"
date: 2024-10-02 09:00:00 +0900
categories: [HospitalIT]
tags: [2024학습노트, 병원업무자동화]
series: study-2024-csharp-hospital
study_track: hospital
study_order: 51
study_unit: 7
permalink: /study/2024/hospital/03-registration-match/
---

외부 등록 코드를 내부 목록에서 찾는 작은 예제를 만들었다. 자동으로 못 찾았을 때 임의의 대상을 선택하지 않기로 했다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다. 병원 업무는 가상 자료를 이용한 전산 학습 모델이다.

## 오늘 정리한 개념

조회 성공·미등록·다중 후보는 다른 결과다. 아래에서는 가상 발급 범위와 코드의 정확한 쌍이 한 건일 때만 매핑값을 반환한다. 이름·전화번호·생년월일로 실제 환자를 추정하는 로직은 포함하지 않는다. 자동 연결을 못한 항목은 확인 대상으로 남기는 데이터 처리 모델이다.

## 따라 해 보기

{% raw %}
```csharp
var map = new Dictionary<(string System, string Code), string>
{
    [("test-a", "TEST-EXT01")] = "TEST-P01"
};
foreach (string code in new[] { "TEST-EXT01", "TEST-EXT99" })
{
    Console.WriteLine(map.TryGetValue(("test-a", code), out string? id) ? id : "확인 필요");
}
```
{% endraw %}

## 실행 결과

```text
TEST-P01
확인 필요
```

## 코드를 따라 읽기

등록된 외부 코드만 내부 가상 ID로 변환한다. 미등록 코드는 삭제하거나 첫 행에 붙이지 않는다. 실제 연동에서는 일대다·중복 등록·기관 변경을 처리할 정책이 필요하다. 이 예제의 사전은 데이터 매핑 개념이며 환자 본인 확인 정책을 대체하지 않는다.

## 헷갈린 부분과 주의점

단순한 부분 문자열이나 비슷한 이름으로 대상을 자동 확정하면 잘못된 연결이 생길 수 있다. 매칭 근거와 수동 검토 결과를 추적한다.

## 복습 문제

후보가 두 명일 때 첫 번째 결과를 고르면 될까?

**풀이:** 후보의 순서에 의미가 없을 수 있으므로 다중 후보를 별도 확인 상태로 처리한다.

## 참고한 문서

[HL7 FHIR R4 공식 문서](https://hl7.org/fhir/R4/patient.html)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [병원 업무 공부 02] 환자·방문·검체 식별자의 발급 범위]({{ '/study/2024/hospital/02-identifier-scope/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [병원 업무 공부 04] 예약 시간 중복을 반열린 구간으로 계산하기 →]({{ '/study/2024/hospital/04-appointment-overlap/' | relative_url }})
