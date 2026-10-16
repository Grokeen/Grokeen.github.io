---
layout: content
title: "[라즈베리파이 공부 06] apt와 venv의 역할, 프로젝트 환경 만들기"
date: 2021-09-17 09:00:00 +0900
categories: [RaspberryPi]
tags: [2021학습노트, 라즈베리파이]
series: study-2021
study_track: raspberry-pi
study_order: 78
study_unit: 7
permalink: /study/2021/raspberry-pi/06-venv-install/
---

운영체제 패키지와 파이썬 패키지의 설치 범위를 구분했다. 프로젝트별 환경은 별도 폴더로 만들었다.

> 라즈베리파이 OS Buster 계열을 기준으로 한 명령·설정 예제. 실행 위치와 실제 계정·경로를 본문에서 확인한다.

## 오늘 정리한 개념

apt는 배포판이 관리하는 시스템 패키지를 설치한다. venv는 파이썬 프로젝트용 가상 환경을 만들고 pip는 선택된 파이썬 환경의 패키지를 관리한다. Buster의 시스템 GPIO Zero를 가상 환경에서도 쓰려면 --system-site-packages 옵션을 의도적으로 선택할 수 있다. 완전 격리와는 다르다.

## 따라 해 보기

{% raw %}
```bash
sudo apt update
sudo apt install python3-venv python3-gpiozero
mkdir -p "$HOME/pi-study"
python3 -m venv --system-site-packages "$HOME/pi-study/.venv"
. "$HOME/pi-study/.venv/bin/activate"
python -m pip --version
python -c 'import sys; print(sys.prefix != sys.base_prefix)'
```
{% endraw %}

## 장비에서 확인할 내용

설치 메시지는 저장소 상태에 따라 다르다. 가상 환경을 활성화한 뒤 마지막 결과는 True다.

## 코드를 따라 읽기

활성화는 현재 셸의 명령 검색 경로를 바꾼다. python -m pip는 선택한 파이썬의 pip를 사용하게 해 준다. 배포판에 설치된 GPIO Zero 버전은 저장소에 따라 다르므로 이 노트가 참고한 API 버전과 실제 설치 버전을 함께 확인한다. 종료하려면 deactivate를 실행한다.

## 헷갈린 부분과 주의점

새 폴더에서도 자동으로 활성화되는 것은 아니다. --system-site-packages는 시스템 패키지를 공유하므로 완전히 독립적인 재현 환경이 필요하면 다른 구성을 선택한다.

## 복습 문제

가상 환경 활성화가 새로운 운영체제나 가상 머신을 만드는 걸까?

**풀이:** 아니다. 주로 파이썬 실행·패키지 경로를 분리하는 환경이다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/library/venv.html)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: 파일 권한과 실행 방식 구분하기]({{ '/study/2021/raspberry-pi/05-permissions/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: SSH로 같은 네트워크의 장비에 접속하기 →]({{ '/study/2021/raspberry-pi/07-ssh/' | relative_url }})
