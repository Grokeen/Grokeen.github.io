---
layout: content
title: "[파이썬 공부 25] break, continue와 반복문의 else"
date: 2021-03-25 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 25
study_unit: 3
permalink: /study/2021/python/25-break-continue/
---

원하는 값을 찾으면 멈추고 잘못된 값은 건너뛰는 코드를 비교했다. 반복문 뒤의 else는 조건문의 else와 다르게 읽어야 했다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

continue는 현재 반복의 남은 부분을 건너뛰고 다음 반복으로 진행한다. break는 가장 가까운 반복문을 끝낸다. for나 while의 else는 break 없이 반복이 끝났을 때 실행한다. 검색 성공을 break로 나타내면 else에서 검색 실패를 처리할 수 있다.

## 따라 해 보기

{% raw %}
```python
values = [-1, 3, 8, 10]
for value in values:
    if value < 0:
        continue
    if value % 2 == 0:
        print("첫 짝수", value)
        break
else:
    print("짝수 없음")
print("검색 끝")
```
{% endraw %}

## 실행 결과

```text
첫 짝수 8
검색 끝
```

## 코드를 따라 읽기

-1은 continue로 건너뛴다. 3은 짝수가 아니므로 다음 항목으로 넘어간다. 8에서 출력하고 break를 만나므로 10은 검사하지 않고 else도 실행하지 않는다. 반복이 정상적으로 소진되었는지 표시해야 하는 검색에 알맞은 구조였다.

## 헷갈린 부분과 주의점

중첩 반복문에서 break 하나가 바깥 반복까지 모두 끝내지는 않는다. else를 if와 같은 들여쓰기 깊이에 놓으면 의미가 달라진다.

## 복습 문제

values가 [1, 3]이면 else가 실행될까?

**풀이:** 실행된다. 짝수를 찾지 못해 break 없이 모든 항목을 검사했기 때문이다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/tutorial/controlflow.html#break-and-continue-statements-and-else-clauses-on-loops)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: while문에서 종료 조건과 상태 갱신 챙기기]({{ '/study/2021/python/24-while-loop/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: enumerate로 번호와 항목 함께 받기 →]({{ '/study/2021/python/26-enumerate/' | relative_url }})
