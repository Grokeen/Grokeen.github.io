---
layout: content
title: "[파이썬 공부 19] 딕셔너리로 이름과 값을 연결하기"
date: 2021-03-05 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 19
study_unit: 2
permalink: /study/2021/python/19-dictionaries/
---

온도와 습도에 숫자 위치 대신 이름을 붙여 보았다. 순서보다 값의 의미가 중요한 데이터에는 딕셔너리가 읽기 쉬웠다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

딕셔너리는 키를 통해 값을 찾는 매핑이다. 중괄호 안에 키: 값 형식으로 적는다. 같은 키를 다시 대입하면 값을 갱신하고 다른 키를 대입하면 새 항목이 생긴다. key in data는 값이 아니라 키의 존재를 검사한다. get은 키가 없을 때 사용할 기본값을 지정할 수 있다.

## 따라 해 보기

{% raw %}
```python
reading = {"temperature": 22, "humidity": 45}
print(reading["temperature"])
reading["temperature"] = 23
print(reading.get("pressure", "미측정"))
print("humidity" in reading)
print(list(reading.keys()))
```
{% endraw %}

## 실행 결과

```text
22
미측정
True
['temperature', 'humidity']
```

## 코드를 따라 읽기

temperature라는 키로 값을 찾고 23으로 갱신한다. pressure는 없으므로 get의 두 번째 인자가 반환된다. Python 3.7 이상에서 딕셔너리는 삽입 순서를 유지하므로 이 예제의 keys 목록도 입력 순서대로 나온다. 데이터 조회와 기본값 처리를 구분했다.

## 헷갈린 부분과 주의점

없는 키를 대괄호로 읽으면 KeyError다. 리스트처럼 변경 가능한 객체는 일반적인 딕셔너리 키로 사용할 수 없다.

## 복습 문제

`reading.get("temperature", 0)`은 현재 무엇을 반환할까?

**풀이:** 23이다. 기본값 0은 해당 키가 없을 때만 사용한다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/library/stdtypes.html#mapping-types-dict)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: 튜플과 언패킹으로 여러 값 받기]({{ '/study/2021/python/18-tuples-unpacking/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: 딕셔너리 갱신으로 단어 빈도 세기 →]({{ '/study/2021/python/20-dictionary-counting/' | relative_url }})
