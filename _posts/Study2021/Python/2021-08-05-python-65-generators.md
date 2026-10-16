---
layout: content
title: "[파이썬 공부 65] yield로 필요한 순간에 값 생성하기"
date: 2021-08-05 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 65
study_unit: 6
permalink: /study/2021/python/65-generators/
---

모든 값을 한 번에 저장하지 않고 요청할 때 하나씩 만드는 함수를 작성했다. return과 yield의 차이를 실행 흐름으로 따라갔다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

함수 본문에 yield가 있으면 호출 시 제너레이터 객체를 만든다. next를 호출할 때 실행을 진행하다 yield에서 값을 내보내고 잠시 멈춘다. 다음 요청에서 그 뒤부터 이어간다. 큰 입력을 순차 처리할 때 메모리를 줄일 수 있지만 소비한 결과를 자동 저장해 두지는 않는다.

## 따라 해 보기

{% raw %}
```python
def squares(limit):
    for value in range(limit):
        yield value * value

stream = squares(4)
print(next(stream))
print(next(stream))
print(list(stream))
print(list(stream))
```
{% endraw %}

## 실행 결과

```text
0
1
[4, 9]
[]
```

## 코드를 따라 읽기

처음 두 요청에서 0과 1을 내보낸 뒤 남은 4와 9만 list에 담긴다. 마지막에는 제너레이터가 소진되어 빈 목록이다. 함수를 다시 호출하면 새 흐름을 얻는다. 값 생산과 결과 보관을 분리하면 무한 흐름도 필요한 만큼만 처리할 수 있다.

## 헷갈린 부분과 주의점

yield가 있다고 해서 시간이 자동으로 병렬 처리되는 것은 아니다. 이미 소비한 제너레이터를 합계와 평균 계산에 두 번 쓰지 않는다.

## 복습 문제

`squares(3)`의 모든 결과를 목록으로 얻는 식은?

**풀이:** `list(squares(3))`이며 [0, 1, 4]가 된다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/tutorial/classes.html#generators)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: iter와 next, 반복자가 소진되는 방식]({{ '/study/2021/python/64-iterators/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: contextmanager로 시작과 정리 흐름 감싸기 →]({{ '/study/2021/python/66-contextmanager/' | relative_url }})
