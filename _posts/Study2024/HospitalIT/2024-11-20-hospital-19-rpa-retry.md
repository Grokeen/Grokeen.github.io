---
layout: content
title: "[병원 업무 공부 19] 일시 실패와 영구 오류를 나누는 재시도"
date: 2024-11-20 09:00:00 +0900
categories: [HospitalIT]
tags: [2024학습노트, 병원업무자동화]
series: study-2024-csharp-hospital
study_track: hospital
study_order: 67
study_unit: 9
permalink: /study/2024/hospital/19-rpa-retry/
---

실패하면 무조건 다시 누르는 대신 오류 종류와 최대 횟수를 정했다. 잘못된 대상 ID는 반복해도 정상으로 바뀌지 않는다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다. 병원 업무는 가상 자료를 이용한 전산 학습 모델이다.

## 오늘 정리한 개념

재시도는 일시 오류라고 판단한 경우에 한해 횟수·대기·최종 확인을 두고 적용한다. 아래 모의 작업은 첫 시도에만 TimeoutException을 발생시킨다. 실제 UI 자동화나 네트워크 호출을 하지 않는다. 이미 처리된 작업을 재시도할 수 있으므로 멱등 키와 응답 확인도 함께 필요하다.

## 따라 해 보기

{% raw %}
```csharp
int calls = 0;
void RunMock()
{
    calls++;
    if (calls == 1) throw new TimeoutException();
}
for (int attempt = 1; attempt <= 3; attempt++)
{
    try { RunMock(); Console.WriteLine($"성공 {attempt}"); break; }
    catch (TimeoutException) when (attempt < 3)
    {
        Console.WriteLine($"재시도 {attempt}");
    }
}
```
{% endraw %}

## 실행 결과

```text
재시도 1
성공 2
```

## 코드를 따라 읽기

첫 시간 초과는 제한 안에서 다시 시도하고 둘째 성공에서 반복을 끝낸다. 마지막 시도 실패는 catch 필터를 통과하지 않아 호출자에게 전파된다. 실제 대기에는 지수 백오프·분산 지연 등을 고려할 수 있지만 이 예제는 제어 흐름만 보여 준다.

## 헷갈린 부분과 주의점

시간 초과는 원격 작업이 실패했다는 확정 증거가 아닐 수 있다. 무조건 같은 변경을 다시 보내기 전에 처리 결과를 조회할 수 있어야 한다.

## 복습 문제

잘못된 계정 권한 오류도 같은 방식으로 계속 재시도할까?

**풀이:** 설정·권한 문제는 원인을 수정해야 하므로 일시 오류와 구분해 처리한다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/azure/architecture/patterns/retry)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [병원 업무 공부 18] RPA 재실행에서 중복 입력 막는 처리 키]({{ '/study/2024/hospital/18-rpa-idempotency/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [병원 업무 공부 20] DataTable로 열 자료형과 행 의미 정의하기 →]({{ '/study/2024/hospital/20-datatable-schema/' | relative_url }})
