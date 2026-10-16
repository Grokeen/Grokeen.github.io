---
layout: content
title: "[C# 공부 23] 상속과 override로 동작 확장하기"
date: 2024-07-07 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 23
study_unit: 3
permalink: /study/2024/csharp/23-inheritance/
---

알림을 보내는 공통 역할에서 표시 방식을 바꾸었다. 재사용보다 대체 가능한 역할 관계인지 먼저 생각했다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

부모의 virtual 메서드는 자식에서 override로 바꿀 수 있다. 부모형 변수라도 실제 객체의 재정의된 구현이 실행되는 것이 다형성이다. base는 부모 구현을 호출할 때 사용할 수 있다. 서로 관계없는 기능을 억지로 상속으로 묶기보다 인터페이스나 조합도 검토한다.

## 따라 해 보기

{% raw %}
```csharp
Notification message = new DeskNotification();
Console.WriteLine(message.Format("접수 완료"));

// 예제용 형식
public class Notification
{
    public virtual string Format(string text) => text;
}
public class DeskNotification : Notification
{
    public override string Format(string text) => $"[창구] {text}";
}
```
{% endraw %}

## 실행 결과

```text
[창구] 접수 완료
```

## 코드를 따라 읽기

변수의 선언형은 Notification이지만 객체는 DeskNotification이다. Format 호출 시 자식의 구현이 선택된다. 공통 계약을 통해 호출자를 단순화할 수 있다. 실제 발송 여부와 문자열 형식화는 분리하면 외부 통신 없이도 기본 동작을 검사하기 좋다.

## 헷갈린 부분과 주의점

new 키워드로 메서드를 숨기는 것은 override와 같은 동적 디스패치가 아니다. 부모 계약의 의미를 바꾸어 호출자 기대를 깨지 않도록 한다.

## 복습 문제

부모 메서드가 virtual이 아니면 같은 방식으로 override할 수 있을까?

**풀이:** 없다. 재정의할 수 있는 메서드 계약이 필요하다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/object-oriented/inheritance)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 22] struct 값 복사와 참조형 차이]({{ '/study/2024/csharp/22-struct-values/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 24] interface로 저장 역할을 교체 가능하게 만들기 →]({{ '/study/2024/csharp/24-interfaces/' | relative_url }})
