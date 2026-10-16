---
layout: content
title: "[파이썬 공부 20] 딕셔너리 갱신으로 단어 빈도 세기"
date: 2021-03-08 09:00:00 +0900
categories: [Python]
tags: [2021학습노트, 파이썬]
series: study-2021
study_track: python
study_order: 20
study_unit: 2
permalink: /study/2021/python/20-dictionary-counting/
---

같은 단어가 몇 번 등장했는지 직접 누적해 보았다. get의 기본값이 처음 만나는 키를 처리할 때 도움이 됐다.

> Python 3.9 기준. 코드를 `example.py`로 저장해 `python3 example.py`로 실행한다.

## 오늘 정리한 개념

카운터를 딕셔너리로 만들면 항목 이름을 키로, 횟수를 값으로 둘 수 있다. `counts.get(word, 0)`으로 기존 횟수나 0을 읽고 1을 더해 다시 대입한다. `items()`는 키와 값의 쌍을 순회하게 해 준다. 입력 처리와 결과 출력 반복문을 분리하면 흐름이 명확하다.

## 따라 해 보기

{% raw %}
```python
words = ["pi", "python", "pi", "gpio"]
counts = {}
for word in words:
    counts[word] = counts.get(word, 0) + 1
for word, count in counts.items():
    print(word, count)
counts.update({"gpio": 3})
print(counts["gpio"])
```
{% endraw %}

## 실행 결과

```text
pi 2
python 1
gpio 1
3
```

## 코드를 따라 읽기

첫 pi에서는 키가 없으므로 0 + 1을 저장한다. 두 번째 pi에서는 기존 1에 더해 2가 된다. update는 기존 gpio 값을 전달한 3으로 덮어쓴다. 누적해서 더하는 코드와 새 값으로 갱신하는 코드가 다르다는 점을 구분했다.

## 헷갈린 부분과 주의점

딕셔너리를 순회하는 중에 키를 추가하거나 삭제하면 RuntimeError가 날 수 있다. 별도 목록을 만들거나 반복이 끝난 뒤 구조를 변경한다.

## 복습 문제

`counts.update({"pi": 5})`를 실행하면 pi 횟수는 7이 될까?

**풀이:** 아니다. update는 합산하지 않고 값을 교체하므로 5가 된다.

## 참고한 문서

[Python 3.9 공식 문서](https://docs.python.org/3.9/library/stdtypes.html#dict.update)에서 관련 문법과 API를 확인할 수 있다. 설명과 예제는 학습용으로 구성했다.

---

[← 이전 학습: 딕셔너리로 이름과 값을 연결하기]({{ '/study/2021/python/19-dictionaries/' | relative_url }})

[전체 학습 목차]({{ '/study/2021/' | relative_url }})

[다음 학습: 집합으로 중복 제거와 공통 항목 찾기 →]({{ '/study/2021/python/21-sets/' | relative_url }})
