---
layout: content
title: "[파이썬 공부 40] finally로 성공·실패와 관계없는 정리 수행하기"
date: 2021-05-14 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 40
study_unit: 4
permalink: /study/2021/python/40-finally/
---

처리가 실패해도 마지막 정리 작업이 실행되는 구조를 확인했다. 자원을 열었다면 닫는 경로까지 생각해야 했다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

finally 블록은 try 처리가 정상으로 끝나든 예외로 끝나든 실행된다. 파일이나 장치 같은 자원을 해제할 때 사용한다. 예외를 처리하는 except와 정리하는 finally는 목적이 다르다. 파일처럼 컨텍스트 매니저를 제공하는 자원은 with를 쓰면 정리 구조를 더 간단히 표현할 수 있다.

## 따라 해 보기

{% raw %}
```python
def read_number(text):
    try:
        return int(text)
    except ValueError:
        return None
    finally:
        print("변환 시도 종료")

print(read_number("7"))
print(read_number("x"))
```
{% endraw %}

## 실행 결과

```text
변환 시도 종료
7
변환 시도 종료
None
```

## 코드를 따라 읽기

try나 except에서 return을 만나도 함수가 최종적으로 값을 반환하기 전에 finally가 실행된다. 두 경우 모두 종료 메시지가 먼저 보인다. 이 예제는 정리 순서를 보여 주며 실제 파일을 열거나 닫지는 않는다. 뒤의 파일 예제에서는 with로 같은 의도를 표현한다.

## 헷갈린 부분과 주의점

finally 안에서 return을 쓰면 기존 반환값이나 발생 중인 예외를 덮어쓸 수 있다. 정리 코드에 새로운 제어 흐름을 넣는 일을 피한다.

## 복습 문제

finally가 있다고 해서 예외가 자동으로 처리될까?

**풀이:** 아니다. 처리하지 않은 예외는 정리 블록을 실행한 뒤 호출한 곳으로 전파된다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/tutorial/errors.html#defining-clean-up-actions)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: raise로 함수 입력 조건 알리기]({{ '/study/2021/python/39-raise/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: import로 표준 라이브러리 불러오기 →]({{ '/study/2021/python/41-imports/' | relative_url }})
