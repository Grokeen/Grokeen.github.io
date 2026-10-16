---
layout: content
title: "[파이썬 공부 10] 문자열과 이스케이프 문자"
date: 2021-02-03 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 10
study_unit: 1
permalink: /study/2021/python/10-strings-escapes/
---

줄바꿈과 따옴표를 문자열 안에 표현하는 연습을 했다. 소스 코드에 보이는 글자 수와 실제 문자열 길이가 다를 수 있었다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

문자열은 작은따옴표 또는 큰따옴표로 감싼다. `\n`은 줄바꿈, `\t`는 탭, `\\`는 역슬래시 하나를 뜻한다. raw 문자열은 역슬래시의 이스케이프 처리를 대부분 하지 않아 정규식처럼 역슬래시가 많은 표현에 편리하다. `repr()`은 줄바꿈 등을 눈에 보이는 표현으로 보여 준다.

## 따라 해 보기

{% raw %}
```python
message = "첫째 줄\n둘째 줄"
print(message)
print(repr(message))
folder = r"C:\notes"
print(folder)
print(len("가나"))
```
{% endraw %}

## 실행 결과

```text
첫째 줄
둘째 줄
'첫째 줄\n둘째 줄'
C:\notes
2
```

## 코드를 따라 읽기

`print(message)`는 실제 두 줄로 표시하지만 `repr(message)`는 줄바꿈을 \n 형태로 드러낸다. raw 문자열의 경로는 예시 문자열일 뿐 파일을 만들지는 않는다. len은 이 예제에서 한글 코드 포인트 두 개를 센다. 바이트 길이와는 다르다는 점도 메모했다.

## 헷갈린 부분과 주의점

raw 문자열도 끝에 역슬래시 하나만 놓아 닫는 따옴표를 피하게 만들 수는 없다. 복잡한 경로 조합은 뒤에서 pathlib로 처리한다.

## 복습 문제

`len("A\nB")`의 값은?

**풀이:** 3이다. A 한 글자, 줄바꿈 한 문자, B 한 글자로 센다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/reference/lexical_analysis.html#string-and-bytes-literals)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: elif로 겹치지 않는 여러 구간 만들기]({{ '/study/2021/python/09-elif/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: 인덱스와 슬라이싱, 끝 위치는 포함하지 않기 →]({{ '/study/2021/python/11-slicing/' | relative_url }})
