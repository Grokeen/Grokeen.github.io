---
layout: content
title: "[라즈베리파이 공부 01] 보드 모델과 운영체제부터 확인하기"
date: 2021-09-01 09:00:00 +0900
categories: [RaspberryPi]
tags: [2021학습노트, 라즈베리파이]
series: study-2021
study_track: raspberry-pi
study_order: 73
study_unit: 7
permalink: /study/2021/raspberry-pi/01-model-os/
---

라즈베리파이 실습을 시작하기 전에 무엇이 하드웨어이고 무엇이 운영체제인지 구분했다. 같은 코드라도 보드와 OS 버전에 따라 준비가 달라질 수 있다.

> 라즈베리파이 OS Buster 계열을 기준으로 한 명령·설정 예제. 실행 위치와 실제 계정·경로를 본문에서 확인한다.

## 오늘 정리한 개념

라즈베리파이는 파이썬 전용 장치가 아니라 리눅스 등을 실행하는 소형 컴퓨터다. 이 시리즈의 장비 예제는 40핀 헤더가 있는 Raspberry Pi 3/4와 Raspberry Pi OS Buster, Python 3.7 계열을 기준으로 정리했다. GPIO Zero API는 2021년 3월에 공개된 1.6.2 문서를 참고한다.

## 따라 해 보기

{% raw %}
```bash
cat /proc/device-tree/model
printf '\n'
cat /etc/os-release
python3 --version
uname -m
```
{% endraw %}

## 장비에서 확인할 내용

장비별 출력: 모델명, OS 이름·버전, Python 3 버전, CPU 아키텍처가 차례로 표시된다.

## 코드를 따라 읽기

터미널에서 명령을 한 줄씩 실행한다. model은 보드, os-release는 운영체제, uname -m은 실행 아키텍처를 확인한다. 2021년 11월에는 Bullseye가 공개되었지만 이 노트의 Buster 실습 기준을 중간에 자동으로 바꾸지는 않는다. 최신 설치 화면과 메뉴 이름은 다를 수 있다.

## 헷갈린 부분과 주의점

현재 새 장비를 설치하면서 과거 OS를 그대로 사용하라는 권장은 아니다. 2021년 학습 맥락을 위한 버전 기준이며 장비가 다르면 해당 문서를 확인한다.

## 복습 문제

python과 python3가 항상 같은 인터프리터일까?

**풀이:** 아니다. 명령 이름에 기대지 말고 --version과 실행 경로를 확인한다.

## 참고한 문서

[Raspberry Pi 공식 문서](https://www.raspberrypi.com/news/raspberry-pi-os-debian-bullseye/)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: 작은 종합 실습: 측정값을 검증하고 요약하기]({{ '/study/2021/python/72-python-mini-project/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: pwd, ls, cd로 현재 위치 이해하기 →]({{ '/study/2021/raspberry-pi/02-terminal-navigation/' | relative_url }})
