---
layout: content
title: "[라즈베리파이 공부 04] 리다이렉션과 파이프로 텍스트 기록 읽기"
date: 2021-09-11 09:00:00 +0900
categories: [RaspberryPi]
tags: [2021학습노트, 라즈베리파이]
series: study-2021
study_track: raspberry-pi
study_order: 76
study_unit: 7
permalink: /study/2021/raspberry-pi/04-text-redirection/
---

프로그램 출력이 파일과 다음 명령으로 이동하는 방식을 정리했다. >와 >>를 혼동하면 기록을 덮어쓸 수 있었다.

> 라즈베리파이 OS Buster 계열을 기준으로 한 명령·설정 예제. 실행 위치와 실제 계정·경로를 본문에서 확인한다.

## 오늘 정리한 개념

>는 표준 출력을 파일에 쓰고 기존 내용을 덮어쓴다. >>는 끝에 추가한다. |는 앞 명령의 표준 출력을 다음 명령의 표준 입력으로 연결한다. cat은 내용 출력, head와 tail은 앞·뒤 일부 확인, grep은 패턴에 맞는 줄을 찾는 데 사용할 수 있다.

## 따라 해 보기

{% raw %}
```bash
mkdir -p "$HOME/pi-study"
printf 'temperature=22\ntemperature=23\n' > "$HOME/pi-study/sample.log"
printf 'temperature=24\n' >> "$HOME/pi-study/sample.log"
tail -n 2 "$HOME/pi-study/sample.log"
grep '24' "$HOME/pi-study/sample.log"
```
{% endraw %}

## 장비에서 확인할 내용

temperature=23
temperature=24
temperature=24

## 코드를 따라 읽기

이 예제는 학습용 sample.log를 새로 쓰므로 같은 이름의 파일을 보존해야 한다면 먼저 다른 경로를 선택한다. tail은 마지막 두 줄을, grep은 24가 포함된 줄을 보여 준다. 파이프와 리다이렉션은 파이썬 문법이 아니라 셸이 명령 실행 전후에 처리하는 기능이다.

## 헷갈린 부분과 주의점

표준 오류는 기본 > 리다이렉션에 포함되지 않는다. 2>&1은 오류를 현재 표준 출력 대상에 연결하며 리다이렉션 순서도 의미가 있다.

## 복습 문제

로그를 계속 보존하면서 추가하려면 어떤 연산자를 쓸까?

**풀이:** >>를 쓴다. 다만 장기 실행에서는 크기 제한과 로그 회전도 필요하다.

## 참고한 문서

[Debian Buster 공식 매뉴얼](https://manpages.debian.org/buster/bash/bash.1.en.html#REDIRECTION)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: mkdir와 파일 경로로 실습 폴더 준비하기]({{ '/study/2021/raspberry-pi/03-workspace-files/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: 파일 권한과 실행 방식 구분하기 →]({{ '/study/2021/raspberry-pi/05-permissions/' | relative_url }})
