---
layout: content
title: "[파이썬 공부 33] 기본 인자와 변경 가능한 기본값의 함정"
date: 2021-04-20 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 33
study_unit: 3
permalink: /study/2021/python/33-default-arguments/
---

선택 인자를 추가하면서 리스트를 기본값으로 두면 호출끼리 값이 공유되는 이유를 정리했다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

기본 인자 값은 함수가 정의될 때 평가된다. 따라서 빈 리스트를 기본값으로 적으면 매 호출마다 새 리스트가 만들어지지 않는다. 독립된 목록이 필요하면 기본값을 None으로 두고 함수 안에서 새로 만든다. 키워드 인자로 호출하면 각 값의 역할도 잘 드러난다.

## 따라 해 보기

{% raw %}
```python
def add_note(note, notes=None):
    if notes is None:
        notes = []
    notes.append(note)
    return notes

print(add_note("변수"))
print(add_note("함수"))
existing = ["반복문"]
print(add_note("조건문", notes=existing))
```
{% endraw %}

## 실행 결과

```text
['변수']
['함수']
['반복문', '조건문']
```

## 코드를 따라 읽기

앞의 두 호출은 각자 새 목록을 만들어 값이 섞이지 않는다. 마지막 호출은 기존 목록을 명시적으로 전달해 그 객체에 항목을 추가한다. 함수가 입력 객체를 수정한다는 성질도 함께 메모했다. 원본 보존이 필요하면 함수 내부에서 복사하도록 계약을 바꾼다.

## 헷갈린 부분과 주의점

None 검사 대신 if not notes를 쓰면 전달한 빈 리스트도 새 객체로 바뀐다. 빈 목록과 인자 미지정을 구분해야 할 때 is None을 사용한다.

## 복습 문제

notes=[]를 기본값으로 두면 왜 기록이 누적될 수 있을까?

**풀이:** 함수 정의 시 만든 같은 리스트 객체를 다음 호출에서도 기본값으로 사용하기 때문이다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/tutorial/controlflow.html#default-argument-values)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: return과 조기 종료로 예외 상황 나누기]({{ '/study/2021/python/32-return-guard/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: 별표 인자로 여러 값 받기와 펼쳐 호출하기 →]({{ '/study/2021/python/34-args/' | relative_url }})
