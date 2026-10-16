---
layout: content
title: "[라즈베리파이 공부 07] SSH로 같은 네트워크의 장비에 접속하기"
date: 2021-09-21 09:00:00 +0900
categories: [RaspberryPi]
tags: [2021학습노트, 라즈베리파이]
series: study-2021
study_track: raspberry-pi
study_order: 79
study_unit: 7
permalink: /study/2021/raspberry-pi/07-ssh/
---

모니터 없이 관리하려면 장비 주소와 계정, SSH 서비스가 모두 필요했다. 접속 단계별로 실패 원인을 나누었다.

> 라즈베리파이 OS Buster 계열을 기준으로 한 명령·설정 예제. 실행 위치와 실제 계정·경로를 본문에서 확인한다.

## 오늘 정리한 개념

라즈베리파이에서 sudo raspi-config의 SSH 설정을 활성화하고 네트워크 주소를 확인한다. 다른 컴퓨터에서는 ssh 계정@주소로 접속한다. 여기서 계정과 주소는 자신의 실제 값으로 바꾼다. 아래 192.168.1.50은 설명용 사설 주소이며 고정된 장비 주소가 아니다.

## 따라 해 보기

{% raw %}
```bash
hostname -I
systemctl is-active ssh
# 아래 명령은 접속할 다른 컴퓨터에서 실행한다.
ssh learner@192.168.1.50
```
{% endraw %}

## 장비에서 확인할 내용

장비에서는 자신의 IP와 SSH 상태를 확인한다. 클라이언트에서는 첫 접속 시 호스트 키 확인 후 인증 절차가 진행된다.

## 코드를 따라 읽기

IP 확인 명령은 라즈베리파이에서, ssh 명령은 접속할 컴퓨터에서 실행한다. 처음 제시되는 호스트 키 지문은 장비에서 확인한 것과 비교한다. 연결 거부는 서비스 상태를, 시간 초과는 주소·네트워크를, 인증 실패는 계정·키를 나누어 점검한다.

## 헷갈린 부분과 주의점

예시 계정 learner를 실제 계정으로 바꾼다. 기본 비밀번호를 그대로 쓰거나 필요 없이 공유기에 외부 포트를 열지 않는다. 공개키 설정은 접속 확인 후 단계적으로 적용한다.

## 복습 문제

ping이 된다고 SSH 로그인까지 보장될까?

**풀이:** 아니다. 네트워크 도달성과 SSH 서비스·인증은 서로 다른 단계다.

## 참고한 문서

[Raspberry Pi 공식 문서](https://www.raspberrypi.com/documentation/computers/remote-access.html#ssh)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: apt와 venv의 역할, 프로젝트 환경 만들기]({{ '/study/2021/raspberry-pi/06-venv-install/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: scp로 학습 파일 전송하기 →]({{ '/study/2021/raspberry-pi/08-scp/' | relative_url }})
