---
layout: content
title: "[병원 업무 공부 18] RPA 재실행에서 중복 입력 막는 처리 키"
date: 2024-11-17 09:00:00 +0900
categories: [HospitalIT]
tags: [2024학습노트, 병원업무자동화]
series: study-2024-csharp-hospital
study_track: hospital
study_order: 66
study_unit: 9
permalink: /study/2024/hospital/18-rpa-idempotency/
---

같은 파일을 다시 처리해도 기록이 늘어나지 않게 중복 키를 두었다. 완료 표시는 실제 처리 성공 뒤에 남겼다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다. 병원 업무는 가상 자료를 이용한 전산 학습 모델이다.

## 오늘 정리한 개념

RPA는 화면과 외부 시스템 상태에 영향을 받으므로 재실행을 고려해야 한다. 작업 ID·대상 버전·동작을 묶은 처리 키로 같은 의도를 구분할 수 있다. 아래는 단일 프로세스 메모리 모델이다. 실제로는 업무 저장과 완료 키를 원자적으로 처리하거나 보상·재확인 정책을 설계한다.

## 따라 해 보기

{% raw %}
```csharp
var completed = new HashSet<string>(StringComparer.Ordinal);
int writes = 0;
void Process(string key)
{
    if (completed.Contains(key)) { Console.WriteLine("이미 완료"); return; }
    writes++;
    completed.Add(key);
    Console.WriteLine("기록 완료");
}
Process("TEST-J01:v1:register");
Process("TEST-J01:v1:register");
Console.WriteLine(writes);
```
{% endraw %}

## 실행 결과

```text
기록 완료
이미 완료
1
```

## 코드를 따라 읽기

같은 키의 두 번째 실행은 쓰기를 반복하지 않는다. 실제 시스템에서는 쓰기 성공 후 완료 표시 전에 장애가 날 수도 있어 이 간단한 코드만으로 정확히 한 번 처리를 보장하지 않는다. 화면 버튼의 클릭 결과를 업무 확정과 분리해 확인한다.

## 헷갈린 부분과 주의점

Contains와 Add 사이에는 동시성 경합이 있다. 여러 작업자·서버에서는 저장소 고유 제약과 처리 상태 계약이 필요하다.

## 복습 문제

파일 이름만 처리 키로 쓰면 언제 문제가 될까?

**풀이:** 같은 이름의 다른 내용이나 정정 버전을 구별하지 못할 수 있다. 대상과 버전을 포함한 계약을 정한다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/architect-microservice-container-applications/asynchronous-message-based-communication)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [병원 업무 공부 17] OCR 추출값과 사람이 확인한 값 구분하기]({{ '/study/2024/hospital/17-ocr-review/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [병원 업무 공부 19] 일시 실패와 영구 오류를 나누는 재시도 →]({{ '/study/2024/hospital/19-rpa-retry/' | relative_url }})
