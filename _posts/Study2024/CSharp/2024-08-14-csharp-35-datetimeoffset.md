---
layout: content
title: "[C# 공부 35] DateTimeOffset으로 시각과 오프셋 기록하기"
date: 2024-08-14 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 35
study_unit: 5
permalink: /study/2024/csharp/35-datetimeoffset/
---

여러 장비의 로그를 비교하기 위해 시간대 정보가 있는 시각을 사용했다. 화면 표시와 저장 기준을 나누었다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

DateTimeOffset은 날짜·시각과 UTC 오프셋을 함께 표현한다. ToUniversalTime으로 UTC 표현을 얻고 O 형식으로 왕복 가능한 문자열을 만들 수 있다. 오프셋만으로 지역의 모든 시간대 규칙을 표현하는 것은 아니다. 실제 지역 변환은 TimeZoneInfo 같은 정책이 필요하다.

## 따라 해 보기

{% raw %}
```csharp
var local = new DateTimeOffset(2024, 5, 1, 9, 0, 0, TimeSpan.FromHours(9));
Console.WriteLine(local.ToString("yyyy-MM-dd HH:mm zzz"));
Console.WriteLine(local.ToUniversalTime().ToString("yyyy-MM-dd HH:mm zzz"));
Console.WriteLine(local == local.ToUniversalTime());
```
{% endraw %}

## 실행 결과

```text
2024-05-01 09:00 +09:00
2024-05-01 00:00 +00:00
True
```

## 코드를 따라 읽기

한국 표준시 오프셋의 09시는 UTC로 같은 날 00시다. 표현은 달라도 같은 순간이므로 비교 결과는 true다. 예제는 고정 시각으로 재현한다. 실제 수집기는 시계 동기화와 서버·클라이언트 시각의 신뢰 범위를 함께 정해야 한다.

## 헷갈린 부분과 주의점

오프셋 없는 문자열을 무조건 UTC로 해석하지 않는다. DateTime의 Kind와 DateTimeOffset의 오프셋을 혼동하지 않는다.

## 복습 문제

+09:00의 12시는 UTC로 몇 시일까?

**풀이:** 같은 날짜 03시다. 오프셋 아홉 시간을 빼서 변환한다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/api/system.datetimeoffset?view=net-8.0)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 34] 지연 실행과 ToList의 스냅샷 차이]({{ '/study/2024/csharp/34-linq-deferred/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 36] DateOnly와 TimeOnly로 날짜·시각 의미 나누기 →]({{ '/study/2024/csharp/36-dateonly-timeonly/' | relative_url }})
