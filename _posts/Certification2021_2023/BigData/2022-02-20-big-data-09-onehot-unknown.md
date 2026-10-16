---
layout: content
title: "[빅데이터분석기사 09] 범주형 원핫 인코딩과 새 범주"
date: 2022-02-20 09:00:00 +0900
categories: [BigDataCertification]
tags: [자격증학습, 빅데이터분석기사]
series: study-certifications-2021-2023
study_track: big-data
study_order: 49
study_unit: 10
permalink: /study/certifications/2021-2023/big-data/09-onehot-unknown/
---

문자 범주를 숫자 코드로 바꾸는 방식과 원핫 인코딩의 차이를 비교했다. 학습에 없던 범주 정책도 빠뜨리면 안 됐다.

> Python 3.9·NumPy 1.20.3·pandas 1.2.5·SciPy 1.6.3·scikit-learn 0.24.2를 이용한 학습용 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

원핫 인코딩은 범주마다 별도 지시 변수를 만든다. 범주 A,B,C를 0,1,2로만 넣으면 일부 모델은 순서와 간격이 있다고 해석할 수 있다. 학습 시 정한 열 구조를 평가에도 유지해야 한다. 여기서는 scikit-learn 0.24.2 문법인 sparse=False를 사용한다. 새로운 버전의 sparse_output 인자를 이 시기 예제에 섞지 않는다.

## 예제 문제 · 창작

훈련 범주 A,B로 인코더를 학습했다. handle_unknown="ignore"일 때 A와 새로운 C의 변환 결과는?

## 풀이와 판단 근거

범주 순서는 A,B이며 A는 [1,0], C는 [0,0]으로 변환된다. 모두 0인 행의 의미가 미지 범주인지 기준 범주인지 해석할 때 drop 설정도 확인해야 한다. 미지 범주의 비율을 관찰하는 것도 운영 품질 점검에 도움이 된다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```python
from sklearn.preprocessing import OneHotEncoder

encoder = OneHotEncoder(handle_unknown="ignore", sparse=False)
encoder.fit([["A"], ["B"]])
print(encoder.categories_[0].tolist())
print(encoder.transform([["A"], ["C"]]).astype(int).tolist())
```
{% endraw %}

## 실행 결과

```text
['A', 'B']
[[1, 0], [0, 0]]
```

## 헷갈린 부분과 주의점

훈련·평가에 get_dummies를 따로 적용해 열 이름과 순서가 어긋나지 않게 한다.

## 복습 문제

새 범주를 무시하면 정보 손실은 전혀 없을까?

**풀이:** 해당 범주의 별도 효과를 표현하지 못하므로 손실이 있다. 업무에 맞는 미지 범주 정책을 정한다.

## 참고한 문서

[개념·API의 원문 자료](https://scikit-learn.org/0.24/modules/generated/sklearn.preprocessing.OneHotEncoder.html)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/big-data/08-scaling-train/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/big-data/10-stratified-split/' | relative_url }})
