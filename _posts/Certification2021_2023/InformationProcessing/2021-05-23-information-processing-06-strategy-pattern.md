---
layout: content
title: "[정보처리기사 06] 전략 패턴으로 알고리즘 교체하기"
date: 2021-05-23 09:00:00 +0900
categories: [InformationProcessingCertification]
tags: [자격증학습, 정보처리기사]
series: study-certifications-2021-2023
study_track: information-processing
study_order: 6
study_unit: 2
permalink: /study/certifications/2021-2023/information-processing/06-strategy-pattern/
---

조건문이 늘어나는 계산에서 교체할 책임을 밖으로 뺐다. 패턴 이름보다 변경 지점을 먼저 찾았다.

> 2021~2023년 정보처리기사 학습 범위의 개념을 정리한 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

전략 패턴은 서로 교체 가능한 알고리즘들을 공통 계약으로 분리해 사용하는 객체가 선택하게 한다. 상속만이 유일한 구현은 아니며 함수 전달로도 개념을 표현할 수 있다. 아래는 같은 숫자에 서로 다른 계산을 적용하는 창작 예제다. 실제 할인·세율 정책을 구현한 것은 아니다.

## 예제 문제 · 창작

정가 반환과 10을 빼는 계산을 호출자가 골라 전달한다. 같은 처리 함수를 유지한 채 알고리즘을 바꾸는 구조를 작성하라.

## 풀이와 판단 근거

apply는 전달받은 strategy를 호출한다. 정책을 바꾸어도 공통 호출 틀은 유지된다. 실제로는 입력 검증·음수 결과·정책 버전 등을 더 정의할 수 있다. 전략이 하나뿐이고 바뀔 이유가 적다면 패턴 도입 비용이 더 클 수도 있다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```python
def apply(value, strategy):
    return strategy(value)

print(apply(100, lambda value: value))
print(apply(100, lambda value: value - 10))
```
{% endraw %}

## 실행 결과

```text
100
90
```

## 헷갈린 부분과 주의점

전략과 상태 패턴은 비슷한 구조를 가질 수 있지만 교체 이유와 전이 책임이 다르다. 구현 형태만 보고 이름을 고르지 않는다.

## 복습 문제

정책을 함수로 전달하면 조건 분기가 완전히 사라질까?

**풀이:** 선택 로직은 다른 경계에 남을 수 있다. 목적은 변경 책임을 분리하는 것이다.

## 참고한 문서

[Q-Net 당시 출제기준](https://q-net.or.kr/cst006.do?id=cst00602&gSite=Q&gId=&artlSeq=5205254&brdId=Q006&code=1202)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/information-processing/05-cohesion-coupling/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/information-processing/07-test-levels/' | relative_url }})
