---
layout: content
title: "[C# 공부 20] 속성 setter로 범위 검증하기"
date: 2024-06-28 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 20
study_unit: 3
permalink: /study/2024/csharp/20-properties/
---

필드에 직접 값을 쓰는 대신 검증을 통과한 값만 저장했다. 실패한 대입이 기존 상태를 바꾸지 않게 순서를 정했다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

속성의 get은 읽기, set은 대입을 처리하며 setter에서는 value가 새 입력을 뜻한다. 실제 보관용 필드를 별도로 두면 검증과 저장을 나눌 수 있다. 변경 규칙이 복잡하면 속성보다 명시적 메서드가 더 적합할 수도 있다. 예제 범위는 학습용 수량 제한이다.

## 따라 해 보기

{% raw %}
```csharp
var batch = new Batch();
batch.Count = 3;
try { batch.Count = -1; }
catch (ArgumentOutOfRangeException) { Console.WriteLine("범위 오류"); }
Console.WriteLine(batch.Count);

// 예제용 형식
public class Batch
{
    private int _count;
    public int Count
    {
        get => _count;
        set
        {
            if (value < 0) throw new ArgumentOutOfRangeException(nameof(value));
            _count = value;
        }
    }
}
```
{% endraw %}

## 실행 결과

```text
범위 오류
3
```

## 코드를 따라 읽기

음수는 필드에 쓰기 전에 거절하므로 기존 3이 남는다. getter가 자기 자신을 다시 읽지 않도록 _count를 사용했다. 입력 실패 때 상태가 유지되는 것도 중요한 검사 대상이다. 정수 여부는 자료형이 보장하지만 업무상 허용 범위는 코드로 정한다.

## 헷갈린 부분과 주의점

setter 안에서 Count = value를 다시 쓰면 재귀 호출이 된다. 읽기만 하는 속성 접근에 예상 못 한 외부 작업을 섞지 않는다.

## 복습 문제

get만 공개한 속성은 외부에서 직접 대입할 수 있을까?

**풀이:** 일반적으로 불가능하다. 생성자나 내부 변경 경로를 통해 상태를 설정한다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/properties)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 19] 클래스·생성자·인스턴스로 접수 항목 표현하기]({{ '/study/2024/csharp/19-classes/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 21] record와 with로 값 중심 데이터 다루기 →]({{ '/study/2024/csharp/21-records/' | relative_url }})
