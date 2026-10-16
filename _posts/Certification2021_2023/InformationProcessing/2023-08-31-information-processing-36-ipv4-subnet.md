---
layout: content
title: "[정보처리기사 36] IPv4 서브넷의 주소 수와 호스트 범위"
date: 2023-08-31 09:00:00 +0900
categories: [InformationProcessingCertification]
tags: [자격증학습, 정보처리기사]
series: study-certifications-2021-2023
study_track: information-processing
study_order: 36
study_unit: 8
permalink: /study/certifications/2021-2023/information-processing/36-ipv4-subnet/
---

/26을 외우기보다 호스트 비트 수를 계산했다. 문서용 주소 대역으로만 예제를 만들었다.

> 2021~2023년 정보처리기사 학습 범위의 개념을 정리한 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

IPv4 주소는 32비트이고 /26은 네트워크 접두부가 26비트라는 뜻이다. 남은 6비트로 64개 주소를 표현한다. 일반적인 /26 서브넷에서는 네트워크와 브로드캐스트를 제외한 62개를 호스트 주소로 본다. /31·/32처럼 별도 용도가 있는 경우까지 무조건 2개를 빼는 공식을 적용하지 않는다.

## 예제 문제 · 창작

192.0.2.0/26의 첫 호스트, 마지막 호스트, 브로드캐스트 주소를 구하라. 이 주소는 문서 예시 전용이며 실제 장비를 검색하지 않는다.

## 풀이와 판단 근거

주소 범위는 .0~.63이다. 첫 호스트는 .1, 마지막은 .62, 브로드캐스트는 .63이다. 다음 /26 블록은 .64에서 시작한다. ipaddress로 주소 집합을 계산할 뿐 외부 네트워크 통신을 수행하지 않는다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```python
import ipaddress

network = ipaddress.ip_network("192.0.2.0/26")
hosts = list(network.hosts())
print(network.num_addresses, len(hosts))
print(hosts[0], hosts[-1], network.broadcast_address)
```
{% endraw %}

## 실행 결과

```text
64 62
192.0.2.1 192.0.2.62 192.0.2.63
```

## 헷갈린 부분과 주의점

사용 가능한 주소 수와 전체 주소 수를 구분한다. 서브넷 마스크의 1 개수를 장비 수로 읽지 않는다.

## 복습 문제

/27의 전체 주소 수는?

**풀이:** 호스트 비트 5개이므로 32개다.

## 참고한 문서

[개념·API의 원문 자료](https://docs.python.org/3.9/library/ipaddress.html)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/information-processing/35-network-layers/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/information-processing/37-tcp-udp/' | relative_url }})
