---
layout: content
title: "[경제신문스크랩][AI·빅데이터] H100 Transformer Engine, 낮은 정밀도 계산으로 학습을 가속하다"
date: 2022-03-22 12:00:00 +0900
permalink: "/scrap/ai-bigdata-2022-2023/H100-Transformer-Engine/"
categories: [경제신문스크랩]
tags: ["AI", "AI·반도체"]
pin: false
news_id: "historical-H100-Transformer-Engine"
source_url: "https://blogs.nvidia.com/blog/h100-transformer-engine/"
source_date: 2022-03-22
reviewed_at: 2026-10-16
excerpt: "NVIDIA가 Hopper H100의 Transformer Engine을 설명했다. 계층별 특성에 따라 FP8·FP16 정밀도를 선택하는 방식이다."
---

# H100 Transformer Engine, 낮은 정밀도 계산으로 학습을 가속하다

- [원문: H100 Transformer Engine Supercharges AI Training, Delivering Up to 6x Higher Performance Without Losing Accuracy](https://blogs.nvidia.com/blog/h100-transformer-engine/)
- 날짜: 2022-03-22 (기사·발표일)
- 원문 발행일: 2022-03-22
- 자료 성격: 공식 연구·제품 발표 · NVIDIA
- 정리 기준일: 2026-10-16
- 원문 후속 수정일: 2023-08-08
- 날짜·자료 확인: 원문은 2023-08-08 Ada 설명 추가를 명시한다. 본문은 2022년 Hopper·H100 기술 발표 범위로 정리했다.

## 핵심 내용

- NVIDIA가 Hopper H100의 Transformer Engine을 설명했다. 계층별 특성에 따라 FP8·FP16 정밀도를 선택하는 방식이다.
- 속도 향상은 회사가 제시한 모델·시스템 조건의 결과다. 이후 본문에 추가된 Ada 관련 설명을 2022년 발표로 옮기지 않았다.

## 무엇이 달라졌나

모델 확대에 필요한 계산을 더 정밀하게 관리하는 하드웨어·소프트웨어 공동 최적화가 부각됐다.

## 앞으로의 관전 포인트 · 해석

저정밀 학습의 가치는 처리량과 모델 품질을 함께 유지할 때 커진다. 실제 모델의 수렴과 비용을 검증해야 한다.

## 사회적 쟁점과 한계 · 해석

성능 배수만으로 전력이나 서비스 비용을 추정하면 오류가 생긴다. 특정 가속기와 도구에 대한 의존도도 남는다.

[이 주제의 전체 스크랩 목차](/scrap/ai-bigdata-2022-2023/)
