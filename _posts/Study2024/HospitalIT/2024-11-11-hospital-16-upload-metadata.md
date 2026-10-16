---
layout: content
title: "[병원 업무 공부 16] 문서 업로드 이름·크기·내용 검증 나누기"
date: 2024-11-11 09:00:00 +0900
categories: [HospitalIT]
tags: [2024학습노트, 병원업무자동화]
series: study-2024-csharp-hospital
study_track: hospital
study_order: 64
study_unit: 8
permalink: /study/2024/hospital/16-upload-metadata/
---

업로드 파일 이름을 믿지 않고 입력 메타데이터를 따로 검사했다. 확장자는 한 가지 신호일 뿐이었다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다. 병원 업무는 가상 자료를 이용한 전산 학습 모델이다.

## 오늘 정리한 개념

업로드 검증은 허용 형식·크기·실제 내용·저장 경로·권한 등 여러 층으로 나뉜다. 아래는 가상 파일명과 길이의 1차 선별만 수행한다. 허용 확장자와 크기 상한은 학습용 규칙이며 악성 파일 탐지나 실제 문서 정합성 검사까지 구현하지 않는다.

## 따라 해 보기

{% raw %}
```csharp
bool AcceptMetadata(string name, long length)
{
    string extension = Path.GetExtension(name);
    return extension.Equals(".pdf", StringComparison.OrdinalIgnoreCase)
        && length > 0 && length <= 1024 * 1024;
}
Console.WriteLine(AcceptMetadata("TEST-DOC01.pdf", 500));
Console.WriteLine(AcceptMetadata("TEST-DOC02.exe", 500));
Console.WriteLine(AcceptMetadata("TEST-DOC03.pdf", 0));
```
{% endraw %}

## 실행 결과

```text
True
False
False
```

## 코드를 따라 읽기

PDF 확장자와 양의 크기·상한을 검사한다. 통과한 첫 값도 실제 파일 내용이 안전하거나 올바른 PDF임을 보장하지 않는다. 저장용 파일명은 서버가 생성하고 사용자 제공 이름은 별도 메타데이터로 보관할 수 있다. 실제 스트림 크기도 확인해야 한다.

## 헷갈린 부분과 주의점

클라이언트가 보낸 Content-Type과 길이를 그대로 신뢰하지 않는다. 경로 결합·권한·다운로드 노출 정책까지 맞춰야 한다.

## 복습 문제

document.pdf라는 이름이면 내용 검사를 생략해도 될까?

**풀이:** 이름은 자유롭게 바꿀 수 있어 실제 내용·형식·안전성 검증이 추가로 필요하다.

## 참고한 문서

[OWASP 공식 가이드](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [병원 업무 공부 15] DICOM의 Study·Series·Instance 계층]({{ '/study/2024/hospital/15-dicom-identifiers/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [병원 업무 공부 17] OCR 추출값과 사람이 확인한 값 구분하기 →]({{ '/study/2024/hospital/17-ocr-review/' | relative_url }})
