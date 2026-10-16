---
layout: content
title: "[C# 공부 45] HttpClient와 모의 핸들러로 응답 처리하기"
date: 2024-09-13 09:00:00 +0900
categories: [CSharp]
tags: [2024학습노트, CSharp]
series: study-2024-csharp-hospital
study_track: csharp
study_order: 45
study_unit: 6
permalink: /study/2024/csharp/45-httpclient/
---

HTTP 처리와 실제 외부 접속을 분리했다. 모의 핸들러를 넣으면 네트워크 없이 성공 경로를 재현할 수 있었다.

> C# 12·.NET 8 콘솔 프로젝트 기준. Program.cs를 아래 코드 전체로 교체하고 `dotnet run`으로 실행한다.

## 오늘 정리한 개념

HttpClient는 요청·응답을 다루며 메시지 핸들러를 교체할 수 있다. EnsureSuccessStatusCode는 성공 범위가 아닌 응답을 예외로 알린다. 실제 서비스에서는 클라이언트 수명·timeout·취소·재시도를 함께 설계한다. 아래 응답은 프로그램 내부에서 만든 값이다.

## 따라 해 보기

{% raw %}
```csharp
using System.Net;
using System.Net.Http;

using var client = new HttpClient(new FakeHandler());
using var response = await client.GetAsync("https://example.invalid/status");
response.EnsureSuccessStatusCode();
Console.WriteLine(await response.Content.ReadAsStringAsync());

// 예제용 형식
public class FakeHandler : HttpMessageHandler
{
    protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken token)
    {
        return Task.FromResult(new HttpResponseMessage(HttpStatusCode.OK)
        {
            Content = new StringContent("TEST-OK")
        });
    }
}
```
{% endraw %}

## 실행 결과

```text
TEST-OK
```

## 코드를 따라 읽기

example.invalid는 운영 주소가 아니며 핸들러가 응답을 만들어 외부 통신하지 않는다. 상태 코드뿐 아니라 본문 형식·필수 값도 검사해야 한다. HTTP 성공이 업무 확정까지 뜻하는지는 API 계약을 따른다. 외부 실패를 재현할 때도 핸들러를 교체할 수 있다.

## 헷갈린 부분과 주의점

운영에서 요청마다 HttpClient를 새로 만들고 버리는 패턴은 연결 관리 문제를 만들 수 있다. 짧은 수명은 이 모의 실행의 범위다.

## 복습 문제

200 응답이면 본문의 ID도 항상 유효할까?

**풀이:** 전송 성공과 업무 데이터 검증은 별도 단계다.

## 참고한 문서

[Microsoft 공식 문서 (.NET 8·C# 관련 항목)](https://learn.microsoft.com/en-us/dotnet/fundamentals/networking/http/httpclient)에서 개념과 API의 세부 계약을 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: [C# 공부 44] SemaphoreSlim으로 비동기 공유 구역 보호하기]({{ '/study/2024/csharp/44-semaphore/' | relative_url }})

[전체 학습 목차]({{ '/study/2024/csharp-hospital/' | relative_url }})

[다음 학습: [C# 공부 46] 작은 단정 함수로 경계값과 오류 검사하기 →]({{ '/study/2024/csharp/46-assertions/' | relative_url }})
