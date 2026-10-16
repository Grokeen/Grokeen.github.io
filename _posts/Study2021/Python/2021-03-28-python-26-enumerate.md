---
layout: content
title: "[파이썬 공부 26] enumerate로 번호와 항목 함께 받기"
date: 2021-03-28 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 26
study_unit: 3
permalink: /study/2021/python/26-enumerate/
---

목록을 출력하면서 번호를 붙이는 코드를 간단히 만들었다. 인덱스 계산과 화면용 번호를 분리할 수 있었다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

`enumerate(iterable, start=0)`는 번호와 항목의 쌍을 차례로 제공한다. 언패킹으로 두 변수에 나누어 받으면 된다. start=1은 사람이 읽는 순번을 붙이기에 편리하지만 실제 리스트 인덱스가 바뀌는 것은 아니다. 항목 자체가 필요할 때 `range(len(...))`보다 읽기 쉽다.

## 따라 해 보기

{% raw %}
```python
topics = ["변수", "조건문", "반복문"]
for number, topic in enumerate(topics, start=1):
    print(f"{number}. {topic}")
print(topics[0])
```
{% endraw %}

## 실행 결과

```text
1. 변수
2. 조건문
3. 반복문
변수
```

## 코드를 따라 읽기

각 반복에서 number에는 순번, topic에는 문자열이 연결된다. 번호를 1부터 표시해도 topics의 첫 위치는 여전히 0이다. 항목을 목록에서 찾기 위해 `topics[number]`를 다시 호출할 필요가 없다. 번호만 보여 줄지 실제 위치가 필요한지 먼저 구분했다.

## 헷갈린 부분과 주의점

start를 1로 설정한 번호를 그대로 리스트 인덱스로 쓰면 첫 항목이 건너뛰어지거나 마지막에 IndexError가 난다.

## 복습 문제

두 번째 항목에 11을 표시하려면 start는 얼마여야 할까?

**풀이:** 10이다. 첫 항목이 10이고 두 번째가 11이 된다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/library/functions.html#enumerate)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: break, continue와 반복문의 else]({{ '/study/2021/python/25-break-continue/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: zip으로 두 목록을 나란히 묶기 →]({{ '/study/2021/python/27-zip/' | relative_url }})
