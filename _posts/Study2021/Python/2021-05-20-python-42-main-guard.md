---
layout: content
title: "[파이썬 공부 42] __name__과 main 가드로 실행 코드 분리하기"
date: 2021-05-20 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 42
study_unit: 4
permalink: /study/2021/python/42-main-guard/
---

함수를 다른 파일에서 가져올 때 예제 실행까지 함께 돌아가지 않게 구성했다. 재사용 코드와 시작 지점을 분리하는 연습이었다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

파일을 직접 실행하면 그 모듈의 `__name__`은 "`__main__`"이 된다. import로 불러오면 보통 모듈 이름이 된다. if `__name__` == "`__main__`": 아래에 시작 코드를 두면 직접 실행할 때만 해당 부분이 실행된다. 함수 정의 자체는 두 경우 모두 이루어진다.

## 따라 해 보기

{% raw %}
```python
def double(value):
    return value * 2

def main():
    print(double(6))

if __name__ == "__main__":
    main()
```
{% endraw %}

## 실행 결과

```text
12
```

## 코드를 따라 읽기

example.py로 저장하고 python3 example.py로 직접 실행하는 예제다. import example을 하면 main 호출은 건너뛰고 example.double을 재사용할 수 있다. main도 평범한 함수이며 이름만으로 자동 실행되는 것은 아니다. 마지막 조건문이 실제 호출을 결정한다.

## 헷갈린 부분과 주의점

파일 이름 `__main__`.py와 변수 `__name__`의 역할을 혼동하지 않는다. 함수 밖에 놓은 다른 print는 가드 바깥이므로 import할 때도 실행된다.

## 복습 문제

`main()`을 조건문 밖에 놓으면 import 때도 실행될까?

**풀이:** 실행된다. 시작 코드를 가드 안에 두는 이유가 바로 그 동작을 제어하기 위해서다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/tutorial/modules.html#executing-modules-as-scripts)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: import로 표준 라이브러리 불러오기]({{ '/study/2021/python/41-imports/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: str과 bytes, UTF-8 인코딩 구분하기 →]({{ '/study/2021/python/43-bytes-encoding/' | relative_url }})
