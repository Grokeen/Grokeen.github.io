---
layout: content
title: "[파이썬 공부 02] 변수와 대입, 이름이 값을 가리키는 방식"
date: 2021-01-07 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 2
study_unit: 1
permalink: /study/2021/python/02-variables/
---

값을 반복해서 적기보다 의미 있는 이름에 붙여 보았다. =를 수학의 등호처럼 읽던 습관부터 바꾸기로 했다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

대입문은 오른쪽 식을 먼저 계산하고 그 결과를 왼쪽 이름에 연결한다. 같은 이름에 다른 값을 대입하면 이후에는 새 값을 참조한다. 변수 이름에는 공백을 넣을 수 없고 숫자로 시작할 수도 없다. count처럼 뜻을 알 수 있는 이름을 사용하면 계산 과정을 따라가기 쉽다.

## 따라 해 보기

{% raw %}
```python
count = 3
previous = count
count = count + 2
print(previous, count)
count += 1
print(count)
```
{% endraw %}

## 실행 결과

```text
3 5
6
```

## 코드를 따라 읽기

previous에는 그 시점의 정수 3을 연결했다. count + 2가 계산된 뒤 count가 5를 가리켜도 previous가 함께 5로 바뀌지는 않는다. +=는 값을 더한 뒤 다시 대입하는 형태다. 나중에 리스트처럼 변경 가능한 객체를 배우면 이름과 객체의 관계를 다시 비교할 예정이다.

## 헷갈린 부분과 주의점

print나 list처럼 내장 함수 이름을 변수로 덮어쓰면 이후 같은 이름으로 함수를 호출하기 어렵다. 대입 =와 비교 ==도 구분한다.

## 복습 문제

count = 2 다음에 count = count * 4를 실행하면?

**풀이:** 오른쪽의 기존 count 2에 4를 곱한 8이 새 count가 된다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/reference/simple_stmts.html#assignment-statements)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: print로 첫 문장 출력하기]({{ '/study/2021/python/01-print/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: int, float, str, bool 자료형 구분하기 →]({{ '/study/2021/python/03-basic-types/' | relative_url }})
