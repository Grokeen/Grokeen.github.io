---
layout: content
title: "[병원 업무 공부 17] OCR 추출값과 사람이 확인한 값 구분하기"
date: 2024-11-14 09:00:00 +0900
categories: [HospitalIT]
tags: [2024학습노트, 병원업무자동화]
series: study-2024-csharp-hospital
study_track: hospital
study_order: 65
study_unit: 9
permalink: /study/2024/hospital/17-ocr-review/
---

이미지에서 읽힌 문자를 확정 데이터처럼 바로 저장하지 않기로 했다. 추출·검증·검토 상태를 별도로 두었다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다. 병원 업무는 가상 자료를 이용한 전산 학습 모델이다.

## 오늘 정리한 개념

OCR은 이미지를 문자로 추정하는 단계다. 형식에 맞아도 원문과 다른 코드일 수 있다. 아래 예제는 필수 문서 ID 누락을 발견하면 Review로 보내는 단순 모델이다. 실제 OCR 엔진이나 의료 영상 분석을 호출하지 않고 추출 결과로 가정한 가상 문자열만 사용한다.

## 따라 해 보기

{% raw %}
```csharp
string Route(string? extractedId, bool confirmedByReviewer)
{
    if (string.IsNullOrWhiteSpace(extractedId)) return "Review";
    return confirmedByReviewer ? "Confirmed" : "Review";
}
Console.WriteLine(Route(null, false));
Console.WriteLine(Route("TEST-D01", false));
Console.WriteLine(Route("TEST-D01", true));
```
{% endraw %}

## 실행 결과

```text
Review
Review
Confirmed
```

## 코드를 따라 읽기

ID가 있더라도 확인을 거치지 않았으면 검토 상태다. 실제 업무에서는 검토 기준·담당자 권한·원문 참조·정정 근거를 남긴다. 단순 bool은 설명용이며 확인자의 신원을 증명하지 않는다. 자동 추출 정확도를 측정하지 않은 상태에서 성능 수치를 만들어 적지 않는다.

## 헷갈린 부분과 주의점

높은 신뢰도 점수만으로 필수 정보의 정확성을 보장하지 않는다. 원문 이미지는 개인 정보가 포함될 수 있어 접근·보관 정책도 필요하다.

## 복습 문제

정규식에 맞는 추출 ID면 원문과 동일하다고 확정할까?

**풀이:** 형식 검사와 원문 대조는 다르다. 검토 기준에 따른 확인이 필요하다.

## 참고한 문서

[HL7 FHIR R4 공식 문서](https://hl7.org/fhir/R4/documentreference.html)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [병원 업무 공부 16] 문서 업로드 이름·크기·내용 검증 나누기]({{ '/study/2024/hospital/16-upload-metadata/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [병원 업무 공부 18] RPA 재실행에서 중복 입력 막는 처리 키 →]({{ '/study/2024/hospital/18-rpa-idempotency/' | relative_url }})
