---
layout: content
title: "[C# 공부 15] nullable 값 형식으로 미입력과 0 구별하기"
date: 2024-06-13 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 15
study_unit: 2
permalink: /study/2024/csharp/15-nullable-values/
---

수량이 없는 상태를 임의로 0으로 바꾸지 않기로 했다. 값이 있는지 확인한 뒤 읽는 구조를 연습했다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

int?는 int 값 또는 null을 담는 Nullable<int>의 간단한 표기다. HasValue로 존재를 확인하고 Value로 읽을 수 있지만 null에서 Value를 읽으면 예외가 난다. ??는 null일 때 사용할 기본값을 지정한다. 데이터가 없다는 의미와 실제 측정된 0을 구별해야 한다.

## 따라 해 보기

{% raw %}
```csharp
int? quantity = null;
Console.WriteLine(quantity.HasValue);
Console.WriteLine(quantity ?? -1);
quantity = 0;
Console.WriteLine(quantity.HasValue);
Console.WriteLine(quantity.Value);
```
{% endraw %}

## 실행 결과

```text
False
-1
True
0
```

## 코드를 따라 읽기

처음에는 값이 없어 기본 표시 -1을 사용했다. 이 -1은 설명용 표시이며 실제 수량으로 저장하지 않는다. 0을 대입한 뒤에는 HasValue가 true다. 빈 입력에 대한 화면 표시와 저장 값의 의미를 나누면 결측과 정상 0을 혼동하지 않는다.

## 헷갈린 부분과 주의점

null에 Value로 접근하지 않는다. GetValueOrDefault를 쓰면 0이 반환될 수 있어 미입력 상태가 사라진다는 점을 고려한다.

## 복습 문제

int? x = null에서 x == 0은 true일까?

**풀이:** false다. null과 숫자 0은 같은 값이 아니다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/nullable-value-types)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 14] TryParse와 out으로 입력 변환 성공 확인하기]({{ '/study/2024/csharp/14-tryparse-out/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 16] nullable 참조형과 ?.·??로 null 다루기 →]({{ '/study/2024/csharp/16-nullable-references/' | relative_url }})
