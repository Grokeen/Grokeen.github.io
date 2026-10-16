---
layout: content
title: "[파이썬 공부 32] return과 조기 종료로 예외 상황 나누기"
date: 2021-04-17 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 32
study_unit: 3
permalink: /study/2021/python/32-return-guard/
---

빈 목록을 평균 계산에 넣었을 때의 처리부터 정했다. 정상 흐름을 깊게 중첩하기보다 먼저 빠져나오는 구조를 연습했다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

return은 값을 반환하면서 현재 함수 실행을 즉시 끝낸다. return 뒤의 같은 경로 코드는 실행되지 않는다. 반환값이 없거나 함수 끝까지 도달하면 None을 반환한다. None을 실패·미측정처럼 사용할 때는 호출하는 쪽에서 is None으로 의미를 확인해야 한다.

## 따라 해 보기

{% raw %}
```python
def average(values):
    if not values:
        return None
    return sum(values) / len(values)

print(average([10, 20]))
result = average([])
print(result is None)
```
{% endraw %}

## 실행 결과

```text
15.0
True
```

## 코드를 따라 읽기

빈 입력을 먼저 검사해 0으로 나누는 경로를 막았다. 값이 있으면 합계와 개수로 평균을 계산한다. 빈 목록의 평균을 임의로 0이라고 정하지 않고 None으로 구분했다. 결과를 쓰는 쪽에서도 미측정과 실제 0을 혼동하지 않아야 한다.

## 헷갈린 부분과 주의점

None인지 확인할 때 if not result만 쓰면 평균 0.0도 빠진 값으로 취급할 수 있다. 값의 의미에 맞게 분기한다.

## 복습 문제

`average([0, 0])`과 `average([])`는 같은 뜻일까?

**풀이:** 아니다. 앞은 실제 평균 0.0이고 뒤는 계산할 데이터가 없다는 뜻의 None이다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/reference/simple_stmts.html#the-return-statement)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: def로 반복 계산에 이름 붙이기]({{ '/study/2021/python/31-functions/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: 기본 인자와 변경 가능한 기본값의 함정 →]({{ '/study/2021/python/33-default-arguments/' | relative_url }})
