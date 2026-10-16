---
layout: content
title: "[라즈베리파이 공부 09] IP 주소·라우팅·이름 해석을 나누어 확인하기"
date: 2021-09-27 09:00:00 +0900
categories: [RaspberryPi]
tags: [2021학습노트, 라즈베리파이]
series: study-2021
study_track: raspberry-pi
study_order: 81
study_unit: 7
permalink: /study/2021/raspberry-pi/09-network-check/
---

네트워크가 안 될 때 인터넷 전체가 고장 났다고 단정하지 않기로 했다. 주소, 경로, DNS를 따로 확인했다.

> 라즈베리파이 OS Buster 계열을 기준으로 한 명령·설정 예제. 실행 위치와 실제 계정·경로를 본문에서 확인한다.

## 오늘 정리한 개념

ip addr는 인터페이스 주소, ip route는 패킷을 어느 경로로 보낼지 보여 준다. getent hosts는 시스템의 이름 해석 설정을 통해 주소를 조회한다. ping은 ICMP 응답을 확인하지만 차단될 수도 있어 응답 없음만으로 서비스가 내려갔다고 단정할 수 없다.

## 따라 해 보기

{% raw %}
```bash
ip -br addr
ip route
getent hosts raspberrypi.com
ping -c 3 127.0.0.1
```
{% endraw %}

## 장비에서 확인할 내용

인터페이스와 주소·기본 경로·도메인 조회 결과가 환경에 따라 표시된다. 마지막 명령은 자기 장비의 루프백 응답을 확인한다.

## 코드를 따라 읽기

127.0.0.1 응답은 자기 TCP/IP 스택 확인이지 외부 인터넷 연결 증명이 아니다. 무선 인터페이스에 주소가 있는지 본 뒤 기본 경로와 이름 해석을 순서대로 확인한다. 고정 주소를 임의로 지정하기보다 먼저 현재 네트워크의 주소 배정 방식을 파악한다.

## 헷갈린 부분과 주의점

다른 장비와 같은 IP를 수동 지정하면 충돌할 수 있다. IPv4와 IPv6 주소가 함께 나와도 모두 오류라고 생각하지 않는다.

## 복습 문제

IP로 접속은 되는데 도메인으로만 실패한다면 무엇을 먼저 볼까?

**풀이:** DNS 등 이름 해석 설정을 먼저 점검한다. 서비스 자체 문제와 구분하기 위한 단서다.

## 참고한 문서

[Debian Buster 공식 매뉴얼](https://manpages.debian.org/buster/iproute2/ip.8.en.html)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: scp로 학습 파일 전송하기]({{ '/study/2021/raspberry-pi/08-scp/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: 프로세스와 종료 신호 이해하기 →]({{ '/study/2021/raspberry-pi/10-processes/' | relative_url }})
