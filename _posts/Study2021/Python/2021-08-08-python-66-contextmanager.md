---
layout: content
title: "[파이썬 공부 66] contextmanager로 시작과 정리 흐름 감싸기"
date: 2021-08-08 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 66
study_unit: 6
permalink: /study/2021/python/66-contextmanager/
---

with 구문의 동작을 작은 예제로 직접 구성했다. 진입과 사용, 정리의 순서를 눈으로 확인했다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

contextlib.contextmanager는 yield 한 번을 사용하는 함수로 컨텍스트 매니저를 만들게 해 준다. yield 앞은 진입 준비, yield한 값은 as 뒤 변수에 전달되고, with 블록이 끝나면 뒤를 실행한다. 정리는 try/finally에 두어 사용 중 예외가 나도 실행되도록 한다.

## 따라 해 보기

{% raw %}
```python
from contextlib import contextmanager

@contextmanager
def session():
    print("준비")
    try:
        yield "측정기"
    finally:
        print("정리")

with session() as name:
    print(name, "사용")
```
{% endraw %}

## 실행 결과

```text
준비
측정기 사용
정리
```

## 코드를 따라 읽기

with에 들어가면 준비를 출력하고 yield의 문자열을 name으로 받는다. 사용 블록이 끝나면 finally에서 정리한다. 실제 장치 연결을 대신 열지는 않는 흐름 학습 예제다. 이미 컨텍스트 매니저인 파일이나 장치 객체를 쓸 때는 제공된 with 인터페이스를 우선 활용한다.

## 헷갈린 부분과 주의점

이 방식의 함수는 정확히 한 번 yield해야 한다. 정리 블록에서 오류를 숨기거나 원래 예외를 다른 return으로 덮지 않도록 한다.

## 복습 문제

with 안에서 예외가 발생해도 정리 메시지가 나올까?

**풀이:** finally 덕분에 나온다. 이 함수는 그 예외를 처리해 없애지는 않는다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/library/contextlib.html#contextlib.contextmanager)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: yield로 필요한 순간에 값 생성하기]({{ '/study/2021/python/65-generators/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: unittest로 정상값과 오류 경로 확인하기 →]({{ '/study/2021/python/67-unittest/' | relative_url }})
