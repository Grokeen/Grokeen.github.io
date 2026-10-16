---
layout: content
title: "[정보처리기사 10] 형상 관리와 변경 추적, Git 역할"
date: 2021-09-11 09:00:00 +0900
categories: [InformationProcessingCertification]
tags: [자격증학습, 정보처리기사]
series: study-certifications-2021-2023
study_track: information-processing
study_order: 10
study_unit: 2
permalink: /study/certifications/2021-2023/information-processing/10-configuration-management/
---

버전 번호만 붙이는 것보다 무엇을 승인하고 어떤 결과를 재현할지 생각했다. 소스 외의 설정과 산출물도 관리 대상이었다.

> 2021~2023년 정보처리기사 학습 범위의 개념을 정리한 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

형상 관리는 항목 식별·변경 통제·상태 기록·감사 등을 통해 제품 구성을 일관되게 관리한다. Git은 버전 관리 도구이며 전체 승인·배포 정책을 자동으로 제공하지는 않는다. 커밋 식별자·의존성·빌드 설정을 연결하면 어떤 소스로 어떤 결과를 만들었는지 추적하기 쉽다.

## 예제 문제 · 창작

같은 소스 커밋으로 빌드했는데 의존성 버전이 달라 결과가 바뀌었다. 소스만 관리했다는 점에서 무엇이 빠졌을까?

## 풀이와 판단 근거

빌드에 영향을 주는 의존성·도구·설정 등의 형상 식별과 재현 정보가 부족하다. 잠금 파일·도구 버전·배포 설정·검증 기록을 함께 관리할 수 있다. 비밀값 자체를 저장소에 올리는 것과 안전하게 참조하는 설정 계약은 구별한다.

## 헷갈린 부분과 주의점

최신 커밋이 곧 운영 배포 버전이라고 단정하지 않는다. 실제 배포된 아티팩트와 커밋을 연결해 확인한다.

## 복습 문제

커밋이 존재하면 코드 검토와 승인이 자동 완료된 것일까?

**풀이:** 버전 기록과 조직의 검토·승인 절차는 별도다.

## 참고한 문서

[개념·API의 원문 자료](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/information-processing/09-coverage-cyclomatic/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/information-processing/11-keys-er/' | relative_url }})
