---
layout: content
title: "[정보처리기사 04] UML 클래스 관계: 일반화·실체화·의존"
date: 2021-03-29 09:00:00 +0900
categories: [InformationProcessingCertification]
tags: [자격증학습, 정보처리기사]
series: study-certifications-2021-2023
study_track: information-processing
study_order: 4
study_unit: 1
permalink: /study/certifications/2021-2023/information-processing/04-uml-relations/
---

다이어그램 화살표를 외우기 전에 두 요소의 관계를 문장으로 적어 보았다.

> 2021~2023년 정보처리기사 학습 범위의 개념을 정리한 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

UML 일반화는 더 구체적인 분류자가 일반적인 분류자의 특성을 물려받는 관계다. 실체화는 명세와 구현 관계를 표현한다. 의존은 한 요소의 변화가 다른 요소에 영향을 줄 수 있음을 나타낸다. 연관의 다중성은 객체 사이 연결 수 제약이며 테이블 행 개수와 직접 동일하지 않다.

## 예제 문제 · 창작

클래스 ReportPrinter가 Printable 인터페이스를 구현한다. 이 관계를 일반화·실체화·의존 중 무엇으로 표시할까?

## 풀이와 판단 근거

실체화다. 인터페이스가 명세한 계약을 클래스가 구현한다. 상위 클래스의 구체화 관계라면 일반화를 검토한다. 같은 두 요소 사이에도 여러 관점의 관계가 있을 수 있으므로 사례에서 강조한 의미를 읽는다. 표기 화살표의 선 종류와 방향은 UML 명세의 해당 다이어그램 규칙을 대조한다.

## 헷갈린 부분과 주의점

인터페이스 구현을 단순히 코드 재사용 상속으로만 설명하지 않는다. 집합·합성의 수명 소유 의미도 모든 언어의 메모리 해제와 일대일 대응시키지 않는다.

## 복습 문제

다중성 0..1과 1은 어떤 차이일까?

**풀이:** 앞은 연결이 없거나 하나, 뒤는 반드시 하나라는 제약을 나타낸다.

## 참고한 문서

[개념·API의 원문 자료](https://www.omg.org/spec/UML/2.5.1/)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/information-processing/03-agile/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/information-processing/05-cohesion-coupling/' | relative_url }})
