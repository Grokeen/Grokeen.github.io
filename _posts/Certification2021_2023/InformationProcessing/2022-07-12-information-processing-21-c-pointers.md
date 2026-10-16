---
layout: content
title: "[정보처리기사 21] C 포인터의 역참조와 배열 요소 접근"
date: 2022-07-12 09:00:00 +0900
categories: [InformationProcessingCertification]
tags: [자격증학습, 정보처리기사]
series: study-certifications-2021-2023
study_track: information-processing
study_order: 21
study_unit: 5
permalink: /study/certifications/2021-2023/information-processing/21-c-pointers/
---

포인터 식을 주소 이동과 값 읽기 단계로 나누었다. 정의되지 않은 동작을 결과 예측 문제처럼 풀지 않기로 했다.

> 2021~2023년 정보처리기사 학습 범위의 개념을 정리한 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

배열 이름은 많은 식에서 첫 요소를 가리키는 포인터로 변환된다. int 포인터에 1을 더하면 바이트 하나가 아니라 int 요소 하나만큼 이동한다. *는 해당 위치의 값을 읽는 역참조다. 유효한 범위 밖을 역참조하면 정해진 출력값을 기대할 수 없다.

## 예제 문제 · 창작

다음 C 프로그램의 출력 두 값을 예측하라. 인덱스와 포인터는 유효한 배열 범위 안에 있다.

## 풀이와 판단 근거

20 30이다. p+1은 두 번째 요소, p[2]는 세 번째 요소를 가리킨다. 배열 첨자는 포인터 덧셈과 역참조의 의미로 설명할 수 있다. int의 실제 바이트 크기를 특정하지 않아도 이 결과를 얻는다. 예제는 단계별 언어 규칙으로 풀이하며 네이티브 컴파일 실행 검증과 구분한다.

## 코드 추적 예제

C11 또는 Java 8 의미를 따라 읽는 추적 문제다. 아래 결과는 코드 흐름으로 풀이한다.

{% raw %}
```c
#include <stdio.h>
int main(void) {
    int values[] = {10, 20, 30};
    int *p = values;
    printf("%d %d\n", *(p + 1), p[2]);
    return 0;
}
```
{% endraw %}

## 예상 출력

```text
20 30
```

## 헷갈린 부분과 주의점

배열 끝 바로 다음 포인터를 만들 수 있는 경우와 그 위치를 역참조하는 것은 다르다. 크기·주소 출력은 환경 가정을 확인한다.

## 복습 문제

p[0]과 *p는 이 예제에서 같을까?

**풀이:** 둘 다 첫 요소 10을 읽는다.

## 참고한 문서

[개념·API의 원문 자료](https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/information-processing/20-indexes/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/information-processing/22-c-array-loop/' | relative_url }})
