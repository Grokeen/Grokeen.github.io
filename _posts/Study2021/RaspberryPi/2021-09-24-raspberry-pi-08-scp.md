---
layout: content
title: "[라즈베리파이 공부 08] scp로 학습 파일 전송하기"
date: 2021-09-24 09:00:00 +0900
categories: [RaspberryPi]
tags: [2021학습노트, 라즈베리파이]
series: study-2021
study_track: raspberry-pi
study_order: 80
study_unit: 7
permalink: /study/2021/raspberry-pi/08-scp/
---

로컬 파일과 원격 파일의 경로 표기 차이를 정리했다. 어느 컴퓨터에서 명령을 실행하는지도 함께 적었다.

> 라즈베리파이 OS Buster 계열을 기준으로 한 명령·설정 예제. 실행 위치와 실제 계정·경로를 본문에서 확인한다.

## 오늘 정리한 개념

scp는 SSH를 통해 파일을 전송한다. 계정@주소:경로가 원격 대상이고 콜론이 없는 일반 경로는 명령을 실행하는 컴퓨터의 경로다. 목적 폴더를 미리 만들고 SSH 접속을 확인한다. 예제는 로컬 현재 폴더에 example.py가 있고 원격 learner 계정의 pi-study 폴더가 있다는 가정이다.

## 따라 해 보기

{% raw %}
```bash
# 이 명령들은 로컬 컴퓨터에서 실행한다.
scp ./example.py learner@192.168.1.50:~/pi-study/example.py
scp learner@192.168.1.50:~/pi-study/data.csv ./downloaded-data.csv
```
{% endraw %}

## 장비에서 확인할 내용

첫 명령은 로컬 코드를 장비로, 두 번째는 장비의 CSV를 로컬 새 이름으로 복사한다. 성공 시 별도 본문 출력 없이 전송 상태만 보일 수 있다.

## 코드를 따라 읽기

콜론 뒤의 ~/pi-study는 원격 계정의 홈 기준이다. 첫 파일 전송 후 장비에서 python3 ~/pi-study/example.py로 실행한다. 두 번째 예제는 원격 data.csv가 실제로 있을 때 사용한다. 파일 복사와 원격 명령 실행은 구분해서 생각했다.

## 헷갈린 부분과 주의점

목적지에 같은 이름이 있으면 덮어쓸 수 있다. 예시 주소와 계정을 자신의 값으로 바꾸고 보존할 파일에는 새 이름을 사용한다.

## 복습 문제

scp A user@host:B에서 A와 B는 각각 어느 쪽일까?

**풀이:** A는 명령 실행 컴퓨터의 로컬 경로, B는 원격 host 안의 경로다.

## 참고한 문서

[Raspberry Pi 공식 문서](https://www.raspberrypi.com/documentation/computers/remote-access.html#scp)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: SSH로 같은 네트워크의 장비에 접속하기]({{ '/study/2021/raspberry-pi/07-ssh/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: IP 주소·라우팅·이름 해석을 나누어 확인하기 →]({{ '/study/2021/raspberry-pi/09-network-check/' | relative_url }})
