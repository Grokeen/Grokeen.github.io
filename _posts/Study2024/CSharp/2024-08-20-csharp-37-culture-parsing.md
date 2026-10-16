---
layout: content
title: "[C# 공부 37] 문화권을 명시한 숫자 변환과 표시"
date: 2024-08-20 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 37
study_unit: 5
permalink: /study/2024/csharp/37-culture-parsing/
---

파일에서 온 소수 문자열을 읽을 때 실행 컴퓨터 설정에 기대지 않기로 했다. 입력 계약과 화면 표시는 각각 정할 수 있었다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

CultureInfo는 숫자·날짜 형식 해석 규칙을 나타낸다. 외부 계약이 점을 소수점으로 정했다면 InvariantCulture와 허용 NumberStyles를 지정해 변환한다. 모든 입력을 지역 기본값으로 읽으면 같은 문자열이 다르게 해석될 수 있다. 예제는 부호와 소수점만 허용한다.

## 따라 해 보기

{% raw %}
```csharp
using System.Globalization;

var style = NumberStyles.AllowLeadingSign | NumberStyles.AllowDecimalPoint;
bool valid = decimal.TryParse("12.50", style, CultureInfo.InvariantCulture, out decimal value);
Console.WriteLine(valid);
Console.WriteLine(value.ToString("F2", CultureInfo.InvariantCulture));
Console.WriteLine(decimal.TryParse("12,50", style, CultureInfo.InvariantCulture, out _));
```
{% endraw %}

## 실행 결과

```text
True
12.50
False
```

## 코드를 따라 읽기

12.50은 계약에 맞고 12,50은 허용한 스타일에 맞지 않아 거절된다. 천 단위 구분자를 허용할지까지 명시해야 한다. 화면에서는 사용자 문화권으로 보여 주더라도 저장·전송 형식은 계약에 맞출 수 있다. 표시 문자열을 다시 계산의 원본으로 쓰지 않는 편이 명확하다.

## 헷갈린 부분과 주의점

InvariantCulture가 모든 숫자 표기를 알아서 읽는 것은 아니다. 스타일을 넓히면 의도하지 않은 형식까지 받아들일 수 있다.

## 복습 문제

콤마가 소수점인 입력도 받아야 한다면?

**풀이:** 입력 계약의 문화권을 지정하거나 별도 형식을 명시적으로 처리한다. 무조건 문자를 삭제하지 않는다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/standard/base-types/parsing-numeric)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 36] DateOnly와 TimeOnly로 날짜·시각 의미 나누기]({{ '/study/2024/csharp/36-dateonly-timeonly/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 38] 정규식 전체 일치와 시간 제한 →]({{ '/study/2024/csharp/38-regex/' | relative_url }})
