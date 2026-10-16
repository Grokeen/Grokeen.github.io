---
layout: content
title: "[파이썬 공부 35] 키워드 인자와 별표로 설정을 명확히 받기"
date: 2021-04-27 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 35
study_unit: 3
permalink: /study/2021/python/35-kwargs-keyword-only/
---

비슷한 숫자 인자가 많을 때 이름으로 전달하는 편이 읽기 좋았다. 꼭 이름을 적어야 하는 키워드 전용 인자도 사용했다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

정의에서 * 뒤에 있는 매개변수는 키워드로만 전달한다. **options는 추가 키워드 인자를 딕셔너리로 모은다. 호출에서 **mapping을 쓰면 딕셔너리를 이름 있는 인자로 펼친다. 설정 항목이 정해져 있으면 명시적인 매개변수로 받아 오타를 빨리 발견하는 편이 좋다.

## 따라 해 보기

{% raw %}
```python
def describe(name, *, unit="C", **options):
    label = options.get("label", "측정")
    return f"{label}: {name} ({unit})"

print(describe("온도"))
settings = {"unit": "%", "label": "현재"}
print(describe("습도", **settings))
```
{% endraw %}

## 실행 결과

```text
측정: 온도 (C)
현재: 습도 (%)
```

## 코드를 따라 읽기

unit은 키워드 전용이라 unit=`"%"`처럼 전달해야 한다. label은 options 안에서 읽는다. settings를 **로 펼치면 키가 인자 이름이 된다. name은 여전히 위치 인자로 전달할 수 있으므로 필수 대상과 선택 설정의 역할이 분리된다.

## 헷갈린 부분과 주의점

같은 인자에 위치와 키워드로 두 값을 전달하면 TypeError가 난다. **options가 모든 오타를 받아 버리는 구조인지도 확인한다.

## 복습 문제

`describe("온도", "F")`가 실패하는 이유는?

**풀이:** unit이 키워드 전용이므로 두 번째 위치 인자로 받을 수 없기 때문이다. unit=`"F"`라고 적어야 한다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/tutorial/controlflow.html#keyword-only-arguments)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: 별표 인자로 여러 값 받기와 펼쳐 호출하기]({{ '/study/2021/python/34-args/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: 지역 변수와 바깥 범위, nonlocal 이해하기 →]({{ '/study/2021/python/36-scope/' | relative_url }})
