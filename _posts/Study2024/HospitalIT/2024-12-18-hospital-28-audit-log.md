---
layout: content
title: "[병원 업무 공부 28] 감사 기록의 대상·행위·결과와 최소 정보"
date: 2024-12-18 09:00:00 +0900
categories: [HospitalIT]
tags: [2024학습노트, 병원업무자동화]
series: study-2024-csharp-hospital
study_track: hospital
study_order: 76
study_unit: 10
permalink: /study/2024/hospital/28-audit-log/
---

문제 추적에 필요한 기록과 민감한 원문을 구분했다. 로그 자체도 접근을 통제해야 하는 자료였다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다. 병원 업무는 가상 자료를 이용한 전산 학습 모델이다.

## 오늘 정리한 개념

감사 기록은 누가·언제·무엇에·어떤 행위를 했고 결과가 어땠는지를 추적하는 데 사용한다. 아래는 가상 사용자·문서·행위·결과만 출력한다. 실제 개인정보 보존 기간이나 법적 요건을 이 예제로 확정하지 않는다. 임상 내용·비밀번호·토큰은 일반 로그에 그대로 쓰지 않는 설계를 검토한다.

## 따라 해 보기

{% raw %}
```csharp
var entry = new AuditEntry("TEST-U01", "TEST-D01", "Read", "Allowed");
Console.WriteLine($"{entry.Actor}/{entry.Target}/{entry.Action}/{entry.Result}");

// 예제용 형식
public record AuditEntry(string Actor, string Target, string Action, string Result);
```
{% endraw %}

## 실행 결과

```text
TEST-U01/TEST-D01/Read/Allowed
```

## 코드를 따라 읽기

이 예제는 형식 학습용이며 실제 사용자 정보를 담지 않는다. 운영에서는 신뢰할 수 있는 시각·요청 추적값·변조 방지·접근권한이 추가로 필요하다. 로그에 식별자를 남기는 경우에도 연결 가능성이 있으므로 단순 가림이나 해시만으로 익명화되었다고 단정하지 않는다.

## 헷갈린 부분과 주의점

기록이 없으면 안 되는 행위와 과도한 상세 기록을 구분한다. 로그 오류가 본 업무 성공을 어떻게 알릴지도 정책으로 정한다.

## 복습 문제

환자 이름을 해시하면 항상 개인정보가 아니게 될까?

**풀이:** 그렇지 않다. 재식별·연결 가능성과 처리 맥락을 별도로 평가해야 한다.

## 참고한 문서

[OWASP 공식 가이드](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [병원 업무 공부 27] 로그인과 자료 접근 권한 분리하기]({{ '/study/2024/hospital/27-authorization/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [병원 업무 공부 29] 내보내기에 필요한 열만 명시적으로 선택하기 →]({{ '/study/2024/hospital/29-export-schema/' | relative_url }})
