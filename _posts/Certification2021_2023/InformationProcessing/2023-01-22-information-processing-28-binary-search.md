---
layout: content
title: "[정보처리기사 28] 이진 탐색의 정렬 전제와 구간 갱신"
date: 2023-01-22 09:00:00 +0900
categories: [InformationProcessingCertification]
tags: [자격증학습, 정보처리기사]
series: study-certifications-2021-2023
study_track: information-processing
study_order: 28
study_unit: 6
permalink: /study/certifications/2021-2023/information-processing/28-binary-search/
---

절반씩 범위를 줄이는 이유와 포함 경계를 함께 정리했다. 정렬되지 않은 입력에 그대로 적용하지 않기로 했다.

> 2021~2023년 정보처리기사 학습 범위의 개념을 정리한 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

이진 탐색은 정렬된 자료에서 가운데 값과 비교해 탐색 구간을 줄인다. 아래는 양 끝을 포함하는 low·high 모델이다. 배열 임의 접근이 상수 시간이라는 가정에서 비교 횟수는 O(log n)이다. 삽입·정렬 비용과 다른 자료구조의 접근 비용은 별도로 계산한다.

## 예제 문제 · 창작

[1,3,5,7,9]에서 7을 찾는 반환 인덱스를 구하고 없을 때 결과도 정하라.

## 풀이와 판단 근거

인덱스는 3이다. 처음 가운데 5보다 커 오른쪽으로 줄이고 7을 만난다. 찾지 못하면 -1이라는 이 함수의 계약을 사용한다. 중복값이 있을 때 맨 처음 위치를 찾는 요구는 별도 경계 탐색이 필요하다. 매 반복마다 범위가 줄어드는지 확인한다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```python
def find(values, target):
    low, high = 0, len(values) - 1
    while low <= high:
        middle = (low + high) // 2
        if values[middle] == target:
            return middle
        if values[middle] < target:
            low = middle + 1
        else:
            high = middle - 1
    return -1

print(find([1, 3, 5, 7, 9], 7))
print(find([1, 3, 5, 7, 9], 2))
```
{% endraw %}

## 실행 결과

```text
3
-1
```

## 헷갈린 부분과 주의점

low = middle로만 갱신하면 특정 경우 구간이 줄지 않아 반복할 수 있다. 포함·제외 경계 모델을 섞지 않는다.

## 복습 문제

정렬이 내림차순이면 같은 비교 방향을 쓸까?

**풀이:** 아니다. 정렬 순서에 맞게 어느 쪽을 버릴지 바꿔야 한다.

## 참고한 문서

[개념·API의 원문 자료](https://www.nist.gov/dads/HTML/binarySearch.html)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/information-processing/27-stack-queue/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/information-processing/29-sorting-cost/' | relative_url }})
