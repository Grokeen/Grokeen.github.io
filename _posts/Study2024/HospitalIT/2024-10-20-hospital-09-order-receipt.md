---
layout: content
title: "[병원 업무 공부 09] 요청과 수행 기록을 분리해 추적하기"
date: 2024-10-20 09:00:00 +0900
categories: [HospitalIT]
tags: [2024학습노트, 병원업무자동화]
series: study-2024-csharp-hospital
study_track: hospital
study_order: 57
study_unit: 8
permalink: /study/2024/hospital/09-order-receipt/
---

요청이 생성된 시각과 실제 처리 완료를 같은 기록으로 덮어쓰지 않기로 했다. 한 요청이 어떤 수행으로 이어졌는지 연결했다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다. 병원 업무는 가상 자료를 이용한 전산 학습 모델이다.

## 오늘 정리한 개념

ServiceRequest는 서비스 수행의 요청을 표현하는 참고 자원이다. 요청 생성·접수 확인·수행·결과 등록은 서로 다른 사건일 수 있다. 아래는 가상 행정 요청과 처리 기록의 관계만 모델링한다. 실제 검사나 처방을 생성하거나 수행 여부를 판단하는 프로그램은 아니다.

## 따라 해 보기

{% raw %}
```csharp
var request = new Request("TEST-REQ01", "TEST-V01");
var completion = new Completion("TEST-JOB01", request.Id);
Console.WriteLine($"요청 {request.Id}");
Console.WriteLine($"완료 연결 {completion.RequestId}");
Console.WriteLine(request.VisitId);

// 예제용 형식
public record Request(string Id, string VisitId);
public record Completion(string Id, string RequestId);
```
{% endraw %}

## 실행 결과

```text
요청 TEST-REQ01
완료 연결 TEST-REQ01
TEST-V01
```

## 코드를 따라 읽기

서로 다른 객체의 ID를 분리하고 참조값으로 연결했다. 실제 시스템에서는 요청 취소·일부 수행·재수행 등을 어떻게 표현하는지 합의해야 한다. 요청이 있다는 것만으로 수행 완료라고 표시하지 않는다. 상태 변경과 근거 기록을 함께 보관하면 추적할 수 있다.

## 헷갈린 부분과 주의점

요청 ID를 결과 ID로 무조건 재사용하면 여러 결과·정정 이력을 구분하기 어렵다. 연결 관계와 고유 키를 별도로 정의한다.

## 복습 문제

결과 파일이 업로드되었다면 요청의 모든 작업이 끝났다고 확정할까?

**풀이:** 업무 완료 기준과 확인 응답을 대조해야 한다. 업로드 성공과 전체 완료는 범위가 다를 수 있다.

## 참고한 문서

[HL7 FHIR R4 공식 문서](https://hl7.org/fhir/R4/servicerequest.html)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [병원 업무 공부 08] 행정 문서 대기열과 처리 순서]({{ '/study/2024/hospital/08-desk-queue/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [병원 업무 공부 10] 바코드에서 읽은 문자열 형식 검증하기 →]({{ '/study/2024/hospital/10-barcode-parse/' | relative_url }})
