---
layout: content
title: "[정보처리기사 33] 교착 상태의 네 조건과 자원 순서"
date: 2023-06-09 09:00:00 +0900
categories: [InformationProcessingCertification]
tags: [자격증학습, 정보처리기사]
series: study-certifications-2021-2023
study_track: information-processing
study_order: 33
study_unit: 7
permalink: /study/certifications/2021-2023/information-processing/33-deadlock/
---

느린 실행과 영원히 서로 기다리는 상태를 구별했다. 자원 획득 순서를 통일하는 이유를 대기 그래프로 확인했다.

> 2021~2023년 정보처리기사 학습 범위의 개념을 정리한 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

고전적인 자원 교착 상태의 필요 조건은 상호 배제, 점유와 대기, 비선점, 순환 대기다. 조건 하나가 성립하지 않도록 설계하면 그 모델의 교착을 예방할 수 있다. 예방, 안전 상태를 확인하는 회피, 발생 후 탐지·회복은 서로 다른 접근이다. 대기가 있다는 사실만으로 교착이라고 판단하지 않는다.

## 예제 문제 · 창작

작업 A는 프린터를 잡고 스캐너를 기다리며 B는 스캐너를 잡고 프린터를 기다린다. 모든 작업이 프린터→스캐너 순으로만 획득하도록 바꾸면 주로 어떤 조건을 끊는가?

## 풀이와 판단 근거

순환 대기다. 일관된 전역 순서를 지키면 서로 반대 방향으로 자원을 기다리는 고리를 만들지 않게 된다. 단, 예외 경로나 다른 종류의 락까지 같은 규칙을 적용해야 효과가 있다. 처리량 감소나 기아 가능성은 별도 검토한다.

## 헷갈린 부분과 주의점

교착 방지가 공정성과 높은 성능도 자동 보장한다고 생각하지 않는다. 타임아웃은 실패 처리 정책과 재시도 충돌까지 함께 설계한다.

## 복습 문제

기아와 교착은 같은가?

**풀이:** 아니다. 기아는 다른 작업이 계속 진행해도 특정 작업이 자원을 얻지 못할 수 있다.

## 참고한 문서

[개념·API의 원문 자료](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-bugs.pdf)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/information-processing/32-fcfs-waiting/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/information-processing/34-paging-address/' | relative_url }})
