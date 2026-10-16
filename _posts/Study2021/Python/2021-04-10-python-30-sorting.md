---
layout: content
title: "[파이썬 공부 30] sorted와 sort, key로 정렬 기준 정하기"
date: 2021-04-10 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 30
study_unit: 3
permalink: /study/2021/python/30-sorting/
---

원본을 유지하는 정렬과 원본을 바꾸는 정렬을 비교했다. 복합 데이터에서는 key에 기준을 맡기는 방법이 편했다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

`sorted(iterable)`는 정렬한 새 리스트를 반환하고 `list.sort()`는 기존 리스트를 제자리에서 정렬한다. key에는 각 항목에서 비교 기준을 뽑는 함수를 전달한다. reverse=True는 역순이다. 파이썬 정렬은 안정 정렬이어서 기준값이 같으면 기존 순서가 유지된다.

## 따라 해 보기

{% raw %}
```python
words = ["bbb", "a", "cc", "dd"]
ordered = sorted(words, key=len)
print(ordered)
print(words)
result = words.sort(reverse=True)
print(words)
print(result)
```
{% endraw %}

## 실행 결과

```text
['a', 'cc', 'dd', 'bbb']
['bbb', 'a', 'cc', 'dd']
['dd', 'cc', 'bbb', 'a']
None
```

## 코드를 따라 읽기

len을 호출한 결과가 작은 단어부터 정렬된다. 길이가 같은 cc와 dd의 상대 순서는 유지된다. 원본 words는 첫 정렬 뒤에도 그대로지만 sort 이후에는 바뀐다. 반환값 None을 실제 목록과 혼동하지 않는 것이 핵심이었다.

## 헷갈린 부분과 주의점

key=`len()`처럼 함수를 미리 호출하지 않고 key=len으로 함수 자체를 전달한다. 숫자 문자열은 기본 정렬에서 사전식으로 비교된다.

## 복습 문제

[`"10"`, `"2"`]를 수치 크기대로 정렬하는 방법은?

**풀이:** `sorted(["10", "2"], key=int)`로 [`"2"`, `"10"`]을 얻는다. 원래 항목은 문자열로 남는다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/howto/sorting.html)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: 딕셔너리·집합 컴프리헨션 사용하기]({{ '/study/2021/python/29-dict-set-comprehension/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: def로 반복 계산에 이름 붙이기 →]({{ '/study/2021/python/31-functions/' | relative_url }})
