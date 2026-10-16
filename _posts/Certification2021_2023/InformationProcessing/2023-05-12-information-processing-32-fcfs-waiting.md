---
layout: content
title: "[정보처리기사 32] FCFS 대기 시간과 반환 시간"
date: 2023-05-12 09:00:00 +0900
categories: [InformationProcessingCertification]
tags: [자격증학습, 정보처리기사]
series: study-certifications-2021-2023
study_track: information-processing
study_order: 32
study_unit: 7
permalink: /study/certifications/2021-2023/information-processing/32-fcfs-waiting/
---

대기 시간과 실행 시간을 섞어 계산하던 습관을 고쳤다. 도착 시각과 CPU 사용 시간이 문제의 전제였다.

> 2021~2023년 정보처리기사 학습 범위의 개념을 정리한 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

FCFS는 먼저 도착한 작업부터 비선점으로 처리하는 기본 정책이다. 반환 시간은 완료 시각−도착 시각, 대기 시간은 반환 시간−CPU 사용 시간으로 계산한다. 이 예제는 I/O가 없고 세 작업이 모두 시각 0에 주어진 순서로 도착했다고 가정한다. 다른 도착 시각이나 선점 정책에는 같은 표를 그대로 적용하지 않는다.

## 예제 문제 · 창작

P1,P2,P3의 CPU 사용 시간이 각각 5,3,2이고 모두 0에 도착했다. 이 순서로 FCFS 처리할 때 각 대기 시간과 평균은?

## 풀이와 판단 근거

P1은 0, P2는 5, P3는 8만큼 기다린다. 합계 13을 3으로 나누면 평균 4.33이다. 완료 시각은 5,8,10이며 대기 시간에 자기 실행 시간을 포함하면 반환 시간과 혼동하게 된다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```python
bursts = [5, 3, 2]
clock = 0
waits = []
for burst in bursts:
    waits.append(clock)
    clock += burst
print(waits)
print(f"{sum(waits) / len(waits):.2f}")
```
{% endraw %}

## 실행 결과

```text
[0, 5, 8]
4.33
```

## 헷갈린 부분과 주의점

FCFS와 최단 작업 우선 정책을 섞지 않는다. 평균 대기 시간은 실행 순서에 따라 달라진다.

## 복습 문제

마지막 작업의 반환 시간은?

**풀이:** 도착 0에서 완료 10까지이므로 10이다.

## 참고한 문서

[개념·API의 원문 자료](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/information-processing/31-process-thread/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/information-processing/33-deadlock/' | relative_url }})
