---
layout: content
title: "[파이썬 공부 72] 작은 종합 실습: 측정값을 검증하고 요약하기"
date: 2021-08-28 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 72
study_unit: 6
permalink: /study/2021/python/72-python-mini-project/
---

앞에서 배운 함수·조건·자료형·통계를 합쳐 모의 측정 자료를 정리했다. 실제 센서 대신 고정 입력으로 계산 부분부터 확인했다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

입력 정리, 검증, 계산, 출력의 역할을 나누면 장치를 나중에 붙여도 계산 함수를 재사용할 수 있다. 여기서는 문자열을 수치로 바꾸되 0~50 범위만 허용한다. 누락값과 잘못된 형식은 제외하고 유효 데이터가 하나도 없을 때는 별도 결과를 반환한다.

## 따라 해 보기

{% raw %}
```python
from statistics import mean

def parse_temperature(text):
    try:
        value = float(text)
    except (TypeError, ValueError):
        return None
    return value if 0 <= value <= 50 else None

def summarize(raw_values):
    values = []
    for text in raw_values:
        value = parse_temperature(text)
        if value is not None:
            values.append(value)
    if not values:
        return "유효한 측정 없음"
    return f"개수 {len(values)}, 평균 {mean(values):.1f}, 최고 {max(values):.1f}"

print(summarize(["20", "22", "오류", "80", None, "24"]))
print(summarize(["오류"]))
```
{% endraw %}

## 실행 결과

```text
개수 3, 평균 22.0, 최고 24.0
유효한 측정 없음
```

## 코드를 따라 읽기

정상값 20·22·24만 남아 개수 3과 평균 22가 된다. 80은 형식은 숫자지만 범위를 벗어나 제외한다. None과 글자는 변환 오류로 처리한다. None 검사를 명시했으므로 유효한 0도 보관한다. 단위와 범위는 이 실습의 가정이며 모든 센서의 일반 규칙은 아니다.

## 헷갈린 부분과 주의점

오류를 제외했다는 사실을 운영 프로그램에서 완전히 숨기면 장치 문제를 놓칠 수 있다. 실제 수집기에서는 제외 횟수와 원인도 함께 기록한다.

## 복습 문제

입력이 [`"0"`, `"10"`]일 때 평균은?

**풀이:** 5.0이다. 0은 유효한 범위값이므로 빠뜨리면 안 된다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/tutorial/errors.html)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: subprocess.run으로 외부 프로그램 결과 받기]({{ '/study/2021/python/71-subprocess/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: 보드 모델과 운영체제부터 확인하기 →]({{ '/study/2021/raspberry-pi/01-model-os/' | relative_url }})
