---
layout: content
title: "[C# 공부 36] DateOnly와 TimeOnly로 날짜·시각 의미 나누기"
date: 2024-08-17 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 36
study_unit: 5
permalink: /study/2024/csharp/36-dateonly-timeonly/
---

예약 날짜와 하루 중 시간을 불필요한 기준 날짜 없이 표현했다. 병원 방문 시각을 표현할 때도 데이터의 의미부터 정해야 했다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

DateOnly는 날짜, TimeOnly는 하루 중 시간을 나타낸다. 둘을 조합했다고 자동으로 시간대 있는 순간이 정해지는 것은 아니다. 예약에서는 지역과 운영 시간 규칙을 추가해야 한다. 날짜 더하기나 비교는 문자열 순서에 의존하지 않고 해당 자료형으로 수행한다.

## 따라 해 보기

{% raw %}
```csharp
var day = new DateOnly(2024, 5, 1);
var time = new TimeOnly(9, 30);
Console.WriteLine(day.AddDays(1).ToString("yyyy-MM-dd"));
Console.WriteLine(time.AddMinutes(30).ToString("HH:mm"));
Console.WriteLine(time < new TimeOnly(10, 0));
```
{% endraw %}

## 실행 결과

```text
2024-05-02
10:00
True
```

## 코드를 따라 읽기

날짜는 하루를 더하고 시간은 30분을 더한다. 실제 예약은 날짜와 지역 시간을 함께 해석해야 한다. TimeOnly를 자정 너머로 더할 경우 날짜가 자동으로 함께 보존된다고 생각하지 않는다. 이 예제는 달력 날짜와 시간 구성을 설명하는 순수 계산이다.

## 헷갈린 부분과 주의점

TimeOnly에는 달력 날짜가 없다. 23:30에 1시간을 더한 결과만 저장하면 다음 날이라는 정보가 빠질 수 있다.

## 복습 문제

DateOnly만으로 UTC 순간을 알 수 있을까?

**풀이:** 없다. 하루 중 시간과 시간대 등 추가 정보가 필요하다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/standard/datetime/how-to-use-dateonly-timeonly)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 35] DateTimeOffset으로 시각과 오프셋 기록하기]({{ '/study/2024/csharp/35-datetimeoffset/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 37] 문화권을 명시한 숫자 변환과 표시 →]({{ '/study/2024/csharp/37-culture-parsing/' | relative_url }})
