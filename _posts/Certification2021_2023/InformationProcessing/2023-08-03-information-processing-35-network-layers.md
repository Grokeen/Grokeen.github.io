---
layout: content
title: "[정보처리기사 35] 네트워크 계층별 주소와 장비 역할"
date: 2023-08-03 09:00:00 +0900
categories: [InformationProcessingCertification]
tags: [자격증학습, 정보처리기사]
series: study-certifications-2021-2023
study_track: information-processing
study_order: 35
study_unit: 7
permalink: /study/certifications/2021-2023/information-processing/35-network-layers/
---

MAC 주소·IP 주소·포트 번호가 모두 같은 주소라고 생각하면 계층 문제가 헷갈렸다. 전달 대상의 범위를 먼저 적었다.

> 2021~2023년 정보처리기사 학습 범위의 개념을 정리한 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

링크 계층은 같은 링크에서 프레임 전달을, 인터넷 계층은 IP 패킷의 네트워크 간 전달을, 전송 계층은 종단의 통신 흐름을 다룬다. 응용 계층에는 HTTP나 DNS 같은 응용 프로토콜이 있다. OSI 7계층과 TCP/IP 모델의 계층 수는 다르므로 문제에서 쓰는 모델을 먼저 확인한다.

## 예제 문제 · 창작

라우터가 목적지 IP 대역을 보고 다음 홉을 고르는 동작은 OSI 기준 어느 계층에 해당하는가? HTTP의 GET 요청은 어느 계층의 기능인가?

## 풀이와 판단 근거

라우팅은 네트워크 계층, HTTP 요청 의미는 응용 계층이다. 포트 번호는 TCP·UDP가 응용의 통신 종단을 구분할 때 사용한다. 실제 장비는 방화벽이나 응용 프록시 기능까지 함께 가질 수 있어 장비 이름 하나로 모든 기능을 단정하지 않는다.

## 헷갈린 부분과 주의점

TCP/IP의 인터넷 계층과 OSI 응용 계층을 같은 단계로 외우지 않는다. 모델 간 대응은 역할을 중심으로 정리한다.

## 복습 문제

스위치라는 이름만으로 L7 기능이 없다고 결론 내려도 될까?

**풀이:** 안 된다. 문제의 장비가 수행하는 기능과 명시된 계층을 확인해야 한다.

## 참고한 문서

[개념·API의 원문 자료](https://www.rfc-editor.org/rfc/rfc1122)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/information-processing/34-paging-address/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/information-processing/36-ipv4-subnet/' | relative_url }})
