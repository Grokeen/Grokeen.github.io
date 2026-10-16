---
layout: content
title: "[정보처리기사 34] 페이징 주소의 페이지 번호와 변위"
date: 2023-07-07 09:00:00 +0900
categories: [InformationProcessingCertification]
tags: [자격증학습, 정보처리기사]
series: study-certifications-2021-2023
study_track: information-processing
study_order: 34
study_unit: 7
permalink: /study/certifications/2021-2023/information-processing/34-paging-address/
---

논리 주소를 몫과 나머지로 나누어 계산했다. 페이지 번호를 물리 프레임 번호로 바꿀 때 변위는 그대로였다.

> 2021~2023년 정보처리기사 학습 범위의 개념을 정리한 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

고정 크기 페이징에서는 논리 주소를 페이지 번호와 페이지 안 변위로 구분한다. 페이지 테이블이 그 페이지의 프레임을 알려 주면 물리 주소는 프레임 번호×페이지 크기+변위다. 변환 전에 접근 권한과 존재 여부도 확인해야 한다. 페이지 부재는 단순한 산술 계산만으로 해결되는 사건이 아니다.

## 예제 문제 · 창작

페이지 크기는 1024바이트, 논리 주소는 2500, 해당 페이지가 매핑된 프레임은 7이다. 페이지 번호·변위·물리 주소는?

## 풀이와 판단 근거

2500을 1024로 나눈 몫은 2, 나머지는 452다. 프레임 7의 시작 주소 7168에 452를 더하면 7620이다. 페이지 번호 2와 프레임 번호 7을 같은 값으로 취급하지 않는다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```python
page_size = 1024
page, offset = divmod(2500, page_size)
frame = 7
print(page, offset)
print(frame * page_size + offset)
```
{% endraw %}

## 실행 결과

```text
2 452
7620
```

## 헷갈린 부분과 주의점

크기가 1024바이트라면 변위는 0~1023이다. 시작 주소와 마지막 주소의 경계를 한 칸 넘기지 않는다.

## 복습 문제

페이지 크기가 2의 거듭제곱이면 어떤 장점이 있을까?

**풀이:** 주소 비트를 페이지 번호와 변위로 나누어 계산하기 쉽다.

## 참고한 문서

[개념·API의 원문 자료](https://pages.cs.wisc.edu/~remzi/OSTEP/vm-paging.pdf)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/information-processing/33-deadlock/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/information-processing/35-network-layers/' | relative_url }})
