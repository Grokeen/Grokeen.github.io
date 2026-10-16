---
layout: content
title: "[C# 공부 02] 명시적 자료형과 var 구분하기"
date: 2024-05-04 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 2
study_unit: 1
permalink: /study/2024/csharp/02-types-var/
---

변수를 만들 때 자료형을 정하는 C#의 방식을 파이썬과 비교했다. var를 동적 자료형으로 오해하지 않기로 했다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

int는 정수, string은 문자열, bool은 참·거짓을 나타낸다. var는 초기화 식에서 컴파일러가 자료형을 추론하게 한다. 추론이 끝난 뒤에도 변수의 정적 자료형은 유지된다. 서로 맞지 않는 자료형을 대입하면 보통 컴파일 단계에서 오류가 나므로 실행 전 피드백을 받을 수 있다.

## 따라 해 보기

{% raw %}
```csharp
int count = 3;
var department = "원무";
bool completed = false;
count += 2;
Console.WriteLine(count);
Console.WriteLine(department.GetType().Name);
Console.WriteLine(completed);
```
{% endraw %}

## 실행 결과

```text
5
String
False
```

## 코드를 따라 읽기

department는 var를 썼지만 초기 문자열을 보고 string으로 정해진다. 이후 숫자를 대입하는 것은 허용되지 않는다. bool의 기본 문자열 표시는 True 또는 False다. 이름에는 무엇을 저장하는지 드러내고, 외부 입력의 검증과 컴파일러 자료형 검사는 다른 역할임을 구분했다.

## 헷갈린 부분과 주의점

var value = null만으로는 자료형을 추론할 수 없다. var와 dynamic의 동작을 같다고 생각하지 않는다.

## 복습 문제

var count = 3 다음에 count = `"세 개"`를 대입할 수 있을까?

**풀이:** 없다. count는 int로 추론되었고 문자열 대입은 컴파일 오류가 된다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/declarations)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 01] Console과 최상위 문으로 첫 프로그램 실행하기]({{ '/study/2024/csharp/01-console/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 03] 정수 나눗셈과 decimal 금액 계산 →]({{ '/study/2024/csharp/03-numeric-decimal/' | relative_url }})
