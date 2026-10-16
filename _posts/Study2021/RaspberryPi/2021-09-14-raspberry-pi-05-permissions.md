---
layout: content
title: "[라즈베리파이 공부 05] 파일 권한과 실행 방식 구분하기"
date: 2021-09-14 09:00:00 +0900
categories: [RaspberryPi]
tags: [2021학습노트, 라즈베리파이]
series: study-2021
study_track: raspberry-pi
study_order: 77
study_unit: 7
permalink: /study/2021/raspberry-pi/05-permissions/
---

Permission denied가 나왔을 때 무조건 sudo를 붙이기보다 파일 소유자와 권한을 먼저 확인하기로 했다.

> 라즈베리파이 OS Buster 계열을 기준으로 한 명령·설정 예제. 실행 위치와 실제 계정·경로를 본문에서 확인한다.

## 오늘 정리한 개념

ls -l은 소유자·그룹과 읽기(r)·쓰기(w)·실행(x) 권한을 보여 준다. python3 script.py는 파이썬이 읽을 수 있는 파일을 실행하는 방식이다. ./script.py는 실행 권한과 올바른 shebang이 필요하다. 폴더의 x는 그 안으로 접근하는 탐색 권한이라 파일과 의미가 다르다.

## 따라 해 보기

{% raw %}
```bash
ls -ld "$HOME" /tmp
id
umask
command -v python3
```
{% endraw %}

## 장비에서 확인할 내용

계정별 소유자·그룹·기본 권한 마스크와 python3의 실제 경로가 표시된다. 값은 환경마다 다르다.

## 코드를 따라 읽기

id에서 현재 계정과 그룹을 읽는다. command -v는 어떤 python3가 선택되는지 알려 준다. 이 예제는 권한을 변경하지 않고 관찰만 한다. 실제로 소유 파일의 실행 권한을 추가할 때는 chmod u+x처럼 대상과 필요한 범위만 지정한다.

## 헷갈린 부분과 주의점

chmod 777을 만능 해결책으로 쓰지 않는다. 시스템 Python 패키지 문제를 sudo pip로 덮으면 배포판 패키지와 충돌할 수 있다.

## 복습 문제

읽기 권한은 있지만 실행 권한이 없는 스크립트를 python3로 실행할 수 있을까?

**풀이:** 내용과 상위 경로에 접근할 수 있다면 가능하다. 인터프리터에 파일을 전달하는 실행 방식이기 때문이다.

## 참고한 문서

[Debian Buster 공식 매뉴얼](https://manpages.debian.org/buster/coreutils/chmod.1.en.html)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: 리다이렉션과 파이프로 텍스트 기록 읽기]({{ '/study/2021/raspberry-pi/04-text-redirection/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: apt와 venv의 역할, 프로젝트 환경 만들기 →]({{ '/study/2021/raspberry-pi/06-venv-install/' | relative_url }})
