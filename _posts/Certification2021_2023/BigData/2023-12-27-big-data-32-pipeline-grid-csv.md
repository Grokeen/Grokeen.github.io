---
layout: content
title: "[빅데이터분석기사 32] 파이프라인 탐색과 제출 CSV 점검"
date: 2023-12-27 09:00:00 +0900
categories: [BigDataCertification]
tags: [자격증학습, 빅데이터분석기사]
series: study-certifications-2021-2023
study_track: big-data
study_order: 72
study_unit: 12
permalink: /study/certifications/2021-2023/big-data/32-pipeline-grid-csv/
---

학습·평가·파일 저장까지 연결해 작은 실습을 마쳤다. 제출 형식의 인덱스 열 하나도 결과를 바꿀 수 있었다.

> Python 3.9·NumPy 1.20.3·pandas 1.2.5·SciPy 1.6.3·scikit-learn 0.24.2를 이용한 학습용 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

Pipeline은 대치·스케일링·모델을 순서대로 묶어 교차 검증에서 각 훈련 폴드에만 fit하도록 돕는다. GridSearchCV는 지정한 후보와 검증 방식으로 모델을 선택하며 최종 평가 자료와 역할을 분리한다. 제출 파일은 문제에서 요구한 행 순서, ID, 예측값 종류와 열 이름을 따라야 한다. 여기서는 실제 시험 형식이 아닌 가상 형식을 사용한다.

## 예제 문제 · 창작

합성 연속 목표 y=2x+1을 Ridge 파이프라인으로 학습한다. alpha=0,1을 3폴드 검증하고, 가상 ID 101·102의 예측을 CSV로 저장 후 다시 읽어 검증하라.

## 풀이와 판단 근거

이 합성 직선에서는 alpha=0이 선택되고 x=10,11의 예측은 21,23이다. StringIO를 사용해 개인 파일을 만들지 않는다. index=False로 저장하며 읽은 열 이름을 확인한다. 이 예제의 검증은 API 흐름 연습으로 현실의 성능 보증이나 실제 시험 정답 파일이 아니다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```python
from io import StringIO
import numpy as np
import pandas as pd
from sklearn.impute import SimpleImputer
from sklearn.linear_model import Ridge
from sklearn.model_selection import GridSearchCV, KFold
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

X = np.arange(9, dtype=float).reshape(-1, 1)
y = 2 * X.ravel() + 1
pipe = Pipeline([("fill", SimpleImputer(strategy="median")),
                 ("scale", StandardScaler()), ("model", Ridge())])
search = GridSearchCV(
    pipe, {"model__alpha": [0.0, 1.0]},
    cv=KFold(n_splits=3, shuffle=True, random_state=4),
    scoring="neg_mean_squared_error", n_jobs=1
).fit(X, y)
pred = search.predict([[10.0], [11.0]])
submission = pd.DataFrame({"id": [101, 102], "prediction": pred.round(1)})
buffer = StringIO()
submission.to_csv(buffer, index=False)
buffer.seek(0)
loaded = pd.read_csv(buffer)
print(search.best_params_)
print(loaded.columns.tolist())
print(loaded["prediction"].tolist())
```
{% endraw %}

## 실행 결과

```text
{'model__alpha': 0.0}
['id', 'prediction']
[21.0, 23.0]
```

## 헷갈린 부분과 주의점

최종 평가 자료로 하이퍼파라미터를 고르거나 제출 행을 임의 정렬하지 않는다. ID가 입력 특성인지 식별자인지도 구분한다.

## 복습 문제

파이프라인 안의 Ridge alpha를 탐색하는 매개변수 이름은?

**풀이:** 단계 이름이 model이면 model__alpha처럼 이중 밑줄로 연결한다.

## 참고한 문서

[개념·API의 원문 자료](https://scikit-learn.org/0.24/modules/generated/sklearn.model_selection.GridSearchCV.html) · [추가 공식 자료 1](https://github.com/pandas-dev/pandas/blob/v1.2.5/pandas/core/generic.py#L3206)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/big-data/31-mae-rmse/' | relative_url }})
