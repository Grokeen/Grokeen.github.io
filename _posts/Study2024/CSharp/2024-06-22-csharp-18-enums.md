---
layout: content
title: "[C# 공부 18] enum으로 유한한 상태 표현하기"
date: 2024-06-22 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 18
study_unit: 3
permalink: /study/2024/csharp/18-enums/
---

문자열 상태의 오타를 줄이기 위해 enum을 사용했다. 상태를 선언하는 것과 전이 규칙을 만드는 것은 다른 일이었다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

enum은 관련된 상수 이름을 하나의 자료형으로 묶는다. 기본 기반형은 int이며 명시한 값이 없으면 0부터 증가한다. 알 수 없는 외부 숫자를 캐스팅하면 정의하지 않은 값도 담길 수 있으므로 Enum.IsDefined 등으로 확인한다. 저장되는 코드는 변경 호환성을 생각해 안정적으로 정한다.

## 따라 해 보기

{% raw %}
```csharp
VisitState state = VisitState.Waiting;
Console.WriteLine(state);
Console.WriteLine((int)state);
Console.WriteLine(Enum.IsDefined(typeof(VisitState), 99));

// 예제용 형식
public enum VisitState
{
    Created = 0,
    Waiting = 1,
    Completed = 2
}
```
{% endraw %}

## 실행 결과

```text
Waiting
1
False
```

## 코드를 따라 읽기

Waiting은 명시적으로 1을 받는다. 99는 정의된 상태가 아니다. 이 상태는 학습용 모델이며 실제 병원이나 FHIR의 상태 코드 체계를 그대로 구현한 것이 아니다. 접수 취소나 완료를 언제 허용할지는 다음 업무 모델에서 별도로 검사해야 한다.

## 헷갈린 부분과 주의점

enum 항목 순서를 바꿔 자동 숫자가 달라지면 저장 데이터의 의미가 깨질 수 있다. 외부 계약의 값은 명시적으로 고정한다.

## 복습 문제

(VisitState)99가 항상 캐스팅 단계에서 실패할까?

**풀이:** 아니다. 정의되지 않은 값도 만들 수 있으므로 수신 입력 검증이 필요하다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/enum)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 17] 이름 있는 튜플로 작은 결과 묶기]({{ '/study/2024/csharp/17-tuples/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 19] 클래스·생성자·인스턴스로 접수 항목 표현하기 →]({{ '/study/2024/csharp/19-classes/' | relative_url }})
