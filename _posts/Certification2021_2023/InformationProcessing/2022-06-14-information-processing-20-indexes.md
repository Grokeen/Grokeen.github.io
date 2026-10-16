---
layout: content
title: "[정보처리기사 20] 인덱스의 조회 이점과 변경 비용"
date: 2022-06-14 09:00:00 +0900
categories: [InformationProcessingCertification]
tags: [자격증학습, 정보처리기사]
series: study-certifications-2021-2023
study_track: information-processing
study_order: 20
study_unit: 4
permalink: /study/certifications/2021-2023/information-processing/20-indexes/
---

인덱스를 많게 만들기보다 어떤 쿼리 조건과 정렬에 쓰이는지 생각했다. 생성되었다는 사실과 사용되었다는 사실도 다르다.

> 2021~2023년 정보처리기사 학습 범위의 개념을 정리한 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

인덱스는 조회를 돕는 별도 접근 구조이며 저장 공간과 INSERT·UPDATE·DELETE 유지 비용이 든다. 복합 B-tree 인덱스는 열 순서와 조건 종류가 활용에 영향을 준다. 선택도·통계·테이블 크기 등으로 실행 계획이 달라질 수 있다. 무조건 전체 스캔보다 빠르다고 단정하지 않는다.

## 예제 문제 · 창작

email 조회가 많은 표에 인덱스를 만들었지만 대량 입력 시간이 늘었다. 이유를 설명하고 인덱스가 실제 조회에 쓰이는지 확인하는 방법을 적어라.

## 풀이와 판단 근거

입력마다 표와 인덱스 구조를 함께 갱신하는 비용이 생길 수 있다. DBMS의 실행 계획 도구로 해당 쿼리의 접근 방식과 추정·실제 비용을 살핀다. 생성 목록만 확인한 것은 사용 검증과 다르다. 테스트 데이터 크기와 운영 분포가 다른지도 검토한다.

## 헷갈린 부분과 주의점

고유 인덱스와 일반 인덱스의 제약 의미를 구분한다. 최적화 근거 없이 인덱스를 추가·삭제하면 다른 쿼리에 영향을 줄 수 있다.

## 복습 문제

인덱스가 있어도 옵티마이저가 전체 스캔을 고를 수 있을까?

**풀이:** 가능하다. 결과 범위나 비용 추정 등에 따라 전체 스캔이 더 적절할 수 있다.

## 참고한 문서

[개념·API의 원문 자료](https://www.postgresql.org/docs/13/indexes.html)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/information-processing/19-acid-rollback/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/information-processing/21-c-pointers/' | relative_url }})
