---
layout: content
title: "[경제신문스크랩][AI·빅데이터] 연합학습에 수학적 보호를 더한 Gboard의 실서비스 사례"
date: 2022-02-28 12:00:00 +0900
permalink: "/scrap/ai-bigdata-2022-2023/Federated-DP-Gboard/"
categories: [경제신문스크랩]
tags: ["AI", "연합학습·데이터 보호"]
pin: false
news_id: "historical-Federated-DP-Gboard"
source_url: "https://research.google/blog/federated-learning-with-formal-differential-privacy-guarantees/"
source_date: 2022-02-28
reviewed_at: 2026-10-16
excerpt: "구글은 스페인어 Gboard의 다음 단어 예측 모델에 연합학습과 정형화한 차등 개인정보보호 보장을 함께 적용했다고 발표했다. 단말의 원자료를 중앙에 모으지 않는 방식과 학습 결과 보호를 결합한 사례다."
---

# 연합학습에 수학적 보호를 더한 Gboard의 실서비스 사례

- [원문: Federated Learning with Formal Differential Privacy Guarantees](https://research.google/blog/federated-learning-with-formal-differential-privacy-guarantees/)
- 날짜: 2022-02-28 (기사·발표일)
- 원문 발행일: 2022-02-28
- 자료 성격: 공식 연구·제품 발표 · Google Research
- 정리 기준일: 2026-10-16

## 핵심 내용

- 구글은 스페인어 Gboard의 다음 단어 예측 모델에 연합학습과 정형화한 차등 개인정보보호 보장을 함께 적용했다고 발표했다. 단말의 원자료를 중앙에 모으지 않는 방식과 학습 결과 보호를 결합한 사례다.
- 발표는 연합학습만으로 모델의 민감 정보 기억 문제가 자동 해결되지 않는다고 구분한다. 개인정보 최소 수집과 학습 결과의 수학적 보호가 서로 다른 역할을 맡는다.

## 무엇이 달라졌나

개인정보 보호 기술의 논의가 원자료 위치에서 모델 학습 과정과 결과까지 확장됐다. 서비스 운영에서도 정확도뿐 아니라 보호 범위를 설명하는 작업이 중요해졌다.

## 앞으로의 관전 포인트 · 해석

비슷한 방식의 확산 여부는 다른 언어와 기기 환경에서도 효용을 유지하는지에 달려 있다. 사용자 단위 보호와 개별 예제 단위 보호의 차이도 도입 비교 항목이 될 것이다.

## 사회적 쟁점과 한계 · 해석

회사 발표의 특정 모델 보장을 모든 Gboard 기능이나 모든 자료 처리로 확대 해석하면 안 된다. 이용자 설명과 동의, 보존 정책은 기술적 보장과 별도로 확인할 문제다.

[이 주제의 전체 스크랩 목차](/scrap/ai-bigdata-2022-2023/)
