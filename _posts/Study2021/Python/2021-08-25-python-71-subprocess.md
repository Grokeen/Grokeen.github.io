---
layout: content
title: "[파이썬 공부 71] subprocess.run으로 외부 프로그램 결과 받기"
date: 2021-08-25 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 71
study_unit: 6
permalink: /study/2021/python/71-subprocess/
---

운영체제 명령을 실행할 때 문자열 하나보다 인자 목록을 전달하는 방식을 연습했다. 예제는 같은 파이썬으로 작은 자식 프로그램만 실행한다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

subprocess.run은 외부 프로그램이 끝날 때까지 기다리고 결과 객체를 반환한다. capture_output=True는 표준 출력·오류를 모으며 text=True는 문자열로 읽는다. check=True는 실패 종료를 예외로 알린다. timeout을 지정해 끝나지 않는 프로그램을 제한할 수 있다.

## 따라 해 보기

{% raw %}
```python
import subprocess
import sys

result = subprocess.run(
    [sys.executable, "-c", "print(6 * 7)"],
    capture_output=True,
    text=True,
    check=True,
    timeout=5,
)
print(result.stdout.strip())
print(result.returncode)
```
{% endraw %}

## 실행 결과

```text
42
0
```

## 코드를 따라 읽기

sys.executable로 현재 실행 중인 파이썬을 선택한다. -c 뒤의 코드는 자식 프로세스에서 실행된다. 성공 종료 코드 0과 출력 42를 확인했다. 쉘 명령 확장이 필요하지 않아 shell=True를 쓰지 않았다. 인자 목록은 공백이 있는 값도 분리 구조를 유지한다.

## 헷갈린 부분과 주의점

명령 실패는 CalledProcessError, 시간 초과는 TimeoutExpired 등으로 구분된다. 입력을 조합한 셸 명령은 의도하지 않은 명령 실행 문제를 만들 수 있다.

## 복습 문제

check=True가 아니면 실패 종료가 자동으로 예외가 될까?

**풀이:** 일반적으로 아니다. returncode를 직접 확인하거나 check=True로 실패를 명시적으로 처리한다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/library/subprocess.html)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: sqlite3로 값 바인딩과 조회 연습하기]({{ '/study/2021/python/70-sqlite/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: 작은 종합 실습: 측정값을 검증하고 요약하기 →]({{ '/study/2021/python/72-python-mini-project/' | relative_url }})
