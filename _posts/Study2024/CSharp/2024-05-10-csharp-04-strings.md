---
layout: content
title: "[C# 공부 04] 문자열 보간과 형식 지정"
date: 2024-05-10 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 4
study_unit: 1
permalink: /study/2024/csharp/04-strings/
---

접수 번호와 부서명을 한 문장에 표시했다. 문자열 연결보다 보간을 쓰면 표시할 값의 위치를 읽기 쉬웠다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

문자열 앞에 $를 붙이면 중괄호 안의 식을 평가해 넣는다. 콜론 뒤에는 숫자·날짜 표시 형식을 지정할 수 있다. D3는 정수를 세 자리로 맞추며 남는 앞자리를 0으로 채운다. 문자열은 불변이므로 Trim 등의 메서드가 돌려주는 새 문자열을 저장해야 한다.

## 따라 해 보기

{% raw %}
```csharp
string department = "  접수  ";
int sequence = 7;
string label = $"{department.Trim()}-{sequence:D3}";
Console.WriteLine(label);
Console.WriteLine(department.Length);
Console.WriteLine(label.Length);
```
{% endraw %}

## 실행 결과

```text
접수-007
6
6
```

## 코드를 따라 읽기

Trim은 양 끝 공백을 제거한다. 원래 department에는 공백 네 개와 한글 두 글자가 남아 길이가 6이다. label도 한글 두 글자·하이픈·숫자 세 개로 길이가 6이다. string.Length는 UTF-16 코드 단위 수이므로 모든 화면 글자의 개수와 같다고 일반화하지 않는다.

## 헷갈린 부분과 주의점

식에 넣은 값이 문자열이라고 안전한 SQL이나 HTML이 자동으로 되는 것은 아니다. 출력 형식과 외부 시스템의 이스케이프 처리는 별도로 구분한다.

## 복습 문제

번호 12를 D4로 표시하면?

**풀이:** 0012가 된다. 숫자 자체는 바뀌지 않고 출력 문자열 형식만 달라진다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/tokens/interpolated)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 03] 정수 나눗셈과 decimal 금액 계산]({{ '/study/2024/csharp/03-numeric-decimal/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 05] 대입·비교·증감 연산 구분하기 →]({{ '/study/2024/csharp/05-operators/' | relative_url }})
