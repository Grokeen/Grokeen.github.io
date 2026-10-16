---
layout: content
title: "[C# 공부 40] Path와 File로 임시 텍스트 읽고 쓰기"
date: 2024-08-29 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 40
study_unit: 5
permalink: /study/2024/csharp/40-files-paths/
---

파일 경로와 내용 읽기를 나누어 공부했다. 예제는 임시 파일 한 개만 만들고 정리한다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

File.WriteAllText와 ReadAllText는 텍스트 파일을 쓰고 읽는 API다. 인코딩을 명시하면 환경 차이를 줄일 수 있다. Path.GetTempFileName은 임시 파일을 생성한다. 실제 업무 파일에서는 덮어쓰기·동시 접근·보존 기간도 별도로 설계해야 한다.

## 따라 해 보기

{% raw %}
```csharp
using System.Text;

string path = Path.GetTempFileName();
try
{
    File.WriteAllText(path, "가상 기록", Encoding.UTF8);
    Console.WriteLine(File.ReadAllText(path, Encoding.UTF8));
    Console.WriteLine(Path.GetExtension(path));
}
finally
{
    File.Delete(path);
}
```
{% endraw %}

## 실행 결과

```text
가상 기록
.tmp
```

## 코드를 따라 읽기

임시 파일 내용만 읽고 finally에서 같은 파일을 삭제한다. 기존 업무 파일 경로를 사용하지 않는다. GetExtension은 마지막 확장자를 읽는 동작이며 파일 형식의 진위를 검사하는 기능은 아니다. 경로와 파일 내용·권한 문제를 나누어 확인한다.

## 헷갈린 부분과 주의점

WriteAllText는 기존 파일을 덮어쓴다. 외부 파일명을 검증 없이 경로에 결합하면 의도한 폴더를 벗어날 수 있다.

## 복습 문제

확장자가 .csv면 내용도 CSV라고 확정할 수 있을까?

**풀이:** 확장자는 이름의 일부이며 실제 내용과 형식 검증이 필요하다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/standard/io/how-to-write-text-to-a-file)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 39] System.Text.Json으로 객체와 JSON 변환하기]({{ '/study/2024/csharp/39-json/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 41] Task와 await로 비동기 흐름 읽기 →]({{ '/study/2024/csharp/41-async-await/' | relative_url }})
