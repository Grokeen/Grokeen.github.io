---
layout: content
title: "[파이썬 공부 38] try와 except로 예상한 오류 처리하기"
date: 2021-05-07 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 38
study_unit: 4
permalink: /study/2021/python/38-try-except/
---

입력값 하나 때문에 프로그램 전체가 끝나지 않도록 예외 처리를 연습했다. 정상 값과 잘못된 값을 같은 반복문에서 비교했다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

try에는 실패할 수 있는 작은 구역을 넣고 except에는 처리할 예외 종류를 적는다. 해당 예외가 생기면 try의 남은 부분을 건너뛴다. else는 예외가 없을 때 실행한다. 어떤 오류든 무조건 숨기는 대신 복구 방법을 알고 있는 오류만 잡는 편이 원인을 찾기 쉽다.

## 따라 해 보기

{% raw %}
```python
for text in ["12", "잘못된 값"]:
    try:
        number = int(text)
    except ValueError:
        print("정수로 바꿀 수 없음")
    else:
        print(number * 2)
```
{% endraw %}

## 실행 결과

```text
24
정수로 바꿀 수 없음
```

## 코드를 따라 읽기

12는 변환에 성공해 else에서 두 배를 출력한다. 글자는 int가 읽을 수 없어 ValueError가 발생하고 except 메시지를 출력한다. 정상 경로와 실패 경로를 따로 적으니 각 경우에 무엇이 남는지 설명하기 쉬웠다. 오류가 난 항목 뒤에도 반복은 계속할 수 있다.

## 헷갈린 부분과 주의점

except:처럼 예외 종류를 생략하면 종료 신호까지 잡을 수 있다. 예외 처리 범위를 너무 넓히면 다른 코드의 버그를 입력 오류로 오해하게 된다.

## 복습 문제

`int(None)`은 이 except ValueError에서 처리될까?

**풀이:** 아니다. TypeError가 발생하므로 현재 처리 대상과 다르다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/tutorial/errors.html#handling-exceptions)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: lambda는 짧은 식을 함수로 만들 때 쓰기]({{ '/study/2021/python/37-lambda/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: raise로 함수 입력 조건 알리기 →]({{ '/study/2021/python/39-raise/' | relative_url }})
