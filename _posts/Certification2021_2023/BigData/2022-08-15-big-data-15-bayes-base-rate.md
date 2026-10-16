---
layout: content
title: "[빅데이터분석기사 15] 조건부확률과 기저율"
date: 2022-08-15 09:00:00 +0900
categories: [BigDataCertification]
tags: [자격증학습, 빅데이터분석기사]
series: study-certifications-2021-2023
study_track: big-data
study_order: 55
study_unit: 10
permalink: /study/certifications/2021-2023/big-data/15-bayes-base-rate/
---

양성 결과를 본 뒤의 확률과 실제 양성에서 검사 양성이 나올 확률을 구별했다. 분모를 전체 양성 결과로 다시 만들었다.

> Python 3.9·NumPy 1.20.3·pandas 1.2.5·SciPy 1.6.3·scikit-learn 0.24.2를 이용한 학습용 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

베이즈 정리는 P(A|B)=P(B|A)P(A)/P(B)로 조건의 방향을 바꿔 계산한다. 기저율이 낮으면 민감도가 높아도 양성 결과 중 거짓 양성 비중이 커질 수 있다. 아래 수치는 개념 확인용 가상 분류기이며 실제 의료 검사나 진단에 대한 수치가 아니다.

## 예제 문제 · 창작

가상 대상 10,000개 중 실제 양성 1%, 민감도 90%, 거짓 양성률 5%다. 분류 양성 중 실제 양성 비율은?

## 풀이와 판단 근거

실제 양성 100개에서 참양성 90개, 실제 음성 9,900개에서 거짓 양성 495개다. 따라서 90/(90+495)=약 15.38%다. 민감도 90%를 양성예측도로 바꾸어 읽으면 안 된다. 표본 오차가 없는 주어진 확률 모형의 기대 빈도로 계산했다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```python
true_positive = 10000 * 0.01 * 0.90
false_positive = 10000 * 0.99 * 0.05
ppv = true_positive / (true_positive + false_positive)
print(f"{ppv:.4f}")
```
{% endraw %}

## 실행 결과

```text
0.1538
```

## 헷갈린 부분과 주의점

P(A|B)와 P(B|A)의 조건 방향을 적어 두고 계산한다. 모집단 비율이 바뀌면 양성예측도도 달라질 수 있다.

## 복습 문제

특이도 95%와 거짓 양성률의 관계는?

**풀이:** 같은 이진 분류 정의에서 거짓 양성률은 1−특이도이므로 5%다.

## 참고한 문서

[개념·API의 원문 자료](https://www.itl.nist.gov/div898/handbook/eda/section3/eda361.htm)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/big-data/14-variance-ddof/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/big-data/16-standard-error/' | relative_url }})
