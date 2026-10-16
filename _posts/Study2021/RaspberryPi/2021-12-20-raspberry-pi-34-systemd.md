---
layout: content
title: "[라즈베리파이 공부 34] systemd 서비스 파일의 실행 경로와 재시작 정책"
date: 2021-12-20 09:00:00 +0900
categories: [RaspberryPi]
tags: [2021학습노트, 라즈베리파이]
series: study-2021
study_track: raspberry-pi
study_order: 106
study_unit: 10
permalink: /study/2021/raspberry-pi/34-systemd/
---

터미널을 닫아도 관리할 프로그램은 서비스 정의가 필요했다. 예약 실행용 일회 작업과 상주 프로세스의 역할을 구분했다.

> 라즈베리파이 OS Buster 계열을 기준으로 한 명령·설정 예제. 실행 위치와 실제 계정·경로를 본문에서 확인한다.

## 오늘 정리한 개념

아래는 /etc/systemd/system/pi-study.service에 둘 서비스 파일의 예시다. User와 WorkingDirectory·ExecStart를 실제 계정과 절대 경로로 바꿔야 한다. collector.py는 별도로 준비한 상주 수집기여야 한다. Restart=on-failure는 비정상 종료 시 재시작을 요청하며 정상 종료까지 무조건 반복하는 설정은 아니다.

## 따라 해 보기

{% raw %}
```ini
[Unit]
Description=Python study collector

[Service]
Type=simple
User=learner
WorkingDirectory=/home/learner/pi-study
ExecStart=/usr/bin/python3 -u /home/learner/pi-study/collector.py
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
```
{% endraw %}

## 장비에서 확인할 내용

확인 방법: 실제 파일과 계정을 준비한 뒤 sudo systemctl daemon-reload, sudo systemctl start pi-study, systemctl status pi-study로 동작을 확인한다. 자동 시작은 확인 후 별도 enable로 설정한다.

## 코드를 따라 읽기

-u는 출력 버퍼링을 줄여 로그가 늦게 보이는 현상을 줄인다. 서비스 관리자는 셸이 아니므로 ExecStart에서 가상 환경 activate를 기대하지 않고 필요한 파이썬 실행 파일을 직접 지정한다. 진단 로그는 journalctl -u pi-study -n 50으로 확인할 수 있다. 이 글은 장비 설정을 실제 변경하지 않는다.

## 헷갈린 부분과 주의점

기본 예시 계정이나 존재하지 않는 collector.py를 그대로 등록하면 시작이 실패한다. GPIO 접근에 필요한 그룹 권한도 확인하되 무조건 root로 실행하지 않는다.

## 복습 문제

start와 enable은 같은 동작일까?

**풀이:** 아니다. start는 현재 실행, enable은 이후 부팅 시 시작 연결을 설정하는 동작이다.

## 참고한 문서

[Debian Buster 공식 매뉴얼](https://manpages.debian.org/buster/systemd/systemd.service.5.en.html)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: cron의 다섯 시간 필드와 실행 환경]({{ '/study/2021/raspberry-pi/33-cron/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: 일시 오류에 횟수 제한을 둔 재시도 →]({{ '/study/2021/raspberry-pi/35-bounded-retry/' | relative_url }})
