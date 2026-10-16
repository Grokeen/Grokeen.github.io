---
layout: content
title: "[정보처리기사 38] HTTP 안전성·멱등성과 상태 코드"
date: 2023-10-25 09:00:00 +0900
categories: [InformationProcessingCertification]
tags: [자격증학습, 정보처리기사]
series: study-certifications-2021-2023
study_track: information-processing
study_order: 38
study_unit: 8
permalink: /study/certifications/2021-2023/information-processing/38-http-semantics/
---

멱등성을 같은 응답이 돌아온다는 뜻으로 잘못 외우고 있었다. 의도한 서버 효과가 반복에 따라 바뀌는지로 정리했다.

> 2021~2023년 정보처리기사 학습 범위의 개념을 정리한 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

안전한 메서드는 클라이언트가 상태 변경을 요청하지 않는 의미를 가진다. 멱등성은 같은 요청을 여러 번 수행한 의도된 효과가 한 번 수행한 것과 같은 성질이다. GET은 안전하고 멱등적이며 PUT·DELETE는 멱등적이다. POST는 일반적으로 멱등성을 보장하지 않는다. 상태 코드는 응용 규약과 함께 해석한다.

## 예제 문제 · 창작

같은 자원에 DELETE를 반복했더니 처음에는 204, 다음에는 404가 왔다. 응답 코드가 달라졌으므로 DELETE는 멱등적이지 않다는 주장은 맞는가?

## 풀이와 판단 근거

틀리다. 의도된 결과인 해당 자원의 부재가 반복 후에도 같다면 멱등성의 의미와 양립한다. 모든 요청에서 로그나 응답까지 완전히 동일해야 한다는 뜻은 아니다. 202는 요청 접수를 뜻하며 처리가 이미 성공 완료되었다는 보장은 아니다.

## 헷갈린 부분과 주의점

2021년 HTTP 의미 학습에는 당시의 RFC 7231을 기준으로 적었다. 이후 HTTP 문서 체계의 개정과 당시 기준을 혼동하지 않는다.

## 복습 문제

PUT과 POST의 멱등성은 보통 같은가?

**풀이:** PUT은 멱등적 의미를 가지며 POST는 보통 보장하지 않는다. 서비스가 별도 중복 방지 키를 제공할 수 있다.

## 참고한 문서

[개념·API의 원문 자료](https://www.rfc-editor.org/rfc/rfc7231)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/information-processing/37-tcp-udp/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/information-processing/39-parameterized-query/' | relative_url }})
