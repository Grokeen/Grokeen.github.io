---
layout: content
title: "[파이썬 공부 31] def로 반복 계산에 이름 붙이기"
date: 2021-04-14 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 31
study_unit: 3
permalink: /study/2021/python/31-functions/
---

같은 계산을 여러 번 사용하기 위해 함수로 묶었다. 매개변수와 실제 호출에서 전달하는 인자를 구별했다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

def 이름(매개변수): 아래에 함수 본문을 들여쓴다. 정의하는 순간에는 본문을 실행하지 않고 호출할 때 실행한다. 매개변수는 함수 내부에서 입력을 부르는 이름이다. 계산 결과를 호출한 쪽에 전달하려면 return을 쓰며 출력만 하는 함수와 역할을 구분한다.

## 따라 해 보기

{% raw %}
```python
def celsius_to_fahrenheit(celsius):
    fahrenheit = celsius * 9 / 5 + 32
    return fahrenheit

print(celsius_to_fahrenheit(0))
print(celsius_to_fahrenheit(25))
```
{% endraw %}

## 실행 결과

```text
32.0
77.0
```

## 코드를 따라 읽기

첫 호출은 celsius에 0을 연결하고 둘째 호출은 25를 연결한다. 함수 안의 fahrenheit는 각 호출에서 계산한다. 함수 바깥 print가 반환된 수를 출력하므로 다른 계산에서도 결과를 재사용할 수 있다. 함수 이름에 변환 방향을 담아 의미를 드러냈다.

## 헷갈린 부분과 주의점

함수를 정의하기 전에 호출하면 해당 이름이 아직 없어 NameError가 날 수 있다. 본문 마지막 줄을 print로 바꾸면 호출 결과는 None이 된다.

## 복습 문제

함수 안에서 print를 지우더라도 바깥 print로 결과를 볼 수 있는 이유는?

**풀이:** return이 계산한 값을 호출 지점에 돌려주기 때문이다. 함수 내부 출력은 필수가 아니다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/tutorial/controlflow.html#defining-functions)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: sorted와 sort, key로 정렬 기준 정하기]({{ '/study/2021/python/30-sorting/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: return과 조기 종료로 예외 상황 나누기 →]({{ '/study/2021/python/32-return-guard/' | relative_url }})
