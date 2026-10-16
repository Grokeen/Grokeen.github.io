---
layout: content
title: "[빅데이터분석기사 30] ROC-AUC에는 순위 점수를 전달하기"
date: 2023-10-29 09:00:00 +0900
categories: [BigDataCertification]
tags: [자격증학습, 빅데이터분석기사]
series: study-certifications-2021-2023
study_track: big-data
study_order: 70
study_unit: 12
permalink: /study/certifications/2021-2023/big-data/30-roc-auc-scores/
---

AUC를 계산할 때 0·1 예측값 대신 양성 점수를 사용했다. 임계값 하나의 정확도와 여러 경계의 순위 평가는 달랐다.

> Python 3.9·NumPy 1.20.3·pandas 1.2.5·SciPy 1.6.3·scikit-learn 0.24.2를 이용한 학습용 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

ROC는 거짓 양성률과 참양성률을 임계값별로 비교한다. ROC-AUC는 양성과 음성의 순위 분리 정도를 요약하며 단조 변환된 점수에 대해 순위가 같으면 유지된다. 양성 확률 열을 확인해야 하고 두 클래스가 모두 있어야 정의된다. 심한 불균형에서는 정밀도-재현율 곡선과 업무 비용도 함께 본다.

## 예제 문제 · 창작

실제 [0,0,1,1], 양성 점수 [0.1,0.4,0.35,0.8]의 AUC를 구하라.

## 풀이와 판단 근거

양성·음성 쌍 네 개 중 양성 점수가 더 큰 쌍은 세 개이므로 AUC는 0.75다. 이 점수가 확률처럼 표현되어도 보정 품질을 의미하지 않는다. 확정 라벨만 넣으면 원래 점수가 가진 순위 정보를 잃는다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```python
from sklearn.metrics import roc_auc_score

y = [0, 0, 1, 1]
scores = [0.1, 0.4, 0.35, 0.8]
print(f"{roc_auc_score(y, scores):.3f}")
```
{% endraw %}

## 실행 결과

```text
0.750
```

## 헷갈린 부분과 주의점

AUC가 높으면 특정 운영 임계값의 정밀도까지 자동으로 좋다고 보지 않는다.

## 복습 문제

모든 점수에 10을 더하면 순위 AUC는 달라질까?

**풀이:** 순위와 동률 관계가 같으므로 변하지 않는다. 다만 더한 값은 확률 해석이 아니다.

## 참고한 문서

[개념·API의 원문 자료](https://scikit-learn.org/0.24/modules/generated/sklearn.metrics.roc_auc_score.html)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/big-data/29-confusion-metrics/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/big-data/31-mae-rmse/' | relative_url }})
