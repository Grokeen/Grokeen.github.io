---
layout: content
title: "[라즈베리파이 공부 10] 프로세스와 종료 신호 이해하기"
date: 2021-10-01 09:00:00 +0900
categories: [RaspberryPi]
tags: [2021학습노트, 라즈베리파이]
series: study-2021
study_track: raspberry-pi
study_order: 82
study_unit: 7
permalink: /study/2021/raspberry-pi/10-processes/
---

실행 중인 프로그램을 작업 단위인 프로세스로 살펴보았다. 강제 종료보다 정리할 시간을 주는 종료 방식을 먼저 생각했다.

> 라즈베리파이 OS Buster 계열을 기준으로 한 명령·설정 예제. 실행 위치와 실제 계정·경로를 본문에서 확인한다.

## 오늘 정리한 개념

ps는 프로세스 상태를 표시하고 pgrep은 이름 패턴으로 프로세스를 찾는다. 터미널의 Ctrl+C는 보통 SIGINT를 전달해 파이썬에서 KeyboardInterrupt로 처리할 수 있다. kill은 이름과 달리 신호를 보내는 명령이며 기본 SIGTERM과 강제 SIGKILL은 다르다.

## 따라 해 보기

{% raw %}
```bash
ps -u "$USER" -o pid,comm
pgrep -af python3
systemctl --version
```
{% endraw %}

## 장비에서 확인할 내용

현재 계정의 프로세스와 python3를 포함한 실행 명령이 보인다. 실행 중인 파이썬이 없다면 pgrep은 결과 없이 종료할 수 있다.

## 코드를 따라 읽기

PID는 프로세스 번호다. 예제는 관찰 명령만 사용하며 실제 프로세스를 종료하지 않는다. 장치 프로그램에서는 Ctrl+C를 잡고 파일과 GPIO를 닫는 구조를 작성할 예정이다. 터미널 창을 닫는 것과 서비스로 관리하는 것도 동작이 다를 수 있다.

## 헷갈린 부분과 주의점

kill -9는 finally 정리 기회를 주지 않는다. PID는 재사용될 수 있으므로 예전에 적어 둔 번호로 무작정 종료하지 않는다.

## 복습 문제

KeyboardInterrupt를 except Exception으로 잡을 수 있을까?

**풀이:** 일반적으로 안 된다. KeyboardInterrupt는 Exception이 아닌 BaseException에서 직접 파생된다.

## 참고한 문서

[Debian Buster 공식 매뉴얼](https://manpages.debian.org/buster/procps/ps.1.en.html)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: IP 주소·라우팅·이름 해석을 나누어 확인하기]({{ '/study/2021/raspberry-pi/09-network-check/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: BCM 번호와 물리 핀 번호 구별하기 →]({{ '/study/2021/raspberry-pi/11-gpio-numbering/' | relative_url }})
