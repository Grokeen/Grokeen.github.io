---
layout: content
title: "[정보처리기사 40] 해시·암호화·인증의 목적 구별"
date: 2023-12-20 09:00:00 +0900
categories: [InformationProcessingCertification]
tags: [자격증학습, 정보처리기사]
series: study-certifications-2021-2023
study_track: information-processing
study_order: 40
study_unit: 8
permalink: /study/certifications/2021-2023/information-processing/40-hash-encryption-auth/
---

복호화할 수 없는 해시와 키로 되돌리는 암호화를 분리했다. 무결성 확인 예제가 비밀번호 저장 설계가 되지는 않았다.

> 2021~2023년 정보처리기사 학습 범위의 개념을 정리한 자료다. 날짜는 학습 순서에 맞춰 재구성했으며, 아래 문제는 **실제 기출문제가 아닌 창작 연습문제**다.

## 오늘 정리한 개념

암호화는 기밀성을 위해 키로 평문과 암호문을 변환한다. 해시는 입력에서 고정 길이 요약을 구하며 동일 입력은 동일 결과를 만들지만 원문 복원이 목적이 아니다. 인증은 주장한 신원이나 메시지의 출처를 확인하는 절차다. 단순 해시는 공격자가 원문과 해시를 함께 바꾸는 상황에서 출처를 증명하지 못한다.

## 예제 문제 · 창작

두 파일의 바이트가 같을 때 SHA-256 결과를 비교하면 무엇을 확인하는 예제가 되는가? 이 코드를 비밀번호 저장에 그대로 써도 되는가?

## 풀이와 판단 근거

여기서는 동일 입력의 해시 일치와 입력 변경에 따른 차이를 관찰한다. 해시 일치가 수학적으로 충돌 불가능함을 뜻하지 않는다. 비밀번호에는 salt와 작업 비용을 적용한 비밀번호 전용 키 유도 함수 등 검증된 설계가 필요하므로 빠른 SHA-256 단독 저장으로 일반화하지 않는다.

## 코드로 확인하기

아래 코드는 이 글의 합성 자료만 사용한다. Python 예제는 별도 파일로 저장해 실행하고, SQL 예제는 SQLite 메모리 DB에서 실행할 수 있다.

{% raw %}
```python
import hashlib

a = hashlib.sha256(b"study").digest()
b = hashlib.sha256(b"study").digest()
c = hashlib.sha256(b"study!").digest()
print(a == b)
print(a == c)
print(len(a))
```
{% endraw %}

## 실행 결과

```text
True
False
32
```

## 헷갈린 부분과 주의점

해시를 암호화라고 부르거나 해시만으로 작성자 인증이 끝났다고 보지 않는다. 신뢰한 해시의 전달 경로도 중요하다.

## 복습 문제

공격자가 파일과 게시된 해시를 둘 다 바꾸면 단순 비교로 출처를 보장할까?

**풀이:** 보장하지 못한다. 신뢰한 배포 경로나 서명·MAC 등 목적에 맞는 인증 수단이 필요하다.

## 참고한 문서

[개념·API의 원문 자료](https://docs.python.org/3.9/library/hashlib.html)

설명과 문제는 위 자료의 개념을 바탕으로 직접 구성했다. 시험 일정·응시 요건·현재 출제 범위는 해당 기관의 최신 공고를 별도로 확인한다.

---

[전체 학습 목차]({{ '/study/certifications/2021-2023/' | relative_url }})

[← 이전 개념]({{ '/study/certifications/2021-2023/information-processing/39-parameterized-query/' | relative_url }})

[다음 개념 →]({{ '/study/certifications/2021-2023/big-data/01-analysis-question/' | relative_url }})
