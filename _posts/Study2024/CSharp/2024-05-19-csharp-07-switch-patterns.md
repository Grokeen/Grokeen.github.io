---
layout: content
title: "[C# 공부 07] switch 식과 관계 패턴으로 분기하기"
date: 2024-05-19 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 7
study_unit: 1
permalink: /study/2024/csharp/07-switch-patterns/
---

여러 구간을 결과 문자열로 바꾸는 식을 만들었다. 실제 환자 분류가 아닌 가상 대기 건수 표시 예제다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

switch 식은 입력이 패턴에 맞는 첫 팔의 결과를 돌려준다. < 같은 관계 패턴과 and 조합으로 범위를 표현할 수 있다. _는 나머지 모든 경우를 받는 버림 패턴이다. 케이스 순서가 결과를 결정하므로 넓은 범위를 앞에 둬 뒤의 분기를 가리지 않게 한다.

## 따라 해 보기

{% raw %}
```csharp
int waiting = 8;
string label = waiting switch
{
    < 0 => "잘못된 입력",
    0 => "대기 없음",
    > 0 and <= 10 => "대기 있음",
    _ => "대기 많음"
};
Console.WriteLine(label);
```
{% endraw %}

## 실행 결과

```text
대기 있음
```

## 코드를 따라 읽기

8은 양수이면서 10 이하인 패턴에 해당한다. 각 결과 식 뒤에는 쉼표를 넣고 switch 식 전체를 세미콜론으로 끝낸다. 실제 업무의 상태 코드는 표시 문구와 분리해 관리하는 것이 좋다. 예제 구간은 설명용으로 정한 값이다.

## 헷갈린 부분과 주의점

_를 생략하면 다루지 않은 입력이 런타임 오류로 이어질 수 있다. 기본 경로를 무조건 성공으로 처리하지 말고 입력 계약에 맞춘다.

## 복습 문제

waiting이 0이면 어떤 결과일까?

**풀이:** 대기 없음이다. 0을 별도 케이스로 구분했다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/switch-expression)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 06] if와 단락 평가로 입력 상태 확인하기]({{ '/study/2024/csharp/06-if-logic/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 08] for·foreach·while의 반복 기준 →]({{ '/study/2024/csharp/08-loops/' | relative_url }})
