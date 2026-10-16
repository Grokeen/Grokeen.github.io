---
layout: content
title: "[병원 업무 공부 12] 라벨 재출력 번호와 대상 ID 구별하기"
date: 2024-10-30 09:00:00 +0900
categories: [HospitalIT]
tags: [2024학습노트, 병원업무자동화]
series: study-2024-csharp-hospital
study_track: hospital
study_order: 60
study_unit: 8
permalink: /study/2024/hospital/12-label-reprint/
---

라벨을 다시 뽑아도 원래 대상은 유지되도록 모델을 나누었다. 출력 횟수는 별도 이력으로 기록했다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다. 병원 업무는 가상 자료를 이용한 전산 학습 모델이다.

## 오늘 정리한 개념

대상 식별자는 무엇을 가리키는지, 출력 번호는 몇 번째 발행인지 나타낸다. 재출력 때마다 대상 ID를 바꾸면 기존 처리 기록과 연결이 끊길 수 있다. 실제 라벨 규격·승인·폐기·대조 절차는 기관 정책이 필요하다. 아래는 데이터 연결만 보여 주는 가상 예제다.

## 따라 해 보기

{% raw %}
```csharp
var first = new Label("TEST-S01", 1);
var reprint = first with { PrintNumber = 2 };
Console.WriteLine($"{first.TargetId}/{first.PrintNumber}");
Console.WriteLine($"{reprint.TargetId}/{reprint.PrintNumber}");
Console.WriteLine(first.TargetId == reprint.TargetId);

// 예제용 형식
public record Label(string TargetId, int PrintNumber);
```
{% endraw %}

## 실행 결과

```text
TEST-S01/1
TEST-S01/2
True
```

## 코드를 따라 읽기

with로 만든 새 출력 데이터는 대상 ID를 유지하고 출력 번호만 달리한다. 실제 프린터 응답과 물리 출력 완료는 별도 확인이 필요하다. 코드에서 출력 요청을 만들었다는 사실을 라벨이 실제 부착되었다는 사실과 구별한다. 재출력 사유·수행자 기록도 추가할 수 있다.

## 헷갈린 부분과 주의점

프린터 재시도로 중복 출력될 수 있다. 스풀러 성공과 실제 업무 완료를 같은 신호로 보지 않는다.

## 복습 문제

출력 번호를 환자 ID처럼 써도 될까?

**풀이:** 안 된다. 식별 대상과 발행 사건이 달라 충돌과 잘못된 연결이 생길 수 있다.

## 참고한 문서

[HL7 FHIR R4 공식 문서](https://hl7.org/fhir/R4/datatypes.html#Identifier)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [병원 업무 공부 11] 검체 식별자와 수령 상태 이력]({{ '/study/2024/hospital/11-specimen-state/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [병원 업무 공부 13] 결과 데이터의 값·단위·상태 함께 다루기 →]({{ '/study/2024/hospital/13-result-units/' | relative_url }})
