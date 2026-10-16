---
layout: content
title: "[경제신문스크랩][AI·빅데이터] ReAct, 답변 생성에 외부 행동과 관찰을 연결하다"
date: 2022-11-08 12:00:00 +0900
permalink: "/scrap/ai-bigdata-2022-2023/ReAct/"
categories: [경제신문스크랩]
tags: ["AI", "도구 활용·에이전트"]
pin: false
news_id: "historical-ReAct"
source_url: "https://research.google/blog/react-synergizing-reasoning-and-acting-in-language-models/"
source_date: 2022-11-08
reviewed_at: 2026-10-16
excerpt: "구글은 언어모델이 문제를 정리하는 텍스트와 외부 환경에 대한 행동을 번갈아 생성하는 ReAct 연구를 소개했다. 검색 결과 같은 관찰을 다음 행동 결정에 반영하는 구조다."
---

# ReAct, 답변 생성에 외부 행동과 관찰을 연결하다

- [원문: ReAct: Synergizing Reasoning and Acting in Language Models](https://research.google/blog/react-synergizing-reasoning-and-acting-in-language-models/)
- 날짜: 2022-11-08 (기사·발표일)
- 원문 발행일: 2022-11-08
- 자료 성격: 공식 연구·제품 발표 · Google Research
- 정리 기준일: 2026-10-16

## 핵심 내용

- 구글은 언어모델이 문제를 정리하는 텍스트와 외부 환경에 대한 행동을 번갈아 생성하는 ReAct 연구를 소개했다. 검색 결과 같은 관찰을 다음 행동 결정에 반영하는 구조다.
- 단순히 내부 지식으로 설명을 이어 가는 방식과 외부 행동만 생성하는 방식을 결합했다. 발표는 정해진 추론·의사결정 과제의 평가를 제시한 것이며 범용 업무 자동화의 완성을 뜻하지 않는다.

## 무엇이 달라졌나

AI 제품의 가치가 문장을 쓰는 기능에서 외부 정보를 확인하며 작업을 수행하는 흐름으로 넓어졌다. 운영 비용에는 도구 호출과 결과 검증, 실패 복구도 포함될 수 있다.

## 앞으로의 관전 포인트 · 해석

실제 서비스에서는 행동 권한과 중단 조건을 명확히 해야 한다. 외부 응답이 잘못되거나 작업이 길어질 때도 목표를 유지하는지 평가할 필요가 있다.

## 사회적 쟁점과 한계 · 해석

언어모델이 행동을 실행하면 오답이 외부 시스템 변경으로 이어질 수 있다. 실행 전 검토, 최소 권한, 감사 기록을 어떻게 설계하는지가 중요한 사회적·운영적 쟁점이다.

[이 주제의 전체 스크랩 목차](/scrap/ai-bigdata-2022-2023/)
