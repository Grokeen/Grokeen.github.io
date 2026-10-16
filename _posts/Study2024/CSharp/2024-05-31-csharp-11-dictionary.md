---
layout: content
title: "[C# 공부 11] Dictionary와 TryGetValue로 코드 조회하기"
date: 2024-05-31 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 11
study_unit: 2
permalink: /study/2024/csharp/11-dictionary/
---

부서 코드로 표시 이름을 찾는 예제를 만들었다. 없는 코드가 정상적으로 들어올 수 있다면 조회 실패 경로도 준비했다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

Dictionary<TKey,TValue>는 키로 값을 찾는 자료구조다. 같은 키를 인덱서로 대입하면 값을 갱신하며 Add로 중복 키를 넣으면 예외가 난다. TryGetValue는 성공 여부와 조회값을 함께 제공한다. 문자열 키의 대소문자 정책은 생성 시 비교자를 정해 명시할 수 있다.

## 따라 해 보기

{% raw %}
```csharp
var names = new Dictionary<string, string>(StringComparer.Ordinal)
{
    ["ADM"] = "원무",
    ["LAB"] = "검사"
};
if (names.TryGetValue("LAB", out string? name))
    Console.WriteLine(name);
Console.WriteLine(names.TryGetValue("ETC", out _));
Console.WriteLine(names.Count);
```
{% endraw %}

## 실행 결과

```text
검사
False
2
```

## 코드를 따라 읽기

LAB는 등록된 키라 name에 검사라는 값이 들어온다. ETC는 없으므로 false다. _는 조회값을 쓰지 않겠다는 뜻이다. 코드 대조는 문화권 영향을 피하는 Ordinal 비교를 골랐다. 실제 코드 표준과 별칭 매핑은 기관의 데이터 사전을 따라야 한다.

## 헷갈린 부분과 주의점

없는 키를 인덱서로 읽으면 KeyNotFoundException이다. 키가 같다는 조건과 값이 같다는 조건도 분리한다.

## 복습 문제

Ordinal 비교에서 adm과 ADM은 같은 키일까?

**풀이:** 아니다. 대소문자를 구분한다. 필요하면 OrdinalIgnoreCase 같은 정책을 명시한다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.dictionary-2?view=net-8.0)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 10] List로 가변 개수의 항목 관리하기]({{ '/study/2024/csharp/10-list/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 12] HashSet으로 중복 작업 식별하기 →]({{ '/study/2024/csharp/12-hashset/' | relative_url }})
