---
layout: content
title: "[파이썬 공부 13] f-string으로 숫자와 단위를 읽기 좋게 출력하기"
date: 2021-02-13 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 13
study_unit: 2
permalink: /study/2021/python/13-f-strings/
---

값을 문자열에 넣는 코드를 f-string으로 바꿔 보았다. 출력 모양을 정하는 일과 실제 숫자를 계산하는 일을 나누어 이해했다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

문자열 앞에 f를 붙이면 중괄호 안의 식을 평가해 문자열에 넣는다. 콜론 뒤에는 자릿수와 정렬 같은 형식을 지정한다. .1f는 소수점 한 자리, 03d는 정수를 세 자리로 맞추며 남는 앞자리를 0으로 채운다. 형식화는 표시 방식만 바꾸며 원래 숫자를 반올림해 저장하지 않는다.

## 따라 해 보기

{% raw %}
```python
temperature = 23.456
count = 7
print(f"현재 온도: {temperature:.1f}도")
print(f"측정 번호: {count:03d}")
print(f"합계: {12000:,}원")
print(temperature)
```
{% endraw %}

## 실행 결과

```text
현재 온도: 23.5도
측정 번호: 007
합계: 12,000원
23.456
```

## 코드를 따라 읽기

첫 줄의 출력은 소수점 한 자리로 반올림해 표시한다. count는 정수인 채로 007처럼 보인다. 쉼표 지정은 세 자리 단위 구분자를 넣는다. 마지막 출력에서 temperature가 23.456으로 유지되는 것을 확인할 수 있다.

## 헷갈린 부분과 주의점

중괄호 자체를 출력하려면 여는 중괄호와 닫는 중괄호를 각각 두 번 적는다. f-string에 사용자 입력을 코드처럼 실행하는 eval을 섞을 필요는 없다.

## 복습 문제

x = 3.14159를 소수점 두 자리로 표시하는 식은?

**풀이:** f`"{x:.2f}"`이고 결과 문자열은 3.14다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/reference/lexical_analysis.html#f-strings)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: strip, split, join으로 텍스트 정리하기]({{ '/study/2021/python/12-string-methods/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: input으로 받은 문자열을 숫자로 변환하기 →]({{ '/study/2021/python/14-input-conversion/' | relative_url }})
