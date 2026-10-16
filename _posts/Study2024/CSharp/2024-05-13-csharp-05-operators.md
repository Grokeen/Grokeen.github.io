---
layout: content
title: "[C# 공부 05] 대입·비교·증감 연산 구분하기"
date: 2024-05-13 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 5
study_unit: 1
permalink: /study/2024/csharp/05-operators/
---

같은 기호처럼 보여도 대입과 비교가 다르게 쓰이는 부분을 정리했다. 전위·후위 증가도 작은 수로 추적했다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

=는 대입, ==와 !=는 같음과 다름을 비교한다. +=는 더한 결과를 다시 저장한다. ++가 뒤에 있으면 식에서는 기존 값을 쓰고 증가시키며 앞에 있으면 증가시킨 값을 쓴다. 읽기 어려운 식에 증감을 여러 번 섞기보다 별도 문장으로 나누면 검토하기 쉽다.

## 따라 해 보기

{% raw %}
```csharp
int count = 2;
Console.WriteLine(count == 2);
Console.WriteLine(count++);
Console.WriteLine(++count);
count += 3;
Console.WriteLine(count);
```
{% endraw %}

## 실행 결과

```text
True
2
4
7
```

## 코드를 따라 읽기

후위 count++는 2를 출력한 뒤 3이 된다. 다음 전위 ++count는 4로 늘린 값을 출력한다. 마지막 복합 대입 뒤 7이다. 계산 과정이 업무 상태 변경과 섞이면 실수하기 쉬워 부작용이 있는 연산을 한 줄에 많이 넣지 않기로 했다.

## 헷갈린 부분과 주의점

문자열의 ==와 사용자 정의 객체의 ==는 자료형에 따라 구현이 다를 수 있다. 참조 동일성과 업무상 같은 대상을 뜻하는지도 구분한다.

## 복습 문제

count가 0일 때 count += 1을 실행하면?

**풀이:** 기존 값에 1을 더한 1이 새 값으로 저장된다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/increment-operator)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 04] 문자열 보간과 형식 지정]({{ '/study/2024/csharp/04-strings/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 06] if와 단락 평가로 입력 상태 확인하기 →]({{ '/study/2024/csharp/06-if-logic/' | relative_url }})
