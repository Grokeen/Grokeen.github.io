---
layout: content
title: "[병원 업무 공부 31] 연동 자료의 중복·이전 버전 처리"
date: 2024-12-27 09:00:00 +0900
categories: [HospitalIT]
tags: [2024학습노트, 병원업무자동화]
series: study-2024-csharp-hospital
study_track: hospital
study_order: 79
study_unit: 10
permalink: /study/2024/hospital/31-integration-version/
---

늦게 도착한 이전 자료가 최신 상태를 되돌리지 않도록 버전을 확인했다. 메시지 순서를 항상 신뢰할 수는 없었다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다. 병원 업무는 가상 자료를 이용한 전산 학습 모델이다.

## 오늘 정리한 개념

아래 모델은 대상별 마지막 버전보다 큰 버전만 반영한다. 실제로는 중복 ID의 내용 충돌·버전 누락·순서 역전·부분 실패를 별도 처리해야 한다. 모든 이벤트를 단순 최신값으로 덮어도 되는 것은 아니며 이 예제는 최신 상태 스냅샷을 받는 계약을 가정한다.

## 따라 해 보기

{% raw %}
```csharp
var versions = new Dictionary<string, int>(StringComparer.Ordinal);
bool Apply(string id, int version)
{
    if (version <= 0) return false;
    if (versions.TryGetValue(id, out int current) && version <= current) return false;
    versions[id] = version;
    return true;
}
Console.WriteLine(Apply("TEST-D01", 2));
Console.WriteLine(Apply("TEST-D01", 1));
Console.WriteLine(Apply("TEST-D01", 2));
Console.WriteLine(versions["TEST-D01"]);
```
{% endraw %}

## 실행 결과

```text
True
False
False
2
```

## 코드를 따라 읽기

2를 반영한 뒤 1과 같은 2는 거절한다. 실제 재전송에 같은 버전·다른 내용이 오면 확인 대상으로 처리할 수 있다. 자료 저장과 버전 갱신이 한 번의 일관된 변경이어야 하며 메모리 딕셔너리만으로 장애 복구를 보장하지 않는다.

## 헷갈린 부분과 주의점

증분 거래 이벤트를 이 규칙으로 버리면 필요한 변화가 사라질 수 있다. 스냅샷과 이벤트 계약을 먼저 구분한다.

## 복습 문제

버전 3이 먼저 왔다고 버전 2의 거래 이벤트를 항상 버려도 될까?

**풀이:** 계약에 따라 다르다. 각 이벤트를 모두 반영해야 하는 모델에는 별도 순서·중복 처리가 필요하다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/azure/architecture/patterns/competing-consumers)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [병원 업무 공부 30] 백업 복사와 복구 확인, 해시의 역할]({{ '/study/2024/hospital/30-backup-restore/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [병원 업무 공부 32] 종합 실습: 가상 문서 접수에서 처리 이력까지 →]({{ '/study/2024/hospital/32-hospital-project/' | relative_url }})
