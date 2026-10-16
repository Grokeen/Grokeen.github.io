---
layout: content
title: "[C# 공부 21] record와 with로 값 중심 데이터 다루기"
date: 2024-07-01 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 21
study_unit: 3
permalink: /study/2024/csharp/21-records/
---

같은 내용인지 비교하고 일부 값을 바꾼 새 결과를 만드는 데이터 모델을 작성했다. 원본 보존을 명확히 했다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

record는 값 기반 동등 비교 등을 제공하는 데이터 중심 자료형이다. 위치 매개변수로 선언한 record class는 기본적으로 참조형이며 생성된 속성은 init 접근자를 가진다. with 식은 일부 값을 바꾼 복사본을 만든다. 내부에 변경 가능한 객체가 있으면 깊은 불변성이 자동 보장되지는 않는다.

## 따라 해 보기

{% raw %}
```csharp
var first = new Receipt("TEST-R01", 1000m);
var second = new Receipt("TEST-R01", 1000m);
var corrected = first with { Amount = 1200m };
Console.WriteLine(first == second);
Console.WriteLine(first.Amount);
Console.WriteLine(corrected.Amount);

// 예제용 형식
public record Receipt(string Id, decimal Amount);
```
{% endraw %}

## 실행 결과

```text
True
1000
1200
```

## 코드를 따라 읽기

별도 인스턴스여도 두 record의 필드 값이 같아 ==가 true다. with는 원본 금액을 바꾸지 않고 새 record를 만든다. 실제 정정 이력은 새 값 생성만으로 충분하지 않고 사유·버전·승인 같은 정보를 함께 보관해야 한다.

## 헷갈린 부분과 주의점

record에 List를 넣었다고 목록이 자동으로 읽기 전용이 되는 것은 아니다. with가 내부 목록까지 깊은 복사를 한다고 생각하지 않는다.

## 복습 문제

class와 record의 ==가 늘 같은 의미일까?

**풀이:** 아니다. record는 값 기반 비교를 제공하고 일반 class는 정의한 연산자나 기본 참조 비교에 따라 달라진다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/records)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 20] 속성 setter로 범위 검증하기]({{ '/study/2024/csharp/20-properties/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 22] struct 값 복사와 참조형 차이 →]({{ '/study/2024/csharp/22-struct-values/' | relative_url }})
