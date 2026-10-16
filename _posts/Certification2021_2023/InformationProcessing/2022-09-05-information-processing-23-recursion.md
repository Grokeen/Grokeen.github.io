---
layout: content
title: "[정보처리기사 23] 재귀 호출의 종료 조건과 반환 순서"
date: 2022-09-05 09:00:00 +0900
categories: [InformationProcessingCertification]
tags: [자격증학습, 정보처리기사]
series: study-certifications-2021-2023
study_track: information-processing
study_order: 23
study_unit: 5
permalink: /study/certifications/2021-2023/information-processing/23-recursion/
---

호출이 내려가는 과정과 값이 올라오는 과정을 나누어 추적했다. 종료 조건이 계산보다 먼저였다.

> 2021~2023년 정보처리기사 학습 범위의 개념을 정리한 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

재귀는 함수가 자신을 다시 호출하는 구조다. 더 작은 문제로 줄어드는 경로와 기저 조건이 필요하다. 각 호출은 자기 지역 상태를 가진다. 재귀 깊이 제한과 스택 비용을 고려해야 하며 반복문으로 바꾸는 편이 나은 문제도 있다. 아래는 0 이상의 정수 팩토리얼을 단순화한 예제다.

## 예제 문제 · 창작

factorial(4)의 값을 호출·반환 순서로 구하라. factorial(0)=1을 기저 조건으로 한다.

## 풀이와 판단 근거

4×factorial(3), 3×factorial(2), 2×factorial(1), 1×factorial(0) 순서로 내려간다. 1을 반환한 뒤 1·2·6·24로 올라온다. 입력 검증은 예제에서 음수 정수만 거절하므로 일반 공개 함수라면 정수 여부 등 계약도 더 확인한다. 큰 수의 성능이나 모든 입력을 검증한 함수로 확대하지 않는다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```python
def factorial(number):
    if number < 0:
        raise ValueError("0 이상 정수 필요")
    if number == 0:
        return 1
    return number * factorial(number - 1)

print(factorial(4))
```
{% endraw %}

## 실행 결과

```text
24
```

## 헷갈린 부분과 주의점

기저 조건이 있어도 인자가 그 조건으로 가까워지지 않으면 종료하지 않는다. 재귀 호출 횟수와 반환값을 같은 것으로 세지 않는다.

## 복습 문제

factorial(1)의 결과는?

**풀이:** 1×factorial(0)이므로 1이다.

## 참고한 문서

[개념·API의 원문 자료](https://docs.python.org/3.9/tutorial/controlflow.html#defining-functions)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/information-processing/22-c-array-loop/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/information-processing/24-java-overloading/' | relative_url }})
