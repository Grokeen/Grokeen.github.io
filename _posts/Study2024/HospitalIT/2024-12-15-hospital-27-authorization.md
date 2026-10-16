---
layout: content
title: "[병원 업무 공부 27] 로그인과 자료 접근 권한 분리하기"
date: 2024-12-15 09:00:00 +0900
categories: [HospitalIT]
tags: [2024학습노트, 병원업무자동화]
series: study-2024-csharp-hospital
study_track: hospital
study_order: 75
study_unit: 10
permalink: /study/2024/hospital/27-authorization/
---

계정이 로그인했다는 사실만으로 모든 기록을 읽게 해서는 안 된다고 정리했다. 요청할 때마다 대상 범위를 함께 확인했다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다. 병원 업무는 가상 자료를 이용한 전산 학습 모델이다.

## 오늘 정리한 개념

인증은 누구인지, 인가는 그 요청을 허용할지 확인하는 단계다. 아래는 가상 역할과 부서가 모두 맞아야 행정 목록 읽기를 허용하는 단순 모델이다. 실제 권한은 담당 관계·행위·대상·목적·긴급 접근 정책 등을 포함할 수 있다. 서버가 요청마다 검사해야 한다.

## 따라 해 보기

{% raw %}
```csharp
bool CanRead(string role, string userDepartment, string recordDepartment)
{
    return role == "DeskReader" && userDepartment == recordDepartment;
}
Console.WriteLine(CanRead("DeskReader", "ADM", "ADM"));
Console.WriteLine(CanRead("DeskReader", "ADM", "LAB"));
Console.WriteLine(CanRead("Guest", "ADM", "ADM"));
```
{% endraw %}

## 실행 결과

```text
True
False
False
```

## 코드를 따라 읽기

역할만 맞거나 부서만 맞는 경우에는 거절한다. 이 규칙은 예제 정책이며 실제 병원 권한 설계와 동일하다는 뜻이 아니다. 화면 메뉴를 숨기는 것은 편의 처리이고 API·자료 저장소의 인가 검사를 대신하지 않는다. 필요 권한을 기본 거절에서 명시적으로 부여한다.

## 헷갈린 부분과 주의점

클라이언트가 보낸 역할·부서를 신뢰해 권한을 결정하지 않는다. 인증된 서버 문맥과 실제 권한 자료를 사용한다.

## 복습 문제

버튼을 숨기면 사용자가 API를 직접 호출해도 안전할까?

**풀이:** 서버의 대상별 인가 검사가 별도로 필요하다.

## 참고한 문서

[OWASP 공식 가이드](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [병원 업무 공부 26] 가상 소모품 재고의 유효기간별 정렬]({{ '/study/2024/hospital/26-inventory-expiry/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [병원 업무 공부 28] 감사 기록의 대상·행위·결과와 최소 정보 →]({{ '/study/2024/hospital/28-audit-log/' | relative_url }})
