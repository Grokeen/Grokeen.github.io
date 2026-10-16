---
layout: content
title: "[C# 공부 17] 이름 있는 튜플로 작은 결과 묶기"
date: 2024-06-19 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 17
study_unit: 3
permalink: /study/2024/csharp/17-tuples/
---

성공 여부와 건수를 하나의 결과로 반환했다. 이름을 붙이면 Item1보다 읽기 쉬웠다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

튜플은 여러 값을 임시로 묶는 값 형식이다. (bool Success, int Count)처럼 항목 이름을 적을 수 있고 구조 분해로 각각 받을 수도 있다. 공개 계약이 복잡해지면 의미 있는 record나 클래스로 발전시키는 편이 좋다. 튜플 이름은 일반적인 런타임 필드 이름과 완전히 같은 개념은 아니다.

## 따라 해 보기

{% raw %}
```csharp
(bool Success, int Count) Summarize(int[] values)
{
    return (values.Length > 0, values.Length);
}
var result = Summarize(new[] { 2, 3 });
Console.WriteLine($"{result.Success}/{result.Count}");
var (success, count) = Summarize(Array.Empty<int>());
Console.WriteLine($"{success}/{count}");
```
{% endraw %}

## 실행 결과

```text
True/2
False/0
```

## 코드를 따라 읽기

결과 이름으로 의미를 설명하고 두 번째 호출에서는 구조 분해를 사용했다. 빈 배열은 이 예제의 Success 정의에 따라 false다. 실제 작업 성공과 처리 건수 0이 같은 의미인지 먼저 정해야 한다. 튜플을 사용했다고 업무 정의가 자동으로 생기는 것은 아니다.

## 헷갈린 부분과 주의점

튜플 항목 순서를 바꾸면 같은 자료형끼리는 컴파일로 실수를 잡기 어려울 수 있다. 장기 유지할 계약은 명시적 자료형을 검토한다.

## 복습 문제

(int Count, int Failed)에서 두 값 순서를 바꾸면 오류를 반드시 발견할까?

**풀이:** 아니다. 둘 다 int라 컴파일될 수 있어 이름·계약·검사가 중요하다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/value-tuples)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 16] nullable 참조형과 ?.·??로 null 다루기]({{ '/study/2024/csharp/16-nullable-references/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 18] enum으로 유한한 상태 표현하기 →]({{ '/study/2024/csharp/18-enums/' | relative_url }})
