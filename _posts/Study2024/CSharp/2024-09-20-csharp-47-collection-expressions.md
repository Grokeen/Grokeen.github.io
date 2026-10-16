---
layout: content
title: "[C# 공부 47] C# 12 컬렉션 식과 펼치기"
date: 2024-09-20 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 47
study_unit: 6
permalink: /study/2024/csharp/47-collection-expressions/
---

2024년 기준으로 사용할 수 있던 컬렉션 문법을 정리했다. 대상 자료형이 있어야 식의 의미가 정해졌다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

C# 12의 컬렉션 식은 대괄호 안에 항목을 적고 ..로 다른 시퀀스를 펼친다. 배열·List 등 대상형에 맞춰 변환한다. var만으로 대상형 없는 컬렉션 식을 선언할 수는 없다. Python의 리스트와 비슷해 보여도 자료형과 변환 규칙은 C# 계약을 따른다.

## 따라 해 보기

{% raw %}
```csharp
int[] first = [1, 2];
int[] combined = [0, .. first, 3];
List<string> departments = ["ADM", "LAB"];
Console.WriteLine(string.Join(",", combined));
Console.WriteLine(departments.Count);
```
{% endraw %}

## 실행 결과

```text
0,1,2,3
2
```

## 코드를 따라 읽기

새 combined 배열에 0, first의 두 항목, 마지막 3을 담는다. departments는 명시한 List<string>로 만들어진다. 원본을 수정하지 않는다. 프로젝트의 언어 버전을 12로 고정하면 이후 기능이 의도치 않게 섞이는 것을 줄일 수 있다.

## 헷갈린 부분과 주의점

var values = [1, 2]는 대상형을 정하지 못한다. 펼치는 시퀀스의 크기와 열거 비용도 고려한다.

## 복습 문제

빈 시퀀스를 펼친 배열의 길이는?

**풀이:** 다른 항목이 없다면 0이다. 펼치기 자체가 항목을 추가 생성하지 않는다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/collection-expressions)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 46] 작은 단정 함수로 경계값과 오류 검사하기]({{ '/study/2024/csharp/46-assertions/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 48] 종합 실습: 가상 접수 자료를 검증해 대기열에 넣기 →]({{ '/study/2024/csharp/48-csharp-project/' | relative_url }})
