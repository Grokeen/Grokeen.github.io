---
layout: content
title: "[파이썬 공부 07] and, or, not과 단락 평가"
date: 2021-01-24 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 7
study_unit: 1
permalink: /study/2021/python/07-boolean-logic/
---

조건을 여러 개 묶는 방법을 공부했다. and와 or가 항상 True나 False만 돌려주는 것은 아니라는 점이 새로웠다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

and는 앞의 값이 참일 때 뒤를 평가하고, or는 앞의 값이 거짓일 때 뒤를 평가한다. 이 단락 평가 덕분에 빈 리스트를 먼저 검사하고 나눗셈을 할 수 있다. 빈 문자열·빈 컨테이너·숫자 0·None은 거짓으로 취급한다. not은 참·거짓을 반대로 한 bool을 반환한다.

## 따라 해 보기

{% raw %}
```python
values = []
print(bool(values))
print(bool(values) and sum(values) / len(values) > 10)
name = "" or "방문자"
print(name)
print(not False)
print("메모" and 3)
```
{% endraw %}

## 실행 결과

```text
False
False
방문자
True
3
```

## 코드를 따라 읽기

빈 리스트가 거짓이어서 and 뒤의 나눗셈은 실행하지 않는다. 빈 이름에는 or로 기본 문자열을 선택했다. 마지막 줄은 앞 문자열이 참이므로 뒤 피연산자 3을 그대로 돌려준다. 조건식을 읽을 때는 평가 여부와 최종 반환값을 따로 생각했다.

## 헷갈린 부분과 주의점

0이 유효한 설정값인데 value or 기본값을 쓰면 0까지 기본값으로 대체된다. None만 빠진 값으로 볼 때는 is None으로 명시한다.

## 복습 문제

`""` and 5는 무엇을 반환할까?

**풀이:** 빈 문자열이다. 첫 값이 거짓이므로 뒤의 5를 평가할 필요 없이 첫 값을 반환한다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/library/stdtypes.html#boolean-operations-and-or-not)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: 비교 연산과 범위 조건]({{ '/study/2021/python/06-comparisons/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: if문과 들여쓰기로 실행 구역 나누기 →]({{ '/study/2021/python/08-if-indent/' | relative_url }})
