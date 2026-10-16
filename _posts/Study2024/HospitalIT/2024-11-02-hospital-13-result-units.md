---
layout: content
title: "[병원 업무 공부 13] 결과 데이터의 값·단위·상태 함께 다루기"
date: 2024-11-02 09:00:00 +0900
categories: [HospitalIT]
tags: [2024학습노트, 병원업무자동화]
series: study-2024-csharp-hospital
study_track: hospital
study_order: 61
study_unit: 8
permalink: /study/2024/hospital/13-result-units/
---

숫자만 저장하면 의미가 빠질 수 있어 단위를 함께 표현했다. 결과 해석이 아닌 전송 데이터 구조를 공부했다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다. 병원 업무는 가상 자료를 이용한 전산 학습 모델이다.

## 오늘 정리한 개념

Observation은 관찰 결과와 맥락을 표현하는 참고 자원이다. 수치 값에는 측정 항목·단위·방법·상태 등이 필요할 수 있다. 이 예제는 가상 길이 12.3mm의 표시만 수행하고 정상 범위나 진단을 판단하지 않는다. FHIR 전체 직렬화가 아닌 내부 데이터 모델이다.

## 따라 해 보기

{% raw %}
```csharp
var result = new Measurement("TEST-O01", 12.3m, "mm", "final");
Console.WriteLine($"{result.Id}: {result.Value} {result.Unit}");
Console.WriteLine(result.Status);

// 예제용 형식
public record Measurement(string Id, decimal Value, string Unit, string Status);
```
{% endraw %}

## 실행 결과

```text
TEST-O01: 12.3 mm
final
```

## 코드를 따라 읽기

값과 단위를 하나의 record로 다룬다. 문자열 mm을 붙였다고 모든 코드 체계와 단위 변환이 구현되는 것은 아니다. 실제 연동은 항목 코드·단위 체계·정밀도·누락 사유를 합의해야 한다. 표준 상태 코드를 사용할 때는 해당 자원의 정의와 버전을 확인한다.

## 헷갈린 부분과 주의점

단위가 다른 수치를 그대로 비교하거나 합산하지 않는다. final도 수정 이력이 절대 생기지 않는다는 뜻으로 해석하지 않는다.

## 복습 문제

cm 값과 mm 값을 숫자만 비교하면?

**풀이:** 같은 물리량인지 확인하고 단위 변환을 거쳐야 하며 숫자 대소만으로 판단하면 의미가 달라질 수 있다.

## 참고한 문서

[HL7 FHIR R4 공식 문서](https://hl7.org/fhir/R4/observation.html)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [병원 업무 공부 12] 라벨 재출력 번호와 대상 ID 구별하기]({{ '/study/2024/hospital/12-label-reprint/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [병원 업무 공부 14] 결과 정정 버전과 원본 이력 →]({{ '/study/2024/hospital/14-result-correction/' | relative_url }})
