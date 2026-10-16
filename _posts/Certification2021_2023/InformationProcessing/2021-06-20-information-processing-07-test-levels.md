---
layout: content
title: "[정보처리기사 07] 단위·통합·시스템·인수 검사 범위"
date: 2021-06-20 09:00:00 +0900
categories: [InformationProcessingCertification]
tags: [자격증학습, 정보처리기사]
series: study-certifications-2021-2023
study_track: information-processing
study_order: 7
study_unit: 2
permalink: /study/certifications/2021-2023/information-processing/07-test-levels/
---

검사 이름을 파일 크기보다 무엇을 확인하는지로 구분했다. 외부 연결이 있다고 무조건 인수 검사는 아니었다.

> 2021~2023년 정보처리기사 학습 범위의 개념을 정리한 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

단위 검사는 작은 구성요소의 동작, 통합 검사는 구성요소 사이 상호작용, 시스템 검사는 전체 시스템 요구, 인수 검사는 사용자·사업 목적의 수용 기준을 확인한다. 실제 경계는 프로젝트 정의를 따른다. 검사 수준과 블랙박스·화이트박스 같은 설계 기법은 다른 분류 축이다.

## 예제 문제 · 창작

저장 모듈과 실제 테스트 DB를 연결해 트랜잭션 결과와 조회 계약을 확인했다. 가장 직접적인 검사 수준은?

## 풀이와 판단 근거

통합 검사로 볼 수 있다. 두 구성요소의 연결과 계약을 확인하기 때문이다. 같은 실행이라도 최종 사용자 시나리오와 수용 기준을 확인하도록 설계했다면 다른 수준의 목적도 포함할 수 있다. 외부 의존을 대역으로 바꾼 단위 검사만으로 실제 DB 호환성이 확인되었다고 할 수는 없다.

## 헷갈린 부분과 주의점

검사 수준을 품질의 우열 순위로 외우지 않는다. 각 수준이 발견하기 좋은 오류와 비용·신뢰 범위가 다르다.

## 복습 문제

단위 검사가 모두 통과하면 배포 환경 연결도 보장될까?

**풀이:** 환경·설정·상호작용 문제가 남을 수 있어 필요한 통합·시스템 검사를 수행한다.

## 참고한 문서

[Q-Net 당시 출제기준](https://q-net.or.kr/cst006.do?id=cst00602&gSite=Q&gId=&artlSeq=5205254&brdId=Q006&code=1202)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/information-processing/06-strategy-pattern/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/information-processing/08-boundary-values/' | relative_url }})
