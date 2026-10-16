---
layout: content
title: "[정보처리기사 09] 문장·분기 커버리지와 순환 복잡도"
date: 2021-08-14 09:00:00 +0900
categories: [InformationProcessingCertification]
tags: [자격증학습, 정보처리기사]
series: study-certifications-2021-2023
study_track: information-processing
study_order: 9
study_unit: 2
permalink: /study/certifications/2021-2023/information-processing/09-coverage-cyclomatic/
---

코드 한 번을 실행한 것과 모든 분기 결과를 확인한 것을 구별했다. 독립 경로 수의 계산 전제도 확인했다.

> 2021~2023년 정보처리기사 학습 범위의 개념을 정리한 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

문장 커버리지는 실행된 문장 비율, 분기 커버리지는 결정 결과의 실행 비율을 본다. 단일 연결 제어 흐름 그래프의 순환 복잡도는 E-N+2로 계산할 수 있다. 단순 이진 분기만 있는 경우 결정 수+1 규칙도 쓸 수 있다. 높은 커버리지가 요구사항의 올바름을 모두 증명하지는 않는다.

## 예제 문제 · 창작

단일 연결 그래프에 간선 E=7개, 노드 N=6개가 있다. 순환 복잡도를 계산하라.

## 풀이와 판단 근거

7-6+2=3이다. 독립 경로의 구조적 수를 나타내는 지표이며 모든 입력 조합이나 실행 가능한 경로를 직접 세는 값은 아니다. 복합 조건의 단락 평가를 그래프에서 어떻게 모델링했는지도 일관되게 정해야 한다. 커버리지 종류를 바꾸어 같은 백분율로 비교하지 않는다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```python
edges = 7
nodes = 6
components = 1
print(edges - nodes + 2 * components)
```
{% endraw %}

## 실행 결과

```text
3
```

## 헷갈린 부분과 주의점

루프 때문에 가능한 실행 경로가 무한할 수 있어도 순환 복잡도는 유한할 수 있다. 문장 100%와 분기 100%를 같다고 외우지 않는다.

## 복습 문제

한 if의 참 경로만 실행해 모든 문장이 실행되면 거짓 분기도 확인된 것일까?

**풀이:** 아니다. 분기 결과가 실제로 실행되었는지 별도로 확인해야 한다.

## 참고한 문서

[Q-Net 당시 출제기준](https://q-net.or.kr/cst006.do?id=cst00602&gSite=Q&gId=&artlSeq=5205254&brdId=Q006&code=1202)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/information-processing/08-boundary-values/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/information-processing/10-configuration-management/' | relative_url }})
