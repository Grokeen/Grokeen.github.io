---
layout: content
title: "[빅데이터분석기사 06] 중복 제거의 키와 보존 순서"
date: 2021-11-24 09:00:00 +0900
categories: [BigDataCertification]
tags: [자격증학습, 빅데이터분석기사]
series: study-certifications-2021-2023
study_track: big-data
study_order: 46
study_unit: 9
permalink: /study/certifications/2021-2023/big-data/06-deduplication-rule/
---

drop_duplicates를 쓰기 전에 같은 대상을 어떤 행으로 대표할지 정했다. 최신 기록을 남기려면 정렬 기준도 필요했다.

> Python 3.9·NumPy 1.20.3·pandas 1.2.5·SciPy 1.6.3·scikit-learn 0.24.2를 이용한 학습용 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

중복은 전체 행이 같은 경우와 특정 업무 키가 같은 경우를 나눠 정의한다. drop_duplicates의 subset과 keep은 어떤 행을 지울지 바꾸는 중요한 인자다. 변경 이력 자료를 중복이라고 지우면 시간별 상태를 잃는다. 최신 상태 테이블을 만드는 목적과 사건 이력을 분석하는 목적은 구별해야 한다.

## 예제 문제 · 창작

가상 고객 A의 순번 1,2와 B의 순번 1 기록이 있다. 고객별 가장 큰 순번의 행만 남기는 코드를 작성하라.

## 풀이와 판단 근거

순번으로 정렬한 뒤 고객을 기준으로 마지막 행을 남긴다. A는 2, B는 1이 된다. 실제 날짜 동률이나 중복 수집이 있다면 추가 우선순위와 검증 규칙을 정해야 하며 입력 파일의 우연한 순서를 최신이라고 가정하지 않는다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```python
import pandas as pd

df = pd.DataFrame({"customer": ["A", "A", "B"], "version": [1, 2, 1]})
latest = df.sort_values("version").drop_duplicates("customer", keep="last")
print(latest.sort_values("customer")["version"].tolist())
```
{% endraw %}

## 실행 결과

```text
[2, 1]
```

## 헷갈린 부분과 주의점

동일한 고객의 여러 구매를 모두 중복이라 지우지 않는다. 관측 단위에 따라 정상 반복일 수 있다.

## 복습 문제

keep="last"만 쓰면 언제나 가장 최근 날짜를 남길까?

**풀이:** 아니다. 먼저 원하는 날짜·우선순위로 정렬해야 한다.

## 참고한 문서

[pandas 1.2.5 공식 자료](https://github.com/pandas-dev/pandas/blob/v1.2.5/pandas/core/frame.py#L5186)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/big-data/05-missing-median/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/big-data/07-iqr-outlier/' | relative_url }})
