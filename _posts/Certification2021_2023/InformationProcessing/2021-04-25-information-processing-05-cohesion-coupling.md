---
layout: content
title: "[정보처리기사 05] 응집도와 결합도로 모듈 경계 살피기"
date: 2021-04-25 09:00:00 +0900
categories: [InformationProcessingCertification]
tags: [자격증학습, 정보처리기사]
series: study-certifications-2021-2023
study_track: information-processing
study_order: 5
study_unit: 1
permalink: /study/certifications/2021-2023/information-processing/05-cohesion-coupling/
---

한 모듈 안의 책임과 모듈 사이 의존을 구분했다. 작은 파일로 나누었다고 설계 품질이 자동으로 좋아지는 것은 아니었다.

> 2021~2023년 정보처리기사 학습 범위의 개념을 정리한 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

응집도는 모듈 내부 요소들이 하나의 목적에 얼마나 관련되는지, 결합도는 모듈 사이 의존 정도를 보는 개념이다. 일반적으로 높은 응집도와 낮은 결합도를 지향하지만 극단적으로 관계를 없애라는 뜻은 아니다. 공유 전역 상태·불필요한 내부 구조 노출은 변경 영향을 키울 수 있다.

## 예제 문제 · 창작

보고서 출력 모듈이 사용자 테이블의 내부 열 순서를 직접 알고 읽는다. 테이블 열 순서가 바뀌자 출력도 실패했다. 어떤 설계 문제를 먼저 볼까?

## 풀이와 판단 근거

내부 표현에 직접 의존한 결합을 본다. 필요한 의미의 데이터 계약을 제공하면 저장 구조 변경이 출력으로 전파되는 범위를 줄일 수 있다. 출력 모듈에 결제 취소까지 넣었다면 내부 책임의 응집도도 함께 검토한다. 결합과 응집은 서로 다른 축이므로 한 사례에서 둘 다 개선할 수 있다.

## 헷갈린 부분과 주의점

함수 인자가 많다는 이유 하나로 결합도 종류를 확정하지 않는다. 무엇을 전달하고 상대 내부를 얼마나 아는지 확인한다.

## 복습 문제

모든 기능을 한 클래스에 모으면 항상 응집도가 높을까?

**풀이:** 아니다. 목적이 서로 다른 책임이 섞이면 내부 관련성은 오히려 낮아질 수 있다.

## 참고한 문서

[Q-Net 당시 출제기준](https://q-net.or.kr/cst006.do?id=cst00602&gSite=Q&gId=&artlSeq=5205254&brdId=Q006&code=1202)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/information-processing/04-uml-relations/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/information-processing/06-strategy-pattern/' | relative_url }})
