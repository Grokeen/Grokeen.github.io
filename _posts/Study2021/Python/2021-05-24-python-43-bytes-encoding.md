---
layout: content
title: "[파이썬 공부 43] str과 bytes, UTF-8 인코딩 구분하기"
date: 2021-05-24 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 43
study_unit: 4
permalink: /study/2021/python/43-bytes-encoding/
---

문자 수와 저장되는 바이트 수가 같지 않다는 점을 확인했다. 파일이나 통신을 다룰 때 필요한 경계였다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

str은 유니코드 텍스트, bytes는 바이트 값들의 순서다. encode는 텍스트를 지정한 인코딩의 바이트로 바꾸고 decode는 반대로 읽는다. 한글 두 글자를 UTF-8로 표현하면 각 코드 포인트가 여러 바이트가 될 수 있다. 송신자와 수신자가 같은 인코딩 규칙을 사용해야 한다.

## 따라 해 보기

{% raw %}
```python
text = "온도"
payload = text.encode("utf-8")
print(len(text))
print(len(payload))
print(payload.decode("utf-8"))
print(type(payload).__name__)
```
{% endraw %}

## 실행 결과

```text
2
6
온도
bytes
```

## 코드를 따라 읽기

text는 두 코드 포인트이고 이 예제의 UTF-8 표현은 여섯 바이트다. 같은 인코딩으로 decode하면 원래 텍스트로 돌아온다. bytes를 다시 `str(payload)`로 바꾸는 것은 디코딩과 다르다. 통신 길이 제한이나 파일 크기는 문자 수와 구별해서 계산한다.

## 헷갈린 부분과 주의점

잘못된 인코딩으로 읽으면 UnicodeDecodeError나 깨진 문자열이 생긴다. errors=`"ignore"`로 무조건 무시하면 데이터 손실을 알아채기 어렵다.

## 복습 문제

ASCII 문자 `"A"`의 UTF-8 바이트 길이는?

**풀이:** 1바이트다. 문자마다 UTF-8에서 차지하는 길이가 같지는 않다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/library/stdtypes.html#binary-sequence-types-bytes-bytearray-memoryview)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: `__name__`과 main 가드로 실행 코드 분리하기]({{ '/study/2021/python/42-main-guard/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: pathlib로 경로를 문자열 덧셈 대신 조합하기 →]({{ '/study/2021/python/44-pathlib/' | relative_url }})
