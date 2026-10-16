---
layout: content
title: "[병원 업무 공부 29] 내보내기에 필요한 열만 명시적으로 선택하기"
date: 2024-12-21 09:00:00 +0900
categories: [HospitalIT]
tags: [2024학습노트, 병원업무자동화]
series: study-2024-csharp-hospital
study_track: hospital
study_order: 77
study_unit: 10
permalink: /study/2024/hospital/29-export-schema/
---

화면에서 보이는 객체를 통째로 내보내지 않기로 했다. 목적에 필요한 필드만 선택하는 모델을 만들었다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다. 병원 업무는 가상 자료를 이용한 전산 학습 모델이다.

## 오늘 정리한 개념

내보내기는 별도 권한·목적·대상 범위를 가진 처리다. 아래 가상 객체에는 내부 메모가 있지만 내보낼 때 ID와 상태만 고른다. 실제 식별자를 뺀 것만으로 익명 자료가 되지는 않는다. 목적별 최소 필드와 행 범위·다운로드 기록·보관 정책을 함께 정해야 한다.

## 따라 해 보기

{% raw %}
```csharp
using System.Text.Json;

var item = new Document("TEST-D01", "Ready", "가상 내부 메모");
var export = new { item.Id, item.Status };
Console.WriteLine(JsonSerializer.Serialize(export));

// 예제용 형식
public record Document(string Id, string Status, string InternalNote);
```
{% endraw %}

## 실행 결과

```text
{"Id":"TEST-D01","Status":"Ready"}
```

## 코드를 따라 읽기

익명 객체로 허용한 두 속성만 선택했다. 원래 객체에 필드가 추가되어도 그대로 전부 공개하지 않는 계약을 만들 수 있다. 다만 ID와 상태도 목적·권한에 따라 민감할 수 있다. 직렬화 옵션이나 화면 가림만으로 인가와 자료 최소화를 대체하지 않는다.

## 헷갈린 부분과 주의점

내보낼 행을 조회할 때도 권한 조건이 필요하다. 화면에 없던 내부 속성이 기본 직렬화로 노출되지 않는지 검사한다.

## 복습 문제

내부 모델에 새 비밀 필드가 추가되면 통째 직렬화는 어떤 위험이 있을까?

**풀이:** 기존 내보내기에 의도치 않은 필드가 포함될 수 있어 명시적 DTO와 검증이 필요하다.

## 참고한 문서

[HL7 FHIR R4 공식 문서](https://hl7.org/fhir/R4/security.html)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [병원 업무 공부 28] 감사 기록의 대상·행위·결과와 최소 정보]({{ '/study/2024/hospital/28-audit-log/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [병원 업무 공부 30] 백업 복사와 복구 확인, 해시의 역할 →]({{ '/study/2024/hospital/30-backup-restore/' | relative_url }})
