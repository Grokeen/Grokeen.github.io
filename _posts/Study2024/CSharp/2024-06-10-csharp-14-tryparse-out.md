---
layout: content
title: "[C# 공부 14] TryParse와 out으로 입력 변환 성공 확인하기"
date: 2024-06-10 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 14
study_unit: 2
permalink: /study/2024/csharp/14-tryparse-out/
---

잘못된 숫자 입력을 예외 없이 분기하는 패턴을 정리했다. 변환 성공과 값의 유효 범위는 따로 확인해야 했다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

int.TryParse는 변환 가능 여부를 bool로 반환하고 out 인자에 변환 결과를 쓴다. 실패할 수 있는 일반 입력을 처리하기에 편리하다. out 변수는 호출 뒤 사용할 수 있지만 실패 때의 기본값을 정상 입력으로 오해하지 않는다. 양수·상한 같은 업무 규칙은 변환 성공 후 추가로 검사한다.

## 따라 해 보기

{% raw %}
```csharp
foreach (string text in new[] { "12", "잘못됨", "-1" })
{
    if (int.TryParse(text, out int count) && count >= 0)
        Console.WriteLine($"허용 {count}");
    else
        Console.WriteLine("입력 확인 필요");
}
```
{% endraw %}

## 실행 결과

```text
허용 12
입력 확인 필요
입력 확인 필요
```

## 코드를 따라 읽기

글자는 정수로 바뀌지 않고 -1은 변환은 되지만 범위 검사에서 거절된다. 두 종류의 실패를 한 문구로 보여 주었지만 실제 화면에서는 수정할 수 있게 원인을 나누어 안내할 수 있다. &&가 변환 실패 시 뒤의 범위 검사를 건너뛴다.

## 헷갈린 부분과 주의점

TryParse가 true라고 모든 업무 규칙을 만족하는 것은 아니다. 부호·공백·문화권 허용 방식도 필요한 계약과 맞추어 확인한다.

## 복습 문제

`TryParse("0", out int value)`는 성공할까?

**풀이:** 성공한다. 0을 허용할지는 그 다음 업무 검증에서 정한다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/api/system.int32.tryparse?view=net-8.0)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 13] 메서드·지역 함수와 반환값]({{ '/study/2024/csharp/13-methods/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 15] nullable 값 형식으로 미입력과 0 구별하기 →]({{ '/study/2024/csharp/15-nullable-values/' | relative_url }})
