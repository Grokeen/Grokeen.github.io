---
layout: content
title: "[파이썬 공부 68] logging으로 실행 수준별 기록 남기기"
date: 2021-08-15 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 68
study_unit: 6
permalink: /study/2021/python/68-logging/
---

모든 상태를 print로 출력하는 대신 정보와 경고를 구분했다. 센서 프로그램이 오래 실행될 때 필요한 기록 방식을 연습했다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

logging은 DEBUG·INFO·WARNING·ERROR 등 수준을 가진 기록을 제공한다. 로거 수준보다 낮은 기록은 걸러진다. 핸들러는 출력 목적지, 포매터는 모양을 정한다. 예제에서는 별도 로거와 표준 출력 핸들러를 사용해 실행 결과를 명확히 했다.

## 따라 해 보기

{% raw %}
```python
import logging
import sys

logger = logging.getLogger("study")
logger.setLevel(logging.INFO)
logger.propagate = False
handler = logging.StreamHandler(sys.stdout)
handler.setFormatter(logging.Formatter("%(levelname)s: %(message)s"))
logger.addHandler(handler)
logger.debug("상세 자료")
logger.info("측정 시작")
logger.warning("값 누락")
```
{% endraw %}

## 실행 결과

```text
INFO: 측정 시작
WARNING: 값 누락
```

## 코드를 따라 읽기

DEBUG는 INFO보다 낮아 출력되지 않는다. WARNING은 더 높은 수준이라 보인다. propagate=False는 상위 로거에도 전달되어 중복 표시되는 일을 막는다. 실제 운영에서는 파일 회전과 보존 기간도 정하고, 기록 자체가 저장 공간을 채우지 않도록 해야 한다.

## 헷갈린 부분과 주의점

반복해서 핸들러를 추가하면 같은 로그가 여러 번 출력될 수 있다. 비밀번호·토큰 같은 값은 디버깅 목적이라도 기록하지 않는다.

## 복습 문제

로거 수준을 ERROR로 올리면 현재 두 메시지는 보일까?

**풀이:** 보이지 않는다. INFO와 WARNING 모두 ERROR보다 낮다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/library/logging.html)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: unittest로 정상값과 오류 경로 확인하기]({{ '/study/2021/python/67-unittest/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: argparse로 명령행 옵션 읽기 →]({{ '/study/2021/python/69-argparse/' | relative_url }})
