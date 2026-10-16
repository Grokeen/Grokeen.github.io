---
layout: content
title: "[파이썬 공부 05] 몫과 나머지로 묶음 수 계산하기"
date: 2021-01-17 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 5
study_unit: 1
permalink: /study/2021/python/05-division-modulo/
---

전체 개수를 일정한 크기로 나눌 때 //와 %가 잘 맞았다. 페이지 수나 시간을 계산하는 작은 예제로 정리했다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

//는 나눗셈 결과의 바닥값을, %는 나머지를 구한다. 양수에서는 보통 생각하는 몫과 나머지와 같다. `divmod(a, b)`는 두 결과를 튜플로 함께 돌려준다. 음수가 들어가면 //는 0 방향으로 버리는 것이 아니라 작은 정수 쪽으로 내림한다는 차이를 기억해야 한다.

## 따라 해 보기

{% raw %}
```python
seconds = 125
minutes, remaining = divmod(seconds, 60)
print(minutes, remaining)
items = 17
page_size = 5
pages = (items + page_size - 1) // page_size
print(pages)
print(-7 // 3, -7 % 3)
```
{% endraw %}

## 실행 결과

```text
2 5
4
-3 2
```

## 코드를 따라 읽기

125초를 60으로 나누면 2분 5초다. 양수인 개수에 page_size - 1을 더해 나누면 마지막에 덜 찬 페이지까지 계산한다. 음수 예제에서는 -7 = 3 × (-3) + 2가 성립한다. 나머지는 나누는 수가 양수일 때 0 이상이 된다.

## 헷갈린 부분과 주의점

0으로 나누면 ZeroDivisionError가 난다. 페이지 계산 공식은 items가 0 이상이고 page_size가 양수라는 전제가 있다.

## 복습 문제

물건 20개를 한 페이지에 5개씩 보여 주면 페이지 수는?

**풀이:** 4페이지다. 딱 나누어떨어질 때는 불필요한 페이지가 추가되지 않는다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/library/functions.html#divmod)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: 산술 연산과 계산 순서]({{ '/study/2021/python/04-arithmetic/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: 비교 연산과 범위 조건 →]({{ '/study/2021/python/06-comparisons/' | relative_url }})
