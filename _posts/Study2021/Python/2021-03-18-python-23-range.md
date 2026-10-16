---
layout: content
title: "[파이썬 공부 23] range의 시작값, 종료값, 간격"
date: 2021-03-18 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 23
study_unit: 2
permalink: /study/2021/python/23-range/
---

정해진 횟수만큼 반복하는 방법을 정리했다. range도 슬라이싱처럼 끝 값을 포함하지 않았다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

`range(stop)`은 0부터 stop 직전까지, `range(start, stop, step)`은 지정한 시작과 간격으로 정수들을 표현한다. 범위의 모든 값을 리스트에 미리 저장하는 방식은 아니다. 음수 step이면 감소하며, 진행 방향이 종료 조건과 맞지 않으면 빈 범위가 된다.

## 따라 해 보기

{% raw %}
```python
print(list(range(4)))
print(list(range(2, 7, 2)))
print(list(range(5, 0, -2)))
for index in range(1, 4):
    print(f"복습 {index}회")
```
{% endraw %}

## 실행 결과

```text
[0, 1, 2, 3]
[2, 4, 6]
[5, 3, 1]
복습 1회
복습 2회
복습 3회
```

## 코드를 따라 읽기

`range(4)`는 0·1·2·3의 네 정수를 만든다. 2에서 두 칸씩 진행하면 2·4·6이고 7은 제외된다. 출력할 때만 list로 바꾸어 범위의 실제 항목을 확인했다. 반복 횟수와 화면에 표시할 번호가 같은지 따로 판단하는 습관을 들였다.

## 헷갈린 부분과 주의점

range의 step은 0일 수 없다. 실수 간격을 직접 지원하지 않으므로 0.1 단위가 필요하면 정수 인덱스로 계산하는 방법 등을 쓴다.

## 복습 문제

`list(range(3, 0))`이 빈 리스트인 이유는?

**풀이:** 기본 간격은 +1이어서 시작 3에서 종료 0 방향으로 진행할 수 없기 때문이다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/library/stdtypes.html#ranges)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: for문으로 항목을 하나씩 처리하기]({{ '/study/2021/python/22-for-loop/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: while문에서 종료 조건과 상태 갱신 챙기기 →]({{ '/study/2021/python/24-while-loop/' | relative_url }})
