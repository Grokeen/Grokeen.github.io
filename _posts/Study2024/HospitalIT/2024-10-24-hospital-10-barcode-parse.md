---
layout: content
title: "[병원 업무 공부 10] 바코드에서 읽은 문자열 형식 검증하기"
date: 2024-10-24 09:00:00 +0900
categories: [HospitalIT]
tags: [2024학습노트, 병원업무자동화]
series: study-2024-csharp-hospital
study_track: hospital
study_order: 58
study_unit: 8
permalink: /study/2024/hospital/10-barcode-parse/
---

스캐너가 반환한 문자열을 업무 값으로 읽기 전에 구조를 확인했다. 문자 분리와 실제 대상 조회를 나누었다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다. 병원 업무는 가상 자료를 이용한 전산 학습 모델이다.

## 오늘 정리한 개념

바코드는 데이터를 표현하는 수단이며 내용의 의미는 약속한 형식이 정한다. 이 학습 모델은 TEST|방문코드|문서코드 세 부분을 기대한다. 실제 병원 식별 규격이나 GS1 전체 구문을 구현하지 않는다. 스캔 성공 뒤에도 대상 존재·상태·권한을 확인해야 한다.

## 따라 해 보기

{% raw %}
```csharp
bool TryRead(string raw, out string visit, out string document)
{
    string[] parts = raw.Split('|');
    visit = document = "";
    if (parts.Length != 3 || parts[0] != "TEST" || parts[1].Length == 0 || parts[2].Length == 0)
        return false;
    visit = parts[1]; document = parts[2];
    return true;
}
Console.WriteLine(TryRead("TEST|V01|D01", out string visit, out string document));
Console.WriteLine($"{visit}/{document}");
Console.WriteLine(TryRead("TEST|V01", out _, out _));
```
{% endraw %}

## 실행 결과

```text
True
V01/D01
False
```

## 코드를 따라 읽기

필드 수와 접두사·빈 필드를 검사한다. 두 번째 입력은 구분자가 부족해 실패한다. 실제 입력에 스캐너가 붙이는 줄 종료 문자가 있는지도 규격에 맞춰 처리해야 한다. 원본을 무조건 잘라 맞추기보다 실패 이유를 남기고 재확인하는 흐름을 만든다.

## 헷갈린 부분과 주의점

바코드 내용만으로 사람의 신원이나 환자 동일성이 보장되지 않는다. 잘못 붙인 라벨이나 이전 문서의 코드도 정상적으로 읽힐 수 있다.

## 복습 문제

구분자가 더 붙어 네 필드가 되면 허용할까?

**풀이:** 이 예제 계약에서는 거절한다. 확장 형식은 버전을 정해 별도로 처리한다.

## 참고한 문서

[HL7 FHIR R4 공식 문서](https://hl7.org/fhir/R4/datatypes.html#Identifier)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [병원 업무 공부 09] 요청과 수행 기록을 분리해 추적하기]({{ '/study/2024/hospital/09-order-receipt/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [병원 업무 공부 11] 검체 식별자와 수령 상태 이력 →]({{ '/study/2024/hospital/11-specimen-state/' | relative_url }})
