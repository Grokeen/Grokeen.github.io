---
layout: content
title: "[C# 공부 09] 배열의 고정 길이와 인덱스"
date: 2024-05-25 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 9
study_unit: 2
permalink: /study/2024/csharp/09-arrays/
---

같은 종류의 값을 묶는 배열을 만들었다. 배열을 다른 변수에 대입하면 복사본이 생기는 것은 아니었다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

배열은 생성할 때 길이가 정해지고 항목을 0부터 시작하는 인덱스로 읽는다. Length는 항목 수다. 배열은 참조형이라 다른 변수에 대입하면 같은 배열을 가리킬 수 있다. 독립된 바깥 배열이 필요하면 Clone이나 ToArray를 사용하되 항목이 참조형이면 얕은 복사라는 점을 고려한다.

## 따라 해 보기

{% raw %}
```csharp
int[] counts = { 1, 2, 3 };
int[] alias = counts;
int[] copy = (int[])counts.Clone();
alias[0] = 9;
Console.WriteLine(string.Join(",", counts));
Console.WriteLine(string.Join(",", copy));
Console.WriteLine(counts.Length);
```
{% endraw %}

## 실행 결과

```text
9,2,3
1,2,3
3
```

## 코드를 따라 읽기

alias의 첫 항목을 바꾸면 counts에도 9가 보인다. copy는 정수 항목을 별도 배열로 복제해 원래 1을 유지한다. 복사 깊이와 자료형의 변경 가능성을 함께 판단해야 한다. 크기가 계속 바뀌는 대기 목록에는 뒤에서 List나 Queue를 비교한다.

## 헷갈린 부분과 주의점

빈 배열에서 [0]을 읽으면 IndexOutOfRangeException이 난다. Length가 바뀌지 않는다는 것이 각 항목을 바꿀 수 없다는 뜻은 아니다.

## 복습 문제

new `int[3]`의 처음 값들은 무엇일까?

**풀이:** 각 항목이 int의 기본값 0으로 초기화된다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/arrays)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 08] for·foreach·while의 반복 기준]({{ '/study/2024/csharp/08-loops/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 10] List로 가변 개수의 항목 관리하기 →]({{ '/study/2024/csharp/10-list/' | relative_url }})
