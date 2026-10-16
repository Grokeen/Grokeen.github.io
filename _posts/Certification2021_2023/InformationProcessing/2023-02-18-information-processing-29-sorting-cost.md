---
layout: content
title: "[정보처리기사 29] 버블 정렬의 비교 횟수와 복잡도"
date: 2023-02-18 09:00:00 +0900
categories: [InformationProcessingCertification]
tags: [자격증학습, 정보처리기사]
series: study-certifications-2021-2023
study_track: information-processing
study_order: 29
study_unit: 6
permalink: /study/certifications/2021-2023/information-processing/29-sorting-cost/
---

빅오와 실제 작은 입력의 비교 횟수를 구분했다. 조기 종료 최적화 유무도 결과에 영향을 준다.

> 2021~2023년 정보처리기사 학습 범위의 개념을 정리한 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

단순 버블 정렬은 인접 항목을 비교·교환하며 큰 값을 뒤로 보낸다. 조기 종료가 없는 아래 구현의 비교 횟수는 n(n-1)/2다. O(n²)는 증가 규모이지 정확한 실행 초나 모든 정렬의 비용을 뜻하지 않는다. 안정성·추가 공간·입력 분포도 정렬 선택의 기준이다.

## 예제 문제 · 창작

길이 4인 역순 목록을 아래 구현으로 정렬한다. 비교 횟수와 결과를 구하라.

## 풀이와 판단 근거

3+2+1=6번 비교하고 [1,2,3,4]가 된다. 조건이 >라 같은 값끼리는 이 구현에서 불필요하게 뒤집지 않는다. 이미 정렬된 목록도 조기 종료가 없어 같은 횟수를 비교한다. 최적화한 다른 버블 정렬의 최선 복잡도와 섞지 않는다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```python
values = [4, 3, 2, 1]
comparisons = 0
for end in range(len(values) - 1, 0, -1):
    for index in range(end):
        comparisons += 1
        if values[index] > values[index + 1]:
            values[index], values[index + 1] = values[index + 1], values[index]
print(values)
print(comparisons)
```
{% endraw %}

## 실행 결과

```text
[1, 2, 3, 4]
6
```

## 헷갈린 부분과 주의점

정렬 알고리즘 이름만 보고 구체 구현의 정확한 비교 횟수를 확정하지 않는다. 입력 크기와 반복 범위를 함께 본다.

## 복습 문제

조기 종료가 없는 이 코드에 정렬된 목록을 넣으면 비교 횟수는?

**풀이:** 같은 길이 4라면 6번이다.

## 참고한 문서

[개념·API의 원문 자료](https://www.nist.gov/dads/HTML/bubblesort.html)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/information-processing/28-binary-search/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/information-processing/30-graph-bfs/' | relative_url }})
