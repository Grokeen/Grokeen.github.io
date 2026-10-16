---
layout: content
title: "[파이썬 공부 41] import로 표준 라이브러리 불러오기"
date: 2021-05-17 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 41
study_unit: 4
permalink: /study/2021/python/41-imports/
---

다른 모듈의 기능을 쓰는 방법과 이름이 들어오는 위치를 정리했다. 모듈 이름을 함께 적으면 함수의 출처가 잘 보였다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

import math는 math라는 이름으로 모듈을 가져온다. from math import sqrt는 sqrt만 현재 범위에 연결한다. as로 별칭을 정할 수도 있다. 같은 기능이라도 호출 방식이 달라지므로 가져온 형태와 사용 형태를 맞춘다. 파이썬은 모듈 검색 경로를 따라 이름에 맞는 모듈을 찾는다.

## 따라 해 보기

{% raw %}
```python
import math
from statistics import mean
from math import factorial as fact

print(math.sqrt(81))
print(mean([2, 4, 6]))
print(fact(4))
```
{% endraw %}

## 실행 결과

```text
9.0
4
24
```

## 코드를 따라 읽기

sqrt는 math.sqrt로 호출하고 mean은 바로 호출한다. factorial은 fact라는 별칭을 사용한다. 첫 import 시 모듈의 최상위 코드도 실행될 수 있으므로 단순히 함수 이름만 복사하는 기능이라고 생각하지 않는다. 표준 라이브러리는 별도 pip 설치가 필요하지 않다.

## 헷갈린 부분과 주의점

내 파일을 math.py나 json.py로 만들면 표준 모듈을 가려 순환 import 같은 문제가 생길 수 있다. import *는 이름 충돌과 출처 추적을 어렵게 만든다.

## 복습 문제

import math 이후 `sqrt(4)`만 호출하면 될까?

**풀이:** 현재 예제에서는 안 된다. `math.sqrt(4)`로 호출하거나 sqrt를 별도로 가져와야 한다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/tutorial/modules.html)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: finally로 성공·실패와 관계없는 정리 수행하기]({{ '/study/2021/python/40-finally/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: `__name__`과 main 가드로 실행 코드 분리하기 →]({{ '/study/2021/python/42-main-guard/' | relative_url }})
