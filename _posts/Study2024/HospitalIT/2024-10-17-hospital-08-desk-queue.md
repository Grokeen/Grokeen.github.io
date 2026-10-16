---
layout: content
title: "[병원 업무 공부 08] 행정 문서 대기열과 처리 순서"
date: 2024-10-17 09:00:00 +0900
categories: [HospitalIT]
tags: [2024학습노트, 병원업무자동화]
series: study-2024-csharp-hospital
study_track: hospital
study_order: 56
study_unit: 7
permalink: /study/2024/hospital/08-desk-queue/
---

진료 우선순위와 혼동하지 않도록 행정 문서의 단순 대기열로 Queue를 적용했다. 먼저 넣은 작업을 먼저 꺼내 보았다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다. 병원 업무는 가상 자료를 이용한 전산 학습 모델이다.

## 오늘 정리한 개념

Queue는 FIFO 자료구조다. Enqueue는 뒤에 추가하고 TryDequeue는 앞의 항목을 안전하게 꺼낸다. 이 예제는 가상 서류 작업의 입력 순서만 보존한다. 실제 진료 순서·응급도·업무 우선순위는 승인된 정책과 담당자 판단을 포함하므로 단순 FIFO 예제로 결정하지 않는다.

## 따라 해 보기

{% raw %}
```csharp
var queue = new Queue<string>();
queue.Enqueue("TEST-DOC01");
queue.Enqueue("TEST-DOC02");
while (queue.TryDequeue(out string? documentId))
{
    Console.WriteLine($"서류 처리 {documentId}");
}
Console.WriteLine(queue.Count);
```
{% endraw %}

## 실행 결과

```text
서류 처리 TEST-DOC01
서류 처리 TEST-DOC02
0
```

## 코드를 따라 읽기

TryDequeue는 항목이 없으면 false라 반복이 끝난다. 문서를 꺼낸 뒤 저장에 실패하면 재처리할 수 있도록 진행 상태를 따로 관리해야 한다. 메모리 큐는 장애 후 복구를 자동 제공하지 않는다. 작업 인수·완료·실패를 분리하면 누락을 추적하기 쉽다.

## 헷갈린 부분과 주의점

화면에서 보이지 않는다고 작업이 완료된 것은 아니다. 큐에서 꺼낸 사실과 업무 완료 확인을 구분한다.

## 복습 문제

다시 시작해도 작업을 보존하려면?

**풀이:** 지속성 있는 큐나 저장소, 확인 응답과 재처리 정책이 필요하다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.queue-1?view=net-8.0)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [병원 업무 공부 07] 예약과 실제 방문 기록 연결하기]({{ '/study/2024/hospital/07-encounter-link/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [병원 업무 공부 09] 요청과 수행 기록을 분리해 추적하기 →]({{ '/study/2024/hospital/09-order-receipt/' | relative_url }})
