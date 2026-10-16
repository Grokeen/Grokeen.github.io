---
layout: content
title: "[병원 업무 공부 05] 예약 슬롯의 정원과 남은 자리"
date: 2024-10-08 09:00:00 +0900
categories: [HospitalIT]
tags: [2024학습노트, 병원업무자동화]
series: study-2024-csharp-hospital
study_track: hospital
study_order: 53
study_unit: 7
permalink: /study/2024/hospital/05-slot-capacity/
---

예약 개수와 자원 수용량을 분리했다. 한 건을 취소한 뒤 남은 자리 계산도 다시 확인했다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다. 병원 업무는 가상 자료를 이용한 전산 학습 모델이다.

## 오늘 정리한 개념

Slot은 예약 가능한 시간 단위를 표현하는 참고 개념이다. 아래는 정원 2인 가상 행정 예약 슬롯을 사용한다. 정원·중복 예약 허용·예약 확정 시점은 기관별 규칙이다. 예약을 넣기 전 남은 수를 확인하는 단순 코드와 실제 동시 요청을 원자적으로 처리하는 것은 구별해야 한다.

## 따라 해 보기

{% raw %}
```csharp
int capacity = 2;
var bookings = new HashSet<string>(StringComparer.Ordinal);
bool Book(string id) => bookings.Count < capacity && bookings.Add(id);
Console.WriteLine(Book("TEST-A01"));
Console.WriteLine(Book("TEST-A02"));
Console.WriteLine(Book("TEST-A03"));
bookings.Remove("TEST-A01");
Console.WriteLine(capacity - bookings.Count);
```
{% endraw %}

## 실행 결과

```text
True
True
False
1
```

## 코드를 따라 읽기

두 건이 들어가면 세 번째는 거절되고 하나를 취소하면 빈자리가 1이 된다. 입력 검사·만료된 임시 점유·예약 상태는 생략한 모델이다. 실제 저장소에서는 정원 확인과 추가가 하나의 일관된 처리로 이루어져야 중복 확정을 줄일 수 있다.

## 헷갈린 부분과 주의점

이 함수는 중복 예약 ID의 멱등 성공 응답까지 구현하지 않는다. 이미 있는 예약을 다시 요청한 경우의 응답을 별도로 정의할 수 있다.

## 복습 문제

두 서버가 동시에 마지막 한 자리를 조회하면?

**풀이:** 둘 다 가능하다고 볼 수 있어 저장소 수준의 동시성 제어가 필요하다.

## 참고한 문서

[HL7 FHIR R4 공식 문서](https://hl7.org/fhir/R4/slot.html)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [병원 업무 공부 04] 예약 시간 중복을 반열린 구간으로 계산하기]({{ '/study/2024/hospital/04-appointment-overlap/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [병원 업무 공부 06] 취소 재요청을 같은 결과로 처리하기 →]({{ '/study/2024/hospital/06-appointment-cancel/' | relative_url }})
