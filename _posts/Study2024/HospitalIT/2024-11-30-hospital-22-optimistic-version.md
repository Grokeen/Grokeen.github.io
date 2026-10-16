---
layout: content
title: "[병원 업무 공부 22] 동시 수정에서 예상 버전 비교하기"
date: 2024-11-30 09:00:00 +0900
categories: [HospitalIT]
tags: [2024학습노트, 병원업무자동화]
series: study-2024-csharp-hospital
study_track: hospital
study_order: 70
study_unit: 9
permalink: /study/2024/hospital/22-optimistic-version/
---

두 화면이 같은 자료를 수정할 때 나중 저장이 먼저 변경한 내용을 덮지 않도록 버전을 비교했다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다. 병원 업무는 가상 자료를 이용한 전산 학습 모델이다.

## 오늘 정리한 개념

낙관적 동시성 제어는 읽을 때의 버전과 저장할 때의 현재 버전을 대조해 충돌을 발견한다. 아래 모델은 예상 버전이 맞을 때만 증가시킨다. 실제 DB에서는 비교와 갱신을 같은 원자적 명령으로 수행하고 영향받은 행 수를 확인해야 한다. 단순 메모리 비교는 설명용이다.

## 따라 해 보기

{% raw %}
```csharp
int currentVersion = 2;
bool Update(int expectedVersion)
{
    if (expectedVersion != currentVersion) return false;
    currentVersion++;
    return true;
}
Console.WriteLine(Update(2));
Console.WriteLine(Update(2));
Console.WriteLine(currentVersion);
```
{% endraw %}

## 실행 결과

```text
True
False
3
```

## 코드를 따라 읽기

첫 저장은 버전 2를 기준으로 성공해 3이 된다. 이전 화면이 같은 2를 보내면 충돌로 거절한다. 실제 화면은 최신 자료를 다시 읽고 사용자가 차이를 확인하도록 해야 한다. 버전을 몰래 최신값으로 바꾸어 재시도하면 충돌 방지 의미가 사라진다.

## 헷갈린 부분과 주의점

비교한 뒤 별도 UPDATE를 보내면 그 사이 다른 저장이 들어올 수 있다. 저장소가 비교 조건을 함께 적용해야 한다.

## 복습 문제

충돌을 무조건 마지막 값으로 덮으면?

**풀이:** 다른 사용자의 변경이 사라질 수 있다. 병합·재확인 정책을 정해야 한다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/framework/data/adonet/optimistic-concurrency)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [병원 업무 공부 21] 기본 키와 중복 자료 거절]({{ '/study/2024/hospital/21-datatable-key/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [병원 업무 공부 23] 수가 판단과 분리한 가상 수납 합계 →]({{ '/study/2024/hospital/23-billing-total/' | relative_url }})
