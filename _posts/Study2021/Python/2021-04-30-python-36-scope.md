---
layout: content
title: "[파이썬 공부 36] 지역 변수와 바깥 범위, nonlocal 이해하기"
date: 2021-04-30 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 36
study_unit: 3
permalink: /study/2021/python/36-scope/
---

함수 안에서 만든 이름이 바깥 변수와 어떻게 다른지 비교했다. 값을 공유해야 할 때도 먼저 범위를 확인했다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

함수 안에 대입하는 이름은 global이나 nonlocal 선언이 없는 한 보통 지역 변수다. 안쪽 함수가 바깥 함수의 변수를 읽을 수는 있지만 다시 연결하려면 nonlocal을 쓴다. 전역 상태를 마구 수정하기보다 입력과 반환값으로 흐름을 드러내는 것이 추적하기 쉽다.

## 따라 해 보기

{% raw %}
```python
count = 10

def make_counter():
    count = 0
    def increment():
        nonlocal count
        count += 1
        return count
    return increment

counter = make_counter()
print(counter(), counter())
print(count)
```
{% endraw %}

## 실행 결과

```text
1 2
10
```

## 코드를 따라 읽기

increment는 make_counter의 count를 기억하는 클로저다. nonlocal 덕분에 해당 값을 갱신해 호출할 때마다 증가한다. 모듈 바깥의 count 10은 다른 이름 연결이므로 바뀌지 않는다. 같은 이름이라도 어느 범위에 속하는지가 중요했다.

## 헷갈린 부분과 주의점

함수 안에서 count += 1만 적으면 읽기 전에 지역 변수를 참조해 UnboundLocalError가 날 수 있다. 전역 변수가 자동으로 수정된다고 생각하지 않는다.

## 복습 문제

서로 다른 `make_counter()` 호출로 만든 두 함수는 같은 횟수를 공유할까?

**풀이:** 아니다. 각 호출의 별도 바깥 지역 상태를 기억한다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/tutorial/classes.html#python-scopes-and-namespaces)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: 키워드 인자와 별표로 설정을 명확히 받기]({{ '/study/2021/python/35-kwargs-keyword-only/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: lambda는 짧은 식을 함수로 만들 때 쓰기 →]({{ '/study/2021/python/37-lambda/' | relative_url }})
