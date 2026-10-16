---
layout: content
title: "[경제신문스크랩][AI·빅데이터] 수집 시간 클러스터링, 시계열 데이터 배치의 자동화"
date: 2022-11-18 12:00:00 +0900
permalink: "/scrap/ai-bigdata-2022-2023/Ingestion-Time-Clustering/"
categories: [경제신문스크랩]
tags: ["AI", "빅데이터·저장 최적화"]
pin: false
news_id: "historical-Ingestion-Time-Clustering"
source_url: "https://www.databricks.com/blog/2022/11/18/introducing-ingestion-time-clustering-dbr-112.html"
source_date: 2022-11-18
reviewed_at: 2026-10-16
excerpt: "Databricks가 SQL과 Runtime 11.2의 수집 시간 클러스터링을 소개했다. 데이터가 들어온 순서를 활용해 파일 배치를 개선하는 접근이다."
---

# 수집 시간 클러스터링, 시계열 데이터 배치의 자동화

- [원문: Introducing Ingestion Time Clustering with Databricks SQL and Databricks Runtime 11.2](https://www.databricks.com/blog/2022/11/18/introducing-ingestion-time-clustering-dbr-112.html)
- 날짜: 2022-11-18 (기사·발표일)
- 원문 발행일: 2022-11-18
- 자료 성격: 공식 연구·제품 발표 · Databricks
- 정리 기준일: 2026-10-16

## 핵심 내용

- Databricks가 SQL과 Runtime 11.2의 수집 시간 클러스터링을 소개했다. 데이터가 들어온 순서를 활용해 파일 배치를 개선하는 접근이다.
- 파티션·Z-order를 직접 설계하는 부담을 줄이고 시간 조건 쿼리의 불필요한 읽기를 줄이려 했다. 회사의 성능 수치를 모든 데이터에 일반화할 수는 없다.

## 무엇이 달라졌나

분석 성능 개선이 쿼리 작성뿐 아니라 쓰기 시점의 데이터 배치로 이동했다.

## 앞으로의 관전 포인트 · 해석

순차 수집되는 사실 테이블에 유용할 수 있다. 늦게 도착한 데이터나 시간 이외의 검색 조건에서는 별도 검증이 필요하다.

## 사회적 쟁점과 한계 · 해석

입력 시간과 사건 발생 시간을 혼동하면 결과 해석이 틀릴 수 있다. 최적화가 원본 데이터의 품질이나 보존 정책을 해결하지는 않는다.

[이 주제의 전체 스크랩 목차](/scrap/ai-bigdata-2022-2023/)
