---
layout: content
title: "[경제신문스크랩][로봇] Performer-MPC, 로봇 내부에서 빠르게 판단하는 이동 제어"
date: 2023-03-03 12:00:00 +0900
permalink: "/scrap/robotics/Performer-MPC/"
categories: [경제신문스크랩]
tags: ["로봇", "이동·실시간 계산"]
pin: false
news_id: "robotics-Performer-MPC"
source_url: "https://research.google/blog/performer-mpc-navigation-via-real-time-on-robot-transformers/"
source_date: 2023-03-03
reviewed_at: 2026-10-16
excerpt: "Google이 Transformer 표현과 모델 예측 제어를 결합하는 Performer-MPC를 설명했다. 학습한 비용 함수로 이동 맥락을 반영한다."
---

# Performer-MPC, 로봇 내부에서 빠르게 판단하는 이동 제어

- [원문: Performer-MPC: Navigation via real-time, on-robot transformers](https://research.google/blog/performer-mpc-navigation-via-real-time-on-robot-transformers/)
- 날짜: 2023-03-03 (기사·발표일)
- 원문 발행일: 2023-03-03
- 자료 성격: 공식 연구 소개 · Google Research
- 정리 기준일: 2026-10-16

## 핵심 내용

- Google이 Transformer 표현과 모델 예측 제어를 결합하는 Performer-MPC를 설명했다. 학습한 비용 함수로 이동 맥락을 반영한다.
- 로봇 내부에서 약 8ms 지연을 보고한 실험이며 CoRL 2022 연구를 2023년 블로그에서 소개한 것이다.

## 무엇이 달라졌나

대형 모델의 표현력뿐 아니라 이동 안전에 필요한 짧은 계산 지연과 전통 제어의 결합이 강조됐다.

## 앞으로의 관전 포인트 · 해석

통신에 의존하지 않는 이동 제어의 가능성을 보여준다. 혼잡도·센서 주기·기기 사양이 달라질 때 지연 상한을 다시 검증해야 한다.

## 사회적 쟁점과 한계 · 해석

실험에서 학습한 사회적 거리가 모든 사람과 문화에 적절한 것은 아니다. 사각지대와 예측 불가능한 움직임에 대한 보호가 필요하다.

[이 주제의 전체 스크랩 목차](/scrap/robotics/)
