---
layout: content
title: "[정보처리기사 37] TCP 바이트 스트림과 UDP 데이터그램"
date: 2023-09-28 09:00:00 +0900
categories: [InformationProcessingCertification]
tags: [자격증학습, 정보처리기사]
series: study-certifications-2021-2023
study_track: information-processing
study_order: 37
study_unit: 8
permalink: /study/certifications/2021-2023/information-processing/37-tcp-udp/
---

신뢰성 제공 방식과 메시지 경계를 따로 비교했다. TCP 한 번의 send가 한 번의 recv와 대응한다는 가정을 버렸다.

> 2021~2023년 정보처리기사 학습 범위의 개념을 정리한 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

TCP는 연결과 순서 있는 신뢰성 있는 바이트 스트림을 제공한다. 응용은 길이 필드나 구분자 등으로 메시지 경계를 정의해야 한다. UDP는 데이터그램 단위를 제공하지만 자체적으로 도착·순서·재전송을 보장하지 않는다. UDP 위의 응용 프로토콜이 별도의 신뢰성 기능을 만들 수도 있다.

## 예제 문제 · 창작

TCP로 10바이트를 두 번 보냈다. 수신 측이 recv를 두 번 호출하면 항상 10바이트씩 얻는가?

## 풀이와 판단 근거

아니다. 전송한 20바이트는 수신 버퍼 상태 등에 따라 나뉘거나 합쳐져 읽힐 수 있다. 필요한 길이까지 누적하거나 응용 메시지 형식을 해석해야 한다. UDP 역시 전달을 보장하지 않아 수신 데이터그램이 빠질 수 있다.

## 헷갈린 부분과 주의점

TCP 신뢰성은 업무 처리의 중복 방지까지 보장하지 않는다. 응답 유실 후 응용 재시도에는 요청 ID 같은 별도 정책이 필요하다.

## 복습 문제

UDP를 사용하면 반드시 신뢰성이 전혀 없는 응용만 만들 수 있을까?

**풀이:** 아니다. 응용이나 상위 프로토콜이 필요한 확인·재전송 기능을 추가할 수 있다.

## 참고한 문서

[개념·API의 원문 자료](https://www.rfc-editor.org/rfc/rfc793) · [추가 공식 자료 1](https://www.rfc-editor.org/rfc/rfc768)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/information-processing/36-ipv4-subnet/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/information-processing/38-http-semantics/' | relative_url }})
