---
layout: content
title: "[C# 공부 13] 메서드·지역 함수와 반환값"
date: 2024-06-07 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 13
study_unit: 2
permalink: /study/2024/csharp/13-methods/
---

계산을 반복해서 쓰기 위해 함수로 묶었다. 화면 출력과 결과 반환이 다른 역할이라는 점은 파이썬에서 배운 내용과 연결됐다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

C# 함수는 반환 자료형과 매개변수 자료형을 선언한다. 최상위 문 안의 함수는 지역 함수로 정의할 수 있다. return은 결과를 호출자에게 전달하고 현재 함수 실행을 끝낸다. 반환하지 않는 동작에는 void를 쓴다. 선택 인자의 기본값과 이름 있는 인자로 호출 의도를 드러낼 수 있다.

## 따라 해 보기

{% raw %}
```csharp
decimal Total(decimal price, int count = 1)
{
    if (count < 0)
        throw new ArgumentOutOfRangeException(nameof(count));
    return price * count;
}
Console.WriteLine(Total(1200m, count: 2));
Console.WriteLine(Total(500m));
```
{% endraw %}

## 실행 결과

```text
2400
500
```

## 코드를 따라 읽기

첫 호출은 이름 있는 count로 수량을 전달한다. 둘째는 기본 수량 1을 사용한다. 음수 수량은 계산 전에 예외로 거절한다. `nameof(count)`는 인자 이름을 문자열로 얻어 리팩터링에도 이름을 맞추기 좋다. 실제 금액 항목은 할인·취소 등 별도 정책이 필요하다.

## 헷갈린 부분과 주의점

Console.WriteLine만 하고 return하지 않으면 계산 결과를 재사용할 수 없다. 기본 인자 값은 허용되는 컴파일 시간 상수 등 제약을 따른다.

## 복습 문제

반환형이 void인 함수 결과를 decimal 변수에 저장할 수 있을까?

**풀이:** 없다. 결과를 저장하려면 해당 값을 반환하도록 함수 계약을 정해야 한다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/local-functions)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 12] HashSet으로 중복 작업 식별하기]({{ '/study/2024/csharp/12-hashset/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 14] TryParse와 out으로 입력 변환 성공 확인하기 →]({{ '/study/2024/csharp/14-tryparse-out/' | relative_url }})
