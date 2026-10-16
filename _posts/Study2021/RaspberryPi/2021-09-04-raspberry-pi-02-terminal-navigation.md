---
layout: content
title: "[라즈베리파이 공부 02] pwd, ls, cd로 현재 위치 이해하기"
date: 2021-09-04 09:00:00 +0900
categories: [RaspberryPi]
tags: [2021학습노트, 라즈베리파이]
series: study-2021
study_track: raspberry-pi
study_order: 74
study_unit: 7
permalink: /study/2021/raspberry-pi/02-terminal-navigation/
---

터미널에서 실행한 파이썬이 다른 폴더를 기준으로 파일을 찾는 이유를 정리했다. 상대 경로는 현재 작업 위치에서 시작했다.

> 라즈베리파이 OS Buster 계열을 기준으로 한 명령·설정 예제. 실행 위치와 실제 계정·경로를 본문에서 확인한다.

## 오늘 정리한 개념

pwd는 현재 작업 디렉터리, ls는 항목 목록, cd는 디렉터리 이동 명령이다. ~는 현재 사용자의 홈 디렉터리이고 ..는 상위 디렉터리다. 명령을 실행하는 위치가 상대 파일 경로에 영향을 준다. 공백이 있는 경로는 따옴표로 감싸 하나의 인자로 전달한다.

## 따라 해 보기

{% raw %}
```bash
pwd
ls -la
cd ~
pwd
cd /tmp
pwd
```
{% endraw %}

## 장비에서 확인할 내용

처음 위치와 홈 경로는 계정에 따라 다르다. 마지막 pwd의 결과는 /tmp다.

## 코드를 따라 읽기

ls -la의 -l은 상세 표시, -a는 숨김 항목도 표시한다. cd /tmp는 절대 경로 이동이어서 처음 위치와 관계없이 같은 곳을 가리킨다. 명령은 파일을 삭제하지 않는다. 작업 디렉터리를 알아야 뒤에서 설정 파일과 측정 기록 경로도 정확히 설명할 수 있다.

## 헷갈린 부분과 주의점

리눅스 경로는 대소문자를 구분한다. Notes와 notes는 다른 폴더일 수 있다. cd는 셸의 현재 위치를 바꾸며 파이썬 모듈을 설치하는 명령이 아니다.

## 복습 문제

cd ..를 실행하면 언제나 홈으로 갈까?

**풀이:** 아니다. 현재 위치의 바로 위 디렉터리로 이동한다.

## 참고한 문서

[Debian Buster 공식 매뉴얼](https://manpages.debian.org/buster/bash/bash.1.en.html#SHELL_BUILTIN_COMMANDS)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: 보드 모델과 운영체제부터 확인하기]({{ '/study/2021/raspberry-pi/01-model-os/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: mkdir와 파일 경로로 실습 폴더 준비하기 →]({{ '/study/2021/raspberry-pi/03-workspace-files/' | relative_url }})
