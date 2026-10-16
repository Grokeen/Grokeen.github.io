---
layout: content
title: "[병원 업무 공부 02] 환자·방문·검체 식별자의 발급 범위"
date: 2024-09-29 09:00:00 +0900
categories: [HospitalIT]
tags: [2024학습노트, 병원업무자동화]
series: study-2024-csharp-hospital
study_track: hospital
study_order: 50
study_unit: 7
permalink: /study/2024/hospital/02-identifier-scope/
---

여러 시스템의 같은 번호 문자열이 같은 대상을 뜻하는지부터 확인했다. 숫자 내용만 같다고 병합해서는 안 됐다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다. 병원 업무는 가상 자료를 이용한 전산 학습 모델이다.

## 오늘 정리한 개념

식별자는 값뿐 아니라 발급 체계와 대상 종류가 중요하다. 환자 식별자·방문 식별자·검체 식별자는 서로 다른 객체를 가리킬 수 있다. FHIR Identifier의 system과 value 개념을 참고해 학습용 키를 구성한다. 실제 환자 확인 절차와 기관 간 동일인 매칭은 별도의 검증이 필요하다.

## 따라 해 보기

{% raw %}
```csharp
var first = new Identifier("urn:test:hospital-a", "TEST-001");
var second = new Identifier("urn:test:hospital-b", "TEST-001");
var copied = new Identifier("urn:test:hospital-a", "TEST-001");
Console.WriteLine(first == second);
Console.WriteLine(first == copied);

// 예제용 형식
public record Identifier(string System, string Value);
```
{% endraw %}

## 실행 결과

```text
False
True
```

## 코드를 따라 읽기

값은 같지만 발급 범위가 달라 첫 비교는 false다. 같은 범위와 값을 가진 record는 같다고 비교된다. urn:test로 만든 예시 범위는 실제 기관 코드가 아니다. 서로 다른 종류의 식별자는 같은 구조로 표현해도 업무상 혼용하지 않도록 자료형과 필드 이름을 구분한다.

## 헷갈린 부분과 주의점

환자 번호를 정수로 바꾸면 앞의 0이 사라질 수 있다. ID 비교만으로 실제 환자 확인이 완료되었다고 판단하지 않는다.

## 복습 문제

발급 기관이 다른 같은 번호를 자동 병합하면?

**풀이:** 다른 대상의 기록이 섞일 수 있으므로 식별 체계와 별도 매칭 근거를 확인해야 한다.

## 참고한 문서

[HL7 FHIR R4 공식 문서](https://hl7.org/fhir/R4/datatypes.html#Identifier)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [병원 업무 공부 01] 접수·예약·수행·수납을 서로 다른 업무로 나누기]({{ '/study/2024/hospital/01-workflow/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [병원 업무 공부 03] 등록 자료의 정확 일치와 확인 필요 상태 →]({{ '/study/2024/hospital/03-registration-match/' | relative_url }})
