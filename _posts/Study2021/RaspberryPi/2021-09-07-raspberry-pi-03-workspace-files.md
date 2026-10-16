---
layout: content
title: "[라즈베리파이 공부 03] mkdir와 파일 경로로 실습 폴더 준비하기"
date: 2021-09-07 09:00:00 +0900
categories: [RaspberryPi]
tags: [2021학습노트, 라즈베리파이]
series: study-2021
study_track: raspberry-pi
study_order: 75
study_unit: 7
permalink: /study/2021/raspberry-pi/03-workspace-files/
---

실습마다 파일이 흩어지지 않도록 프로젝트 폴더를 정했다. 명령의 대상 경로를 읽고 나서 실행하는 습관을 들였다.

> 라즈베리파이 OS Buster 계열을 기준으로 한 명령·설정 예제. 실행 위치와 실제 계정·경로를 본문에서 확인한다.

## 오늘 정리한 개념

mkdir -p는 중간 경로까지 필요한 디렉터리를 만든다. 이미 폴더가 있어도 사용할 수 있다. touch는 파일이 없으면 빈 파일을 만들고 있으면 타임스탬프를 갱신한다. cp는 복사이고 원본을 남긴다. 여기서는 삭제·이동 없이 학습용 홈 하위 경로만 사용한다.

## 따라 해 보기

{% raw %}
```bash
mkdir -p "$HOME/pi-study/data"
touch "$HOME/pi-study/data/note.txt"
cp "$HOME/pi-study/data/note.txt" "$HOME/pi-study/data/note-copy.txt"
ls "$HOME/pi-study/data"
```
{% endraw %}

## 장비에서 확인할 내용

data 폴더 안에 note.txt와 note-copy.txt가 보인다. 기존 항목이 있으면 함께 표시된다.

## 코드를 따라 읽기

HOME 환경 변수는 현재 계정의 홈을 나타낸다. 큰따옴표 안에서는 변수가 확장되면서 공백이 있어도 한 경로로 전달된다. 빈 파일을 복사한 예제이므로 두 파일의 내용은 같다. 실제 작업에서는 복사 대상에 같은 이름이 이미 있는지도 확인한다.

## 헷갈린 부분과 주의점

touch는 기존 파일 내용을 비우는 명령이 아니다. cp는 목적지에 같은 이름의 파일이 있으면 덮어쓸 수 있으므로 새 이름을 선택한다.

## 복습 문제

mkdir -p 없이 여러 단계 경로를 만들면 언제 실패할까?

**풀이:** 상위 디렉터리가 아직 존재하지 않으면 하위 경로 생성에 실패할 수 있다.

## 참고한 문서

[Debian Buster 공식 매뉴얼](https://manpages.debian.org/buster/coreutils/mkdir.1.en.html)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: pwd, ls, cd로 현재 위치 이해하기]({{ '/study/2021/raspberry-pi/02-terminal-navigation/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: 리다이렉션과 파이프로 텍스트 기록 읽기 →]({{ '/study/2021/raspberry-pi/04-text-redirection/' | relative_url }})
