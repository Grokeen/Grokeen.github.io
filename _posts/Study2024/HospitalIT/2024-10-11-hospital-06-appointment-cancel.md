---
layout: content
title: "[병원 업무 공부 06] 취소 재요청을 같은 결과로 처리하기"
date: 2024-10-11 09:00:00 +0900
categories: [HospitalIT]
tags: [2024학습노트, 병원업무자동화]
series: study-2024-csharp-hospital
study_track: hospital
study_order: 54
study_unit: 7
permalink: /study/2024/hospital/06-appointment-cancel/
---

네트워크 재시도로 같은 취소가 두 번 오는 상황을 고려했다. 이미 취소된 요청을 다시 받아도 상태를 흔들지 않게 했다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다. 병원 업무는 가상 자료를 이용한 전산 학습 모델이다.

## 오늘 정리한 개념

멱등 동작은 같은 요청을 반복해도 의도한 최종 상태가 한 번 처리한 결과와 같게 만드는 성질이다. 아래 내부 예약 모델은 Booked에서 Cancelled로 바꾸고 이미 Cancelled면 그대로 성공 상태를 반환한다. 다른 상태에서 취소 가능 여부는 실제 정책에 따라 추가한다.

## 따라 해 보기

{% raw %}
```csharp
string state = "Booked";
string Cancel()
{
    if (state == "Cancelled") return state;
    if (state != "Booked") throw new InvalidOperationException("상태 확인 필요");
    state = "Cancelled";
    return state;
}
Console.WriteLine(Cancel());
Console.WriteLine(Cancel());
```
{% endraw %}

## 실행 결과

```text
Cancelled
Cancelled
```

## 코드를 따라 읽기

첫 호출에서 상태가 바뀌고 두 번째는 같은 결과를 돌려준다. 실제 환불·슬롯 반환·알림 발송은 각각 중복 실행을 막아야 하므로 상태 문자열 한 개만으로 전체 업무가 멱등해지는 것은 아니다. 취소 요청 ID와 처리 이력도 함께 고려한다.

## 헷갈린 부분과 주의점

취소 버튼을 비활성화하는 화면 처리만으로 서버 재요청을 막을 수는 없다. 서버가 상태와 요청을 검증해야 한다.

## 복습 문제

취소 알림을 매 재요청마다 보내면 전체 업무가 멱등할까?

**풀이:** 상태는 같아도 부수 효과가 중복될 수 있어 알림도 별도의 중복 정책이 필요하다.

## 참고한 문서

[HL7 FHIR R4 공식 문서](https://hl7.org/fhir/R4/appointment.html)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [병원 업무 공부 05] 예약 슬롯의 정원과 남은 자리]({{ '/study/2024/hospital/05-slot-capacity/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [병원 업무 공부 07] 예약과 실제 방문 기록 연결하기 →]({{ '/study/2024/hospital/07-encounter-link/' | relative_url }})
