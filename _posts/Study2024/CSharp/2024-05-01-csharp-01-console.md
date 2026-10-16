---
layout: content
title: "[C# 공부 01] Console과 최상위 문으로 첫 프로그램 실행하기"
date: 2024-05-01 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 1
study_unit: 1
permalink: /study/2024/csharp/01-console/
---

파이썬의 print와 대응시키며 C# 콘솔 출력을 익혔다. 문장이 끝나는 세미콜론과 문자열 따옴표부터 확인했다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

C#의 최상위 문은 Main 메서드를 직접 선언하지 않고 실행 문장을 적는 방식이다. .NET 8 콘솔 프로젝트에서는 Console을 바로 사용할 수 있다. WriteLine은 마지막에 줄바꿈을 붙이고 Write는 같은 줄에 이어 쓴다. 이 시리즈는 새 콘솔 프로젝트의 Program.cs를 예제 전체로 교체하는 방식으로 학습한다.

## 따라 해 보기

{% raw %}
```csharp
Console.WriteLine("C# 학습 시작");
Console.Write("접수 ");
Console.WriteLine("완료");
Console.WriteLine(3 + 2);
```
{% endraw %}

## 실행 결과

```text
C# 학습 시작
접수 완료
5
```

## 코드를 따라 읽기

첫 문장은 문자열을 출력한다. 가운데 두 문장은 한 줄을 함께 만든다. 숫자 연산 결과도 WriteLine에 전달할 수 있다. 터미널에서 dotnet new console -n Study를 실행한 뒤 Program.cs를 바꾸고 해당 폴더에서 dotnet run으로 확인한다. 다른 글의 코드는 파일에 덧붙이지 않고 교체한다.

## 헷갈린 부분과 주의점

작은따옴표는 문자열이 아니라 문자 하나를 표현할 때 사용한다. WriteLine의 철자와 대소문자를 맞춘다.

## 복습 문제

WriteLine 대신 Write만 두 번 호출하면 줄이 자동으로 바뀔까?

**풀이:** 아니다. 줄바꿈을 직접 넣거나 WriteLine을 사용해야 한다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/top-level-statements)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 02] 명시적 자료형과 var 구분하기 →]({{ '/study/2024/csharp/02-types-var/' | relative_url }})
