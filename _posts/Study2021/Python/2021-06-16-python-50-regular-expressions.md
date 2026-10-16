---
layout: content
title: "[파이썬 공부 50] 정규식으로 일정한 형식의 텍스트 추출하기"
date: 2021-06-16 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 50
study_unit: 5
permalink: /study/2021/python/50-regular-expressions/
---

온도 로그에서 숫자 부분만 꺼내 보았다. 정규식이 맞는 형식을 찾는 도구이지 모든 입력을 검증하는 만능 도구는 아니었다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

re.search는 문자열에서 패턴이 처음 일치하는 구간을 찾고, 결과가 없으면 None을 반환한다. 괄호는 캡처 그룹을 만들고 `group(1)`로 첫 그룹을 읽는다. raw 문자열을 쓰면 정규식의 역슬래시 표현을 파이썬 문자열 이스케이프와 덜 혼동한다.

## 따라 해 보기

{% raw %}
```python
import re

line = "temperature=-3.5 C"
match = re.search(r"temperature=(-?\d+(?:\.\d+)?)", line)
if match:
    value = float(match.group(1))
    print(value)
print(bool(re.fullmatch(r"\d{4}-\d{2}-\d{2}", "2021-02-03")))
```
{% endraw %}

## 실행 결과

```text
-3.5
True
```

## 코드를 따라 읽기

-?는 선택적인 음수 부호, 숫자 반복과 선택적인 소수 부분은 -3.5를 캡처한다. fullmatch는 문자열 전체가 형식에 맞는지 본다. 마지막 식은 날짜 모양만 확인하므로 실제 존재하는 날짜인지는 datetime 등으로 별도 검증해야 한다.

## 헷갈린 부분과 주의점

search가 None인데 group을 호출하면 AttributeError가 난다. 임의의 복잡한 정규식은 입력에 따라 느려질 수 있어 형식을 단순하게 유지한다.

## 복습 문제

날짜 패턴이 2021-99-99에도 맞을 수 있는 이유는?

**풀이:** 숫자 개수와 구분자만 검사하고 달력의 유효 범위를 검사하지 않기 때문이다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/library/re.html)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: 시간 간격은 monotonic으로 측정하기]({{ '/study/2021/python/49-monotonic-time/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: Counter로 항목 빈도와 상위 항목 구하기 →]({{ '/study/2021/python/51-counter/' | relative_url }})
