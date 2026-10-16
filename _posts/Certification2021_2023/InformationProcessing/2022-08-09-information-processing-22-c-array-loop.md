---
layout: content
title: "[정보처리기사 22] C 배열의 길이와 반복 경계"
date: 2022-08-09 09:00:00 +0900
categories: [InformationProcessingCertification]
tags: [자격증학습, 정보처리기사]
series: study-certifications-2021-2023
study_track: information-processing
study_order: 22
study_unit: 5
permalink: /study/certifications/2021-2023/information-processing/22-c-array-loop/
---

배열 크기에서 항목 수를 구하는 식이 언제 유효한지 정리했다. 함수 인자로 넘어간 포인터와 실제 배열은 다르게 다뤄야 했다.

> 2021~2023년 정보처리기사 학습 범위의 개념을 정리한 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

현재 범위의 실제 배열에 대해 sizeof 배열 / sizeof 첫요소로 항목 수를 구할 수 있다. 함수 매개변수의 배열 표기는 포인터로 조정되므로 그 식이 같은 뜻이 되지 않는다. 반복 조건 i < length는 마지막 유효 위치 length-1까지만 처리한다. 크기가 아닌 순회 범위의 의미를 먼저 읽는다.

## 예제 문제 · 창작

아래 코드의 합계를 예측하고, 반복 조건을 i <= length로 바꾸면 왜 올바른 예측 문제가 아니게 되는지 설명하라.

## 풀이와 판단 근거

합계는 6이다. 길이는 세 항목이고 0·1·2 위치를 더한다. <=로 바꾸면 위치 3을 읽어 배열 범위를 벗어나 정의되지 않은 동작이 생긴다. 우연히 어떤 숫자가 나왔다고 표준 결과로 외우면 안 된다. sizeof의 반환형은 size_t여서 길이 변수도 그 자료형을 사용했다.

## 코드 추적 예제

C11 또는 Java 8 의미를 따라 읽는 추적 문제다. 아래 결과는 코드 흐름으로 풀이한다.

{% raw %}
```c
#include <stdio.h>
int main(void) {
    int values[] = {1, 2, 3};
    size_t length = sizeof values / sizeof values[0];
    int total = 0;
    for (size_t i = 0; i < length; i++) total += values[i];
    printf("%d\n", total);
    return 0;
}
```
{% endraw %}

## 예상 출력

```text
6
```

## 헷갈린 부분과 주의점

배열 매개변수 안에서 sizeof를 써도 원래 전체 길이가 나온다고 생각하지 않는다. 포인터와 배열의 차이를 문맥별로 본다.

## 복습 문제

길이가 3이면 마지막 유효 인덱스는?

**풀이:** 2다. 인덱스는 0부터 시작한다.

## 참고한 문서

[개념·API의 원문 자료](https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/information-processing/21-c-pointers/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/information-processing/23-recursion/' | relative_url }})
