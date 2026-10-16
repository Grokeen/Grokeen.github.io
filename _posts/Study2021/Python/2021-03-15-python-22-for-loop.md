---
layout: content
title: "[파이썬 공부 22] for문으로 항목을 하나씩 처리하기"
date: 2021-03-15 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 22
study_unit: 2
permalink: /study/2021/python/22-for-loop/
---

같은 코드를 복사하지 않고 목록 전체에 적용해 보았다. for문은 항목을 꺼내 처리하는 흐름으로 읽었다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

for 변수 in 반복가능객체: 형식으로 각 항목을 차례대로 변수에 연결한다. 매 반복마다 들여쓴 블록이 실행된다. 합계를 구하려면 반복 전에 누적값을 초기화하고, 반복 안에서는 현재 항목을 더한다. 출력 위치가 블록 안인지 밖인지에 따라 중간값 또는 최종값이 보인다.

## 따라 해 보기

{% raw %}
```python
readings = [20, 22, 24]
total = 0
for value in readings:
    total += value
    print("측정", value)
print("합계", total)
print("평균", total / len(readings))
```
{% endraw %}

## 실행 결과

```text
측정 20
측정 22
측정 24
합계 66
평균 22.0
```

## 코드를 따라 읽기

value는 20, 22, 24로 바뀌고 total은 이전 합계를 유지한다. 합계와 평균 출력은 반복 바깥이라 한 번만 실행된다. 문자열이나 튜플도 같은 형태로 순회할 수 있다. 목록의 위치가 필요하지 않으면 인덱스 계산 없이 항목을 바로 읽는 편이 간단했다.

## 헷갈린 부분과 주의점

total = 0을 반복 안에 넣으면 매번 초기화되어 마지막 값만 남는다. 평균을 구하기 전에 빈 목록인지도 확인해야 한다.

## 복습 문제

`print(total)`을 반복 안으로 옮기면 어떤 값들이 보일까?

**풀이:** 20, 42, 66이라는 누적 중간값이 차례로 보인다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/reference/compound_stmts.html#the-for-statement)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: 집합으로 중복 제거와 공통 항목 찾기]({{ '/study/2021/python/21-sets/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: range의 시작값, 종료값, 간격 →]({{ '/study/2021/python/23-range/' | relative_url }})
