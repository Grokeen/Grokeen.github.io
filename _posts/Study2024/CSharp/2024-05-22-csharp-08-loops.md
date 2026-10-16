---
layout: content
title: "[C# 공부 08] for·foreach·while의 반복 기준"
date: 2024-05-22 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 8
study_unit: 1
permalink: /study/2024/csharp/08-loops/
---

목록의 항목을 처리하는 반복과 횟수로 제어하는 반복을 비교했다. 종료 조건을 한 번 더 점검했다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

for는 초기화·조건·갱신을 한곳에 적고 foreach는 반복 가능한 항목을 하나씩 읽는다. while은 조건이 참인 동안 반복한다. break는 반복 종료, continue는 다음 반복으로 진행한다. 항목을 읽는 것만 필요하면 인덱스를 직접 계산하지 않는 foreach가 간단하다.

## 따라 해 보기

{% raw %}
```csharp
int[] counts = { 2, 3, 4 };
int total = 0;
foreach (int count in counts)
{
    total += count;
}
for (int i = 0; i < 2; i++)
{
    Console.WriteLine(i);
}
Console.WriteLine(total);
```
{% endraw %}

## 실행 결과

```text
0
1
9
```

## 코드를 따라 읽기

foreach는 배열의 세 항목을 더해 9를 만든다. for는 i가 2가 되기 전에 끝나므로 0과 1을 출력한다. 실제 수집기에서는 종료와 취소를 함께 설계해야 하며 무한 반복만으로 프로그램 수명을 관리하지 않는다. 예제는 유한 횟수로 끝난다.

## 헷갈린 부분과 주의점

배열의 마지막 인덱스는 Length - 1이다. foreach로 List를 읽는 동안 구조를 추가·삭제하면 예외가 날 수 있다.

## 복습 문제

조건을 i <= 2로 바꾸면 몇 번 반복할까?

**풀이:** 0·1·2의 세 번이다. 경계를 포함하는지 확인한다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/iteration-statements)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 07] switch 식과 관계 패턴으로 분기하기]({{ '/study/2024/csharp/07-switch-patterns/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 09] 배열의 고정 길이와 인덱스 →]({{ '/study/2024/csharp/09-arrays/' | relative_url }})
