---
layout: content
title: "[파이썬 공부 11] 인덱스와 슬라이싱, 끝 위치는 포함하지 않기"
date: 2021-02-06 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 11
study_unit: 1
permalink: /study/2021/python/11-slicing/
---

문자열 일부를 잘라 보면서 시작·끝 인덱스의 규칙을 정리했다. 끝 위치를 포함하지 않는다는 규칙이 리스트에도 이어진다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

인덱스는 0부터 시작하며 음수 -1은 마지막 항목을 가리킨다. `seq[start:stop:step]`은 start부터 stop 직전까지 step 간격으로 고른다. 생략한 경계는 방향에 맞는 기본값을 사용한다. 문자열은 변경할 수 없으므로 일부를 고쳐야 할 때 새 문자열을 만들어야 한다.

## 따라 해 보기

{% raw %}
```python
word = "python"
print(word[0], word[-1])
print(word[1:4])
print(word[:2])
print(word[::2])
print(word[::-1])
print(word[20:30])
```
{% endraw %}

## 실행 결과

```text
p n
yth
py
pto
nohtyp

```

## 코드를 따라 읽기

1:4는 위치 1·2·3의 yth다. ::2는 두 칸 간격, ::-1은 뒤에서 앞으로 읽는다. 범위를 벗어난 슬라이스는 여기서 빈 문자열을 돌려주지만 `word[20]`처럼 단일 인덱스로 없는 위치를 읽으면 IndexError가 난다.

## 헷갈린 부분과 주의점

슬라이스의 step에는 0을 사용할 수 없다. 한글과 이모지의 화면상 한 글자는 여러 코드 포인트일 수도 있어 단순 슬라이싱이 화면 글자 경계를 보장하지 않는다.

## 복습 문제

`word[-3:]`은 무엇일까?

**풀이:** hon이다. 끝에서 세 번째 위치부터 문자열 끝까지 고른다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/library/stdtypes.html#common-sequence-operations)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: 문자열과 이스케이프 문자]({{ '/study/2021/python/10-strings-escapes/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: strip, split, join으로 텍스트 정리하기 →]({{ '/study/2021/python/12-string-methods/' | relative_url }})
