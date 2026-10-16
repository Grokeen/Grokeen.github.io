---
layout: content
title: "[파이썬 공부 64] iter와 next, 반복자가 소진되는 방식"
date: 2021-08-02 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 64
study_unit: 6
permalink: /study/2021/python/64-iterators/
---

for문 내부에서 일어나는 과정을 iter와 next로 풀어 보았다. 다시 순회 가능한 목록과 한 번 소비하는 반복자를 구분했다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

iter는 반복자를 얻고 next는 다음 항목을 반환한다. 항목이 끝나면 StopIteration이 발생한다. `next(반복자, 기본값)` 형태는 소진 시 예외 대신 기본값을 반환한다. 리스트는 새 반복자를 여러 번 얻을 수 있지만 같은 반복자 객체를 소비한 상태는 유지된다.

## 따라 해 보기

{% raw %}
```python
values = [10, 20]
iterator = iter(values)
print(next(iterator))
print(next(iterator))
print(next(iterator, "끝"))
print(list(iterator))
print(list(iter(values)))
```
{% endraw %}

## 실행 결과

```text
10
20
끝
[]
[10, 20]
```

## 코드를 따라 읽기

두 번 next를 호출하면 모든 항목이 소비된다. 같은 iterator를 list로 바꾸어도 남은 값이 없어 빈 목록이다. 원래 values에서 새 iter를 만들면 처음부터 읽을 수 있다. 파일·zip·제너레이터를 다룰 때 이 차이를 모르면 결과가 갑자기 비어 보일 수 있다.

## 헷갈린 부분과 주의점

모든 반복 가능 객체가 인덱싱이나 len을 지원하는 것은 아니다. 다음 항목을 꺼낼 수 있다는 성질과 임의 위치 접근은 다르다.

## 복습 문제

`next(iterator)`에 기본값이 없는데 소진되면?

**풀이:** StopIteration 예외가 발생한다. for문은 이 신호를 반복 종료로 처리한다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/library/functions.html#iter)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: 타입 힌트로 함수의 입력·반환 의도 적기]({{ '/study/2021/python/63-typing/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: yield로 필요한 순간에 값 생성하기 →]({{ '/study/2021/python/65-generators/' | relative_url }})
