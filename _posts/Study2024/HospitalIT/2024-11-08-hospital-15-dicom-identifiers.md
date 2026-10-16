---
layout: content
title: "[병원 업무 공부 15] DICOM의 Study·Series·Instance 계층"
date: 2024-11-08 09:00:00 +0900
categories: [HospitalIT]
tags: [2024학습노트, 병원업무자동화]
series: study-2024-csharp-hospital
study_track: hospital
study_order: 63
study_unit: 8
permalink: /study/2024/hospital/15-dicom-identifiers/
---

영상 파일 이름 하나로 검사 전체를 구분하지 않기로 했다. DICOM 식별 계층을 데이터 관계로 정리했다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다. 병원 업무는 가상 자료를 이용한 전산 학습 모델이다.

## 오늘 정리한 개념

DICOM은 Study·Series·SOP Instance 등을 UID로 식별한다. UID는 의미를 임의로 잘라 읽는 업무 코드가 아니라 고유 식별자다. 아래 숫자 문자열은 문법 관계를 설명하기 위한 가상 값으로 운영 UID 발급에 사용할 수 없다. 실제 영상 읽기나 저장·전송은 수행하지 않는다.

## 따라 해 보기

{% raw %}
```csharp
var images = new[]
{
    new ImageRef("1.2.3.4", "1.2.3.4.1", "1.2.3.4.1.1"),
    new ImageRef("1.2.3.4", "1.2.3.4.1", "1.2.3.4.1.2")
};
Console.WriteLine($"Study {images.Select(item => item.StudyUid).Distinct().Count()}");
Console.WriteLine($"Instance {images.Select(item => item.InstanceUid).Distinct().Count()}");

// 예제용 형식
public record ImageRef(string StudyUid, string SeriesUid, string InstanceUid);
```
{% endraw %}

## 실행 결과

```text
Study 1
Instance 2
```

## 코드를 따라 읽기

같은 Study와 Series에 두 인스턴스가 연결되는 관계를 나타냈다. 예제 UID가 계층처럼 보이더라도 UID 문자열의 접두사를 잘라 상위 ID를 추론하는 규칙으로 일반화하면 안 된다. 별도 속성·참조 관계를 읽어야 한다. 파일 개수와 검사 개수가 다를 수 있는 이유를 구분했다.

## 헷갈린 부분과 주의점

DICOM 메타데이터에는 개인 정보가 있을 수 있다. 파일명만 바꾸었다고 비식별 처리가 끝나는 것은 아니며 실제 자료를 이 예제에 넣지 않는다.

## 복습 문제

UID에서 마지막 숫자를 지우면 항상 Series UID를 얻을까?

**풀이:** 아니다. 문자열 구조로 관계를 추측하지 않고 표준 속성의 명시적 식별자를 사용한다.

## 참고한 문서

[DICOM 2024c 공식 문서](https://dicom.nema.org/medical/dicom/2024c/output/chtml/part05/chapter_9.html)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [병원 업무 공부 14] 결과 정정 버전과 원본 이력]({{ '/study/2024/hospital/14-result-correction/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [병원 업무 공부 16] 문서 업로드 이름·크기·내용 검증 나누기 →]({{ '/study/2024/hospital/16-upload-metadata/' | relative_url }})
