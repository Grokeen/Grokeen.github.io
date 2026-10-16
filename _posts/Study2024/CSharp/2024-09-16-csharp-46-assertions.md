---
layout: content
title: "[C# 공부 46] 작은 단정 함수로 경계값과 오류 검사하기"
date: 2024-09-16 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 46
study_unit: 6
permalink: /study/2024/csharp/46-assertions/
---

눈으로 출력만 확인하던 함수를 자동 검사로 바꾸었다. 외부 패키지 없이 기본 원리부터 연습했다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

단정은 기대 조건이 틀리면 검사를 실패시키는 동작이다. 간단한 Check로 정상값·경계값·예외 경로를 확인한다. 실제 프로젝트에서는 xUnit·NUnit·MSTest 등으로 검사 발견·격리·보고를 관리할 수 있다. 도구 이름보다 어떤 계약을 확인하는지가 먼저다.

## 따라 해 보기

{% raw %}
```csharp
void Check(bool condition)
{
    if (!condition) throw new Exception("검사 실패");
}
int Validate(int count) => count >= 0 ? count : throw new ArgumentOutOfRangeException(nameof(count));
Check(Validate(0) == 0);
Check(Validate(3) == 3);
bool rejected = false;
try { Validate(-1); }
catch (ArgumentOutOfRangeException) { rejected = true; }
Check(rejected);
Console.WriteLine("세 조건 통과");
```
{% endraw %}

## 실행 결과

```text
세 조건 통과
```

## 코드를 따라 읽기

0과 양수는 유지하고 음수는 지정 예외로 거절하는 계약을 검사한다. 예외가 없으면 rejected가 false라 단정에서 실패한다. 통과 메시지만으로 모든 입력이 검증되었다고 생각하지 않는다. 중요한 입력 구간과 실패 후 상태를 더 검사할 수 있다.

## 헷갈린 부분과 주의점

실제 조건을 확인하지 않는 성공 메시지는 검사가 아니다. 기대한 실패 유형도 구체적으로 확인한다.

## 복습 문제

예외 검사를 `catch(Exception)`으로 넓히면?

**풀이:** 다른 버그 예외까지 기대한 거절로 오인해 통과할 수 있다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 45] HttpClient와 모의 핸들러로 응답 처리하기]({{ '/study/2024/csharp/45-httpclient/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 47] C# 12 컬렉션 식과 펼치기 →]({{ '/study/2024/csharp/47-collection-expressions/' | relative_url }})
