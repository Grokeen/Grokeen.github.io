---
layout: content
title: "[라즈베리파이 공부 33] cron의 다섯 시간 필드와 실행 환경"
date: 2021-12-16 09:00:00 +0900
categories: [RaspberryPi]
tags: [2021학습노트, 라즈베리파이]
series: study-2021
study_track: raspberry-pi
study_order: 105
study_unit: 10
permalink: /study/2021/raspberry-pi/33-cron/
---

수동 실행과 예약 실행의 환경이 다를 수 있음을 정리했다. PATH와 작업 폴더에 기대지 않는 경로 구성이 필요했다.

> 라즈베리파이 OS Buster 계열을 기준으로 한 명령·설정 예제. 실행 위치와 실제 계정·경로를 본문에서 확인한다.

## 오늘 정리한 개념

사용자 crontab의 시간 필드는 분·시·일·월·요일 순서다. */5는 분 필드에서 5분 간격을 뜻한다. cron은 로그인 셸과 같은 환경을 보장하지 않으므로 인터프리터·스크립트·출력 경로를 절대 경로로 적는다. 아래 항목은 터미널 명령이 아니라 crontab -e로 여는 편집기에 넣을 형식 예제다.

## 따라 해 보기

{% raw %}
```cron
# 사용자 crontab 형식 예제: 실제 계정·경로로 바꾼 뒤 등록
*/5 * * * * /usr/bin/python3 /home/learner/pi-study/collect_once.py >> /home/learner/pi-study/cron.log 2>&1
```
{% endraw %}

## 장비에서 확인할 내용

확인 방법: crontab -l로 등록 항목을 확인하고 예정 시각 뒤 로그의 새 기록과 종료 상태를 점검한다. 이 글 자체가 예약 작업을 등록하지는 않는다.

## 코드를 따라 읽기

collect_once.py는 한 번 수집한 뒤 종료하도록 직접 준비해야 하는 파일이다. 이전의 유한 수집 예제를 단일 실행으로 바꿔 사용할 수 있다. learner는 예시 계정이다. 작업이 5분보다 오래 걸릴 수 있으면 중복 실행 방지 정책도 설계해야 한다. 시스템 crontab은 사용자 필드가 추가되어 형식이 다르다.

## 헷갈린 부분과 주의점

cron 줄 안의 %는 셸에서의 일반 문자와 다르게 처리될 수 있다. 복잡한 명령은 스크립트에 넣고 cron에는 경로만 적는 편이 명확하다.

## 복습 문제

0 9 * * *는 언제 실행할까?

**풀이:** 장비의 cron 시간대 기준 매일 09:00에 실행한다.

## 참고한 문서

[Debian Buster 공식 매뉴얼](https://manpages.debian.org/buster/cron/crontab.5.en.html)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: Ctrl+C 뒤에도 GPIO를 정리하는 구조]({{ '/study/2021/raspberry-pi/32-cleanup/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: systemd 서비스 파일의 실행 경로와 재시작 정책 →]({{ '/study/2021/raspberry-pi/34-systemd/' | relative_url }})
