---
layout: content
title: "[정보처리기사 26] Python 변경 가능한 기본 인자의 출력 추적"
date: 2022-11-27 09:00:00 +0900
categories: [InformationProcessingCertification]
tags: [자격증학습, 정보처리기사]
series: study-certifications-2021-2023
study_track: information-processing
study_order: 26
study_unit: 6
permalink: /study/certifications/2021-2023/information-processing/26-python-defaults/
---

시험의 출력 예측 문제에서는 바람직하지 않은 코드도 왜 그렇게 동작하는지 설명해야 했다. 기본값 생성 시점을 확인했다.

> 2021~2023년 정보처리기사 학습 범위의 개념을 정리한 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

함수 기본 인자 값은 함수 정의 때 평가된다. 리스트 같은 변경 가능한 기본 객체는 다음 호출에도 공유될 수 있다. 아래는 그 함정을 보여 주는 창작 문제이며 독립 목록을 원하면 기본값 None과 함수 내부 초기화를 사용한다. 함수의 반환값과 호출 후 남은 상태를 함께 추적한다.

## 예제 문제 · 창작

아래 두 print 결과를 예측하라. 각 add 호출에서 새 기본 목록이 생성되는지 설명하라.

## 풀이와 판단 근거

첫 출력은 [1], 둘째는 [1, 2]다. 같은 기본 리스트를 다음 호출에서도 사용하기 때문이다. 원치 않는 공유를 막으려면 values=None으로 두고 None일 때 새 리스트를 만든다. 외부에서 목록을 명시적으로 전달한 경우를 유지할지도 함수 계약으로 정한다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```python
def add(value, values=[]):
    values.append(value)
    return values

print(add(1))
print(add(2))
```
{% endraw %}

## 실행 결과

```text
[1]
[1, 2]
```

## 헷갈린 부분과 주의점

values=[]를 매 호출의 새 객체라고 생각하지 않는다. if not values로 초기화하면 전달받은 빈 목록까지 새 객체로 바뀔 수 있다.

## 복습 문제

기본값이 정수 0이어도 같은 방식의 내부 변경이 누적될까?

**풀이:** 정수는 변경 불가능한 객체이고 대입은 이름 연결을 바꾸므로 리스트 append와 다르게 동작한다.

## 참고한 문서

[개념·API의 원문 자료](https://docs.python.org/3.9/tutorial/controlflow.html#default-argument-values)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/information-processing/25-java-equality/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/information-processing/27-stack-queue/' | relative_url }})
