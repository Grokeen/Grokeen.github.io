---
layout: content
title: "[경제신문스크랩][로봇] 말을 보상 함수로 번역해 로봇 동작을 학습하다"
date: 2023-08-22 12:00:00 +0900
permalink: "/scrap/robotics/Language-To-Rewards/"
categories: [경제신문스크랩]
tags: ["로봇", "제어·보상 설계"]
pin: false
news_id: "robotics-Language-To-Rewards"
source_url: "https://research.google/blog/language-to-rewards-for-robotic-skill-synthesis/"
source_date: 2023-08-22
reviewed_at: 2026-10-16
excerpt: "Google Research가 자연어 지시를 보상 함수 코드로 바꾸고 동작 제어기가 이를 최적화하는 연구를 소개했다."
---

# 말을 보상 함수로 번역해 로봇 동작을 학습하다

- [원문: Language to rewards for robotic skill synthesis](https://research.google/blog/language-to-rewards-for-robotic-skill-synthesis/)
- 날짜: 2023-08-22 (기사·발표일)
- 원문 발행일: 2023-08-22
- 자료 성격: 공식 연구 소개 · Google Research
- 정리 기준일: 2026-10-16

## 핵심 내용

- Google Research가 자연어 지시를 보상 함수 코드로 바꾸고 동작 제어기가 이를 최적화하는 연구를 소개했다.
- 사족보행·손 조작 시뮬레이션과 실제 조작 로봇에서 시험했다. 언어 모델이 모터 명령을 바로 생성하는 방식과 구분된다.

## 무엇이 달라졌나

미리 준비한 동작을 언어로 고르는 방식에서 목표 동작의 평가 기준 자체를 언어로 구성하는 접근이 나왔다.

## 앞으로의 관전 포인트 · 해석

전문가가 보상 함수를 조정하는 부담을 줄일 수 있다. 모호한 지시의 해석과 실제 하드웨어 제약 반영이 성패를 좌우한다.

## 사회적 쟁점과 한계 · 해석

잘못된 보상은 지시의 취지와 다른 행동을 유도할 수 있다. 생성 코드와 충돌·힘 제한을 실행 전에 검증해야 한다.

[이 주제의 전체 스크랩 목차](/scrap/robotics/)
