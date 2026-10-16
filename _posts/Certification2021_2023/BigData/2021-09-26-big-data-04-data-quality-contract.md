---
layout: content
title: "[빅데이터분석기사 04] 데이터 품질을 범위·키·참조 관계로 검사하기"
date: 2021-09-26 09:00:00 +0900
categories: [BigDataCertification]
tags: [자격증학습, 빅데이터분석기사]
series: study-certifications-2021-2023
study_track: big-data
study_order: 44
study_unit: 9
permalink: /study/certifications/2021-2023/big-data/04-data-quality-contract/
---

모델 전에 데이터 계약을 검사했다. 결측률만 낮다고 좋은 자료는 아니었다.

> Python 3.9·NumPy 1.20.3·pandas 1.2.5·SciPy 1.6.3·scikit-learn 0.24.2를 이용한 학습용 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

품질 점검에서는 완전성, 유일성, 유효 범위, 일관성, 적시성과 업무 의미를 살핀다. 식별자가 중복되거나 금액 단위가 섞이면 결측이 없어도 분석이 틀어진다. 검사를 통과한 자료에도 측정 오차가 남을 수 있으므로 수집 원천과 변경 이력을 기록한다. 오류를 삭제할지 수정할지는 업무 규칙에 근거한다.

## 예제 문제 · 창작

가상 주문 자료에서 order_id 중복 한 개와 음수 수량 한 개를 찾는다. 음수를 자동 삭제하기 전에 무엇을 확인해야 하는가?

## 풀이와 판단 근거

반품을 음수로 표현하는 규칙인지 입력 오류인지 먼저 확인한다. 코드는 중복 여부와 음수 건수를 탐지할 뿐, 업무 의미를 대신 결정하지 않는다. 중복 판정도 전체 행이 아닌 주문 키 기준인지 명시했다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```python
import pandas as pd

df = pd.DataFrame({"order_id": [1, 1, 2], "quantity": [2, 2, -1]})
print(int(df["order_id"].duplicated().sum()))
print(int((df["quantity"] < 0).sum()))
```
{% endraw %}

## 실행 결과

```text
1
1
```

## 헷갈린 부분과 주의점

검사 규칙과 정제 조치를 한 단계로 숨기지 않는다. 원본과 수정 사유를 남겨 재현성을 확보한다.

## 복습 문제

서로 다른 주문이 금액과 날짜가 같으면 중복일까?

**풀이:** 그 사실만으로는 아니다. 업무상 식별 키와 중복 정의가 필요하다.

## 참고한 문서

[pandas 1.2.5 공식 자료](https://github.com/pandas-dev/pandas/blob/v1.2.5/pandas/core/frame.py#L5283)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/big-data/03-sampling-bias/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/big-data/05-missing-median/' | relative_url }})
