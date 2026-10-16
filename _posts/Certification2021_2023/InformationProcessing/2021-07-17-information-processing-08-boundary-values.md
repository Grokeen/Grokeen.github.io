---
layout: content
title: "[정보처리기사 08] 동등 분할과 경계값 분석"
date: 2021-07-17 09:00:00 +0900
categories: [InformationProcessingCertification]
tags: [자격증학습, 정보처리기사]
series: study-certifications-2021-2023
study_track: information-processing
study_order: 8
study_unit: 2
permalink: /study/certifications/2021-2023/information-processing/08-boundary-values/
---

입력 전체를 무작정 늘리기보다 의미가 같은 구간과 경계를 나누었다. 포함·제외 조건을 먼저 읽었다.

> 2021~2023년 정보처리기사 학습 범위의 개념을 정리한 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

동등 분할은 비슷하게 처리될 입력을 유효·무효 등 구간으로 나누어 대표값을 선택한다. 경계값 분석은 구간의 시작·끝과 바로 옆 값을 집중 검사한다. 어떤 값 집합을 필수로 요구하는지는 적용 기법과 문제의 정의를 따른다. 모든 결함이 경계에만 있다는 뜻은 아니다.

## 예제 문제 · 창작

정수 입력을 1 이상 100 이하만 허용한다. 최소·최대 경계와 바로 밖 값을 포함해 검사할 네 값을 적어라.

## 풀이와 판단 근거

0, 1, 100, 101이다. 1과 100은 유효 경계, 0과 101은 바로 밖의 무효 값이다. 정수 가정이 없으면 바로 옆 값의 정의가 달라지므로 입력 자료형도 확인한다. 기법에 따라 2와 99 같은 경계 안쪽 값이나 중앙값을 추가할 수 있다.

## 헷갈린 부분과 주의점

최대값 100을 무효로 오해하지 않는다. >=와 >가 요구사항에서 어떻게 쓰였는지 확인한다.

## 복습 문제

입력이 문자열 "1"일 때도 같은 검사만으로 충분할까?

**풀이:** 자료형 변환·공백·형식 오류 검사가 별도로 필요할 수 있다.

## 참고한 문서

[Q-Net 당시 출제기준](https://q-net.or.kr/cst006.do?id=cst00602&gSite=Q&gId=&artlSeq=5205254&brdId=Q006&code=1202)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/information-processing/07-test-levels/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/information-processing/09-coverage-cyclomatic/' | relative_url }})
