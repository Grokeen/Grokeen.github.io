---
layout: content
title: "[파이썬 공부 08] if문과 들여쓰기로 실행 구역 나누기"
date: 2021-01-27 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 8
study_unit: 1
permalink: /study/2021/python/08-if-indent/
---

조건을 만족할 때만 실행할 코드를 들여쓰기로 묶었다. 중괄호 대신 들여쓰기가 프로그램의 구조라는 점을 먼저 익혔다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

if 뒤에 조건과 콜론을 적고 그 아래 실행문을 같은 깊이로 들여쓴다. else는 조건이 거짓일 때 실행할 블록이다. 파이썬은 들여쓰기 자체를 문법으로 사용한다. 예제에서는 관례에 따라 공백 네 칸을 쓰고, 조건 블록 밖의 문장은 참·거짓과 관계없이 실행한다.

## 따라 해 보기

{% raw %}
```python
battery = 18
if battery < 20:
    print("충전 필요")
    print("절전 모드")
else:
    print("사용 가능")
print("확인 완료")
```
{% endraw %}

## 실행 결과

```text
충전 필요
절전 모드
확인 완료
```

## 코드를 따라 읽기

18은 20보다 작으므로 if 아래 두 줄이 실행된다. else 블록은 건너뛴다. 마지막 print는 왼쪽으로 돌아와 있으므로 조건 블록 바깥이다. 들여쓰기만 보고도 어느 조건에 속하는지 설명할 수 있도록 코드를 읽어 보았다.

## 헷갈린 부분과 주의점

탭과 공백을 섞으면 TabError나 의도와 다른 구조가 생길 수 있다. 편집기의 공백 표시와 자동 들여쓰기를 활용한다.

## 복습 문제

마지막 print를 else 안으로 들여쓰면 현재 입력에서 출력될까?

**풀이:** 출력되지 않는다. 현재는 if 조건이 참이어서 else 블록 전체를 건너뛰기 때문이다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/reference/compound_stmts.html#the-if-statement)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: and, or, not과 단락 평가]({{ '/study/2021/python/07-boolean-logic/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: elif로 겹치지 않는 여러 구간 만들기 →]({{ '/study/2021/python/09-elif/' | relative_url }})
