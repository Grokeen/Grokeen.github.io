---
layout: content
title: "[C# 공부 24] interface로 저장 역할을 교체 가능하게 만들기"
date: 2024-07-11 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 24
study_unit: 3
permalink: /study/2024/csharp/24-interfaces/
---

실제 데이터베이스 없이도 저장 흐름을 확인할 수 있게 인터페이스를 두었다. 어떤 일을 하는지와 구현 방법을 나누었다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

interface는 구현이 제공할 멤버 계약을 정의한다. 호출자는 인터페이스를 사용하고 실제 구현은 외부에서 전달할 수 있다. 이 예제는 메모리에 ID를 보관하는 구현이다. 실제 저장소에서는 실패·중복·트랜잭션 계약을 추가해야 하며 메모리 성공을 DB 성공으로 확대 해석하지 않는다.

## 따라 해 보기

{% raw %}
```csharp
var memory = new MemoryStore();
IVisitStore store = memory;
store.Save("TEST-V01");
Console.WriteLine(memory.Count);

// 예제용 형식
public interface IVisitStore
{
    void Save(string id);
}
public class MemoryStore : IVisitStore
{
    private readonly List<string> _ids = new();
    public int Count => _ids.Count;
    public void Save(string id) => _ids.Add(id);
}
```
{% endraw %}

## 실행 결과

```text
1
```

## 코드를 따라 읽기

Save를 호출하는 쪽은 저장 방식에 의존하지 않는다. MemoryStore는 목록에 추가해 동작을 보여 준다. 이름만 인터페이스로 감싼다고 설계가 자동으로 좋아지는 것은 아니며 실제로 교체할 경계와 필요한 계약을 정의하는 것이 중요했다.

## 헷갈린 부분과 주의점

인터페이스가 같은 구현끼리도 실패 처리나 순서 보장이 다르면 호출자를 깨뜨릴 수 있다. 메서드 형태뿐 아니라 의미를 문서화한다.

## 복습 문제

MemoryStore를 다른 구현으로 바꾸어도 호출 코드를 유지하려면?

**풀이:** 동일한 IVisitStore 계약을 만족하는 객체를 전달하고 성공·실패 의미까지 일치시켜야 한다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/interfaces)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 23] 상속과 override로 동작 확장하기]({{ '/study/2024/csharp/23-inheritance/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 25] 제네릭으로 같은 구조의 자료형 안전하게 재사용하기 →]({{ '/study/2024/csharp/25-generics/' | relative_url }})
