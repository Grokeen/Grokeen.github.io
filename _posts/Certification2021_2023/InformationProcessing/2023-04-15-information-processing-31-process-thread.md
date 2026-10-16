---
layout: content
title: "[정보처리기사 31] 프로세스와 스레드의 공유 범위"
date: 2023-04-15 09:00:00 +0900
categories: [InformationProcessingCertification]
tags: [자격증학습, 정보처리기사]
series: study-certifications-2021-2023
study_track: information-processing
study_order: 31
study_unit: 7
permalink: /study/certifications/2021-2023/information-processing/31-process-thread/
---

자원 소유와 실행 흐름을 나누어 보니 프로세스와 스레드의 차이가 정리됐다. 같은 프로세스라고 모든 실행 상태를 공유하는 것은 아니었다.

> 2021~2023년 정보처리기사 학습 범위의 개념을 정리한 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

프로세스는 실행 중인 프로그램에 자원과 주소 공간을 연결한 단위다. 스레드는 그 안에서 실행되는 흐름이며 일반적으로 코드·전역 데이터·힙을 공유하고 레지스터와 스택은 따로 가진다. 공유 변수의 동시 갱신에는 동기화가 필요하다. 프로세스 간 통신은 별도 IPC나 명시적인 공유 메모리를 사용할 수 있다.

## 예제 문제 · 창작

같은 프로세스의 두 스레드가 전역 카운터를 증가시킨다. ①각 스레드의 스택은 보통 별도다 ②전역 변수는 자동으로 서로 격리된다 중 옳은 설명은?

## 풀이와 판단 근거

①이 옳다. 스레드별 지역 호출 상태는 별도 스택에 두지만 전역 카운터는 공유한다. 읽기·증가·쓰기 전체가 원자적이라는 보장이 없으면 갱신이 사라질 수 있다. 전역 변수라는 이유만으로 락이 자동 적용되지 않는다.

## 헷갈린 부분과 주의점

멀티스레딩이 언제나 CPU 연산을 빠르게 한다고 단정하지 않는다. 언어 런타임, 작업 성격, 락 경합과 코어 수를 함께 본다.

## 복습 문제

스레드별 스택이 따로 있으면 공유 데이터의 경쟁도 없어질까?

**풀이:** 아니다. 힙과 전역 데이터 등 공유 자원을 읽고 쓰는 코드에서 경쟁이 생긴다.

## 참고한 문서

[개념·API의 원문 자료](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-intro.pdf)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/information-processing/30-graph-bfs/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/information-processing/32-fcfs-waiting/' | relative_url }})
