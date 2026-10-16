---
layout: content
title: "[병원 업무 공부 04] 예약 시간 중복을 반열린 구간으로 계산하기"
date: 2024-10-05 09:00:00 +0900
categories: [HospitalIT]
tags: [2024학습노트, 병원업무자동화]
series: study-2024-csharp-hospital
study_track: hospital
study_order: 52
study_unit: 7
permalink: /study/2024/hospital/04-appointment-overlap/
---

예약의 시작과 끝이 같은 경계에서 충돌하는지 규칙을 먼저 정했다. 문자열 시간이 아니라 시각 값으로 비교했다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다. 병원 업무는 가상 자료를 이용한 전산 학습 모델이다.

## 오늘 정리한 개념

이 학습 모델은 [시작, 끝) 구간을 사용해 끝 시각을 포함하지 않는다. 두 구간의 시작이 상대 끝보다 모두 빠르면 겹친다. 실제 예약은 담당자·장비·준비 시간·중복 허용 정책까지 고려해야 한다. 아래는 같은 자원의 가상 시간 두 개만 비교하는 예제다.

## 따라 해 보기

{% raw %}
```csharp
bool Overlaps(TimeOnly startA, TimeOnly endA, TimeOnly startB, TimeOnly endB)
{
    if (startA >= endA || startB >= endB) throw new ArgumentException("유효한 구간 필요");
    return startA < endB && startB < endA;
}
var start = new TimeOnly(9, 0);
var end = new TimeOnly(9, 30);
Console.WriteLine(Overlaps(start, end, new TimeOnly(9, 30), new TimeOnly(10, 0)));
Console.WriteLine(Overlaps(start, end, new TimeOnly(9, 15), new TimeOnly(9, 45)));
```
{% endraw %}

## 실행 결과

```text
False
True
```

## 코드를 따라 읽기

9시30분에 끝나는 예약과 그때 시작하는 예약은 이 모델에서 겹치지 않는다. 중간 15분부터 시작하면 겹친다. 준비·청소 등 완충 시간이 필요한 실제 자원은 점유 구간을 별도로 늘려 계산할 수 있다. 자정 넘는 예약은 날짜까지 포함한 구간으로 바꿔야 한다.

## 헷갈린 부분과 주의점

TimeOnly만으로 서로 다른 날짜 예약을 비교하지 않는다. 중복 검사와 저장이 분리되면 동시 요청에서 경합이 생길 수 있다.

## 복습 문제

두 예약이 서로 다른 장비를 사용하면 시간 중복만으로 거절해야 할까?

**풀이:** 자원과 업무 정책에 따라 다르다. 비교 대상 자원을 먼저 정의해야 한다.

## 참고한 문서

[HL7 FHIR R4 공식 문서](https://hl7.org/fhir/R4/appointment.html)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [병원 업무 공부 03] 등록 자료의 정확 일치와 확인 필요 상태]({{ '/study/2024/hospital/03-registration-match/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [병원 업무 공부 05] 예약 슬롯의 정원과 남은 자리 →]({{ '/study/2024/hospital/05-slot-capacity/' | relative_url }})
