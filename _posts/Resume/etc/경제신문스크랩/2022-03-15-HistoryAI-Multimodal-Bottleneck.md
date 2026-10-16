---
layout: content
title: "[경제신문스크랩][AI·빅데이터] 영상과 소리의 결합에서도 계산량을 줄이는 설계 경쟁"
date: 2022-03-15 12:00:00 +0900
permalink: "/scrap/ai-bigdata-2022-2023/Multimodal-Bottleneck/"
categories: [경제신문스크랩]
tags: ["AI", "멀티모달·계산 효율"]
pin: false
news_id: "historical-Multimodal-Bottleneck"
source_url: "https://research.google/blog/multimodal-bottleneck-transformer-mbt-a-new-model-for-modality-fusion/"
source_date: 2022-03-15
reviewed_at: 2026-10-16
excerpt: "구글은 영상과 오디오 사이의 정보 교환을 제한된 병목 표현으로 모으는 Multimodal Bottleneck Transformer를 소개했다. 관련 연구는 NeurIPS 2021에 발표됐고 이 글은 구조와 코드 공개를 설명한다."
---

# 영상과 소리의 결합에서도 계산량을 줄이는 설계 경쟁

- [원문: Multimodal Bottleneck Transformer (MBT): A New Model for Modality Fusion](https://research.google/blog/multimodal-bottleneck-transformer-mbt-a-new-model-for-modality-fusion/)
- 날짜: 2022-03-15 (기사·발표일)
- 원문 발행일: 2022-03-15
- 자료 성격: 공식 연구·제품 발표 · Google Research
- 정리 기준일: 2026-10-16

## 핵심 내용

- 구글은 영상과 오디오 사이의 정보 교환을 제한된 병목 표현으로 모으는 Multimodal Bottleneck Transformer를 소개했다. 관련 연구는 NeurIPS 2021에 발표됐고 이 글은 구조와 코드 공개를 설명한다.
- 모든 영상·소리 토큰을 무제한으로 서로 비교하기보다 필요한 정보를 압축해 공유한다. 발표는 실험한 영상 분류 과제에서 성능과 계산량의 개선을 제시했다.

## 무엇이 달라졌나

멀티모달 AI의 발전이 입력 종류를 늘리는 것만으로 결정되지 않고 결합 구조의 효율에도 달렸다는 사례다. 기업의 영상 분석에서는 처리량과 전력 비용이 함께 중요해질 수 있다.

## 앞으로의 관전 포인트 · 해석

실제 도입에서는 잡음·누락된 소리·다른 촬영 환경에서 품질을 확인해야 한다. 논문 계산량 감소가 동일 비율의 클라우드 청구액 절감으로 이어지는지는 별도 측정 대상이다.

## 사회적 쟁점과 한계 · 해석

영상과 소리를 함께 분석하면 관찰되는 개인 행동 정보도 늘 수 있다. 성능 개선과 감시 범위 확대를 같은 성과로 취급하지 않고 목적·접근 권한을 검토해야 한다.

[이 주제의 전체 스크랩 목차](/scrap/ai-bigdata-2022-2023/)
