---
layout: content
title: "[병원 업무 공부 30] 백업 복사와 복구 확인, 해시의 역할"
date: 2024-12-24 09:00:00 +0900
categories: [HospitalIT]
tags: [2024학습노트, 병원업무자동화]
series: study-2024-csharp-hospital
study_track: hospital
study_order: 78
study_unit: 10
permalink: /study/2024/hospital/30-backup-restore/
---

백업 파일이 있다는 것과 실제로 복구할 수 있다는 것을 분리했다. 작은 메모리 데이터로 동일성 확인만 연습했다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다. 병원 업무는 가상 자료를 이용한 전산 학습 모델이다.

## 오늘 정리한 개념

백업 정책은 접근권한·암호화·보관·분리 저장·복구 절차를 포함한다. SHA-256 해시는 내용이 같은지 비교하는 도구로 쓸 수 있지만 암호화나 백업 성공의 전체 증거는 아니다. 아래는 가상 바이트 배열 복사본을 검증하며 실제 병원 자료나 파일을 복사하지 않는다.

## 따라 해 보기

{% raw %}
```csharp
using System.Security.Cryptography;
using System.Text;

byte[] original = Encoding.UTF8.GetBytes("TEST-BACKUP");
byte[] restored = original.ToArray();
byte[] left = SHA256.HashData(original);
byte[] right = SHA256.HashData(restored);
Console.WriteLine(left.SequenceEqual(right));
restored[0] = 0;
Console.WriteLine(left.SequenceEqual(SHA256.HashData(restored)));
```
{% endraw %}

## 실행 결과

```text
True
False
```

## 코드를 따라 읽기

내용을 그대로 복사했을 때 해시가 같고 한 바이트를 바꾸면 달라진다. 실제 복구 검증은 필요한 시점의 자료·키·권한·소프트웨어까지 복원되는지 시험해야 한다. 해시 파일도 바꿀 수 있는 공격자에 대한 무결성 보장은 별도 신뢰 근거가 필요하다.

## 헷갈린 부분과 주의점

해시는 원문을 비밀로 숨기는 암호화가 아니다. 백업 저장소의 개인정보 보호와 복구 접근통제는 따로 적용한다.

## 복습 문제

해시가 맞으면 DB가 실제로 기동되고 업무 조회도 된다는 뜻일까?

**풀이:** 파일 내용 비교와 업무 복구 가능성은 다르므로 실제 복원 검증이 필요하다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/api/system.security.cryptography.sha256.hashdata?view=net-8.0)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [병원 업무 공부 29] 내보내기에 필요한 열만 명시적으로 선택하기]({{ '/study/2024/hospital/29-export-schema/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [병원 업무 공부 31] 연동 자료의 중복·이전 버전 처리 →]({{ '/study/2024/hospital/31-integration-version/' | relative_url }})
