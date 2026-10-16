---
layout: content
title: "[빅데이터분석기사 29] 혼동행렬에서 정밀도·재현율·F1 계산"
date: 2023-09-30 09:00:00 +0900
categories: [BigDataCertification]
tags: [자격증학습, 빅데이터분석기사]
series: study-certifications-2021-2023
study_track: big-data
study_order: 69
study_unit: 12
permalink: /study/certifications/2021-2023/big-data/29-confusion-metrics/
---

정확도만으로 놓치는 오류를 표로 세었다. 양성 클래스를 먼저 고정해야 분모가 흔들리지 않았다.

> Python 3.9·NumPy 1.20.3·pandas 1.2.5·SciPy 1.6.3·scikit-learn 0.24.2를 이용한 학습용 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

이진 분류에서 정밀도는 TP/(TP+FP), 재현율은 TP/(TP+FN), F1은 둘의 조화평균이다. scikit-learn confusion_matrix의 기본 행은 실제, 열은 예측 클래스 순서다. 불균형 자료에서 다수 클래스만 예측해도 정확도가 높을 수 있다. 거짓 양성과 거짓 음성의 비용을 업무 목적에 맞게 비교한다.

## 예제 문제 · 창작

실제 [1,1,1,0,0,0], 예측 [1,1,0,1,0,0]에서 클래스 1의 정밀도·재현율·F1은?

## 풀이와 판단 근거

TP=2, FP=1, FN=1, TN=2이므로 세 지표 모두 2/3이다. labels=[0,1]로 행렬 순서를 명시했다. 분모가 0일 때의 처리도 보고 규칙으로 정해야 하며 이 예제는 그 상황이 아니다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```python
from sklearn.metrics import confusion_matrix, precision_score, recall_score, f1_score

y = [1, 1, 1, 0, 0, 0]
pred = [1, 1, 0, 1, 0, 0]
print(confusion_matrix(y, pred, labels=[0, 1]).tolist())
for metric in [precision_score, recall_score, f1_score]:
    print(f"{metric(y, pred):.3f}")
```
{% endraw %}

## 실행 결과

```text
[[2, 1], [1, 2]]
0.667
0.667
0.667
```

## 헷갈린 부분과 주의점

문제의 양성이 어떤 클래스인지 확인하지 않고 행렬 위치만 외우지 않는다.

## 복습 문제

재현율을 높이면 정밀도도 항상 높아질까?

**풀이:** 아니다. 임계값 변경 등에서 두 지표 사이 절충이 생길 수 있다.

## 참고한 문서

[개념·API의 원문 자료](https://scikit-learn.org/0.24/modules/generated/sklearn.metrics.confusion_matrix.html)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/big-data/28-pca-variance/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/big-data/30-roc-auc-scores/' | relative_url }})
