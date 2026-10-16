---
layout: content
title: "[파이썬 공부 12] strip, split, join으로 텍스트 정리하기"
date: 2021-02-09 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 12
study_unit: 1
permalink: /study/2021/python/12-string-methods/
---

쉼표로 들어온 항목을 정리하는 예제를 만들었다. 문자열 메서드가 원본을 바꾸지 않고 새 문자열을 준다는 점도 함께 확인했다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

`strip()`은 양 끝 공백을 제거하고 `split()`은 구분자를 기준으로 목록을 만든다. `join()`은 문자열 목록 사이에 구분자를 넣어 하나로 연결한다. `replace()`와 `lower()` 역시 새 문자열을 반환한다. 입력 정리와 목록 변환을 작은 단계로 나누면 어디서 값이 달라졌는지 찾기 쉽다.

## 따라 해 보기

{% raw %}
```python
raw = "  Apple, Banana, Kiwi  "
clean = raw.strip()
items = clean.split(", ")
print(items)
print(" / ".join(items))
print(clean.lower())
print(raw.startswith("  "))
```
{% endraw %}

## 실행 결과

```text
['Apple', 'Banana', 'Kiwi']
Apple / Banana / Kiwi
apple, banana, kiwi
True
```

## 코드를 따라 읽기

strip으로 가장자리 공백만 제거한 뒤 쉼표와 공백을 함께 구분자로 사용했다. join은 items의 각 문자열 사이에 /를 넣는다. 마지막 결과가 True인 이유는 raw에 원래 공백이 남아 있기 때문이다. 정리된 값을 사용하려면 반환값을 저장해야 한다.

## 헷갈린 부분과 주의점

`strip("ab")`는 접두사 ab를 통째로 지우는 기능이 아니라 양 끝의 a와 b 문자들을 제거한다. join에는 숫자가 아닌 문자열 항목이 필요하다.

## 복습 문제

[`"온도"`, `"습도"`]를 `"온도,습도"`로 합치는 식은?

**풀이:** `","`.`join(["온도", "습도"])`이다. 구분자 문자열에서 join을 호출한다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/library/stdtypes.html#string-methods)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: 인덱스와 슬라이싱, 끝 위치는 포함하지 않기]({{ '/study/2021/python/11-slicing/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: f-string으로 숫자와 단위를 읽기 좋게 출력하기 →]({{ '/study/2021/python/13-f-strings/' | relative_url }})
