---
layout: content
title:  "[부스트코스] 1주차 미션 풀이"
date:   2022-10-30 12:45:29 +0900
categories: Boost Course
pin: false
---




11월 1일까지 끝내야하는 강의 4편과 퀴즈 2개, 미션 4개가 내졌다.

<img src="/img/blogimg/BigData/BoostCourse/1WM1-1.png" style="height:auto">

```python
['Q2', 'Q3', 'Q4', 'Q5', 'Q8', 'Q9']
```

```python
# 응답 설문 문항
question = ['Q2', 'Q3', 'Q4', 'Q5', 'Q6_1', 'Q6_2', 'Q6_3', 'Q6_4', 'Q6_5', 'Q6_6',
       'Q6_7', 'Q6_8', 'Q6_9', 'Q6_10', 'Q6_11', 'Q6_12', 'Q7_1', 'Q7_2',
       'Q7_3', 'Q7_4', 'Q7_5', 'Q7_6', 'Q7_7', 'Q8', 'Q9', 'Q10_1', 'Q10_2',
       'Q10_3']
```

### 1번 문제 풀이

```python
question = ['Q2', 'Q3', 'Q4', 'Q5' , 'Q6_1' , 'Q6_2', 'Q6_3', 'Q6_4', 'Q6_5', 'Q6_6',
       'Q6_7', 'Q6_8', 'Q6_9', 'Q6_10', 'Q6_11', 'Q6_12', 'Q7_1', 'Q7_2',
       'Q7_3', 'Q7_4', 'Q7_5', 'Q7_6', 'Q7_7', 'Q8', 'Q9', 'Q10_1', 'Q10_2',
       'Q10_3']2022
```

위 사진에 문항처럼 주어진 디폴트 값을 입력한다.

```python
for i in question:
    if "_" not in i:
        print(i , end='\n')
```

for문을 question 수 만큼 돌리고, if문으로 i에 “_” 가 있다면 출력을 안하는 방법으로 풀었다. 물론 문제에 나와있는 출력 결과는 다르기 때문에 문제에 있는 방식으로 출력을 하려면 List 자체를 출력해야한다. 

```python
for i in question:
    if "_" in i:
        question.remove(i)
print(question)
```

<img src="/img/blogimg/BigData/BoostCourse/1WM1-2.png" style="height:auto">

그래서 위 방법 처럼 remove 문법을 이용하여 “_”가 존재하는 문자를 삭제하는 방식을 사용했다.

---

<img src="/img/blogimg/BigData/BoostCourse/1WM2-1.png" style="height:auto">

```python
import pandas as pd
df = pd.read_csv("https://raw.githubusercontent.com/mwaskom/seaborn-data/master/healthexp.csv")
df
```

참고

[How to reshape the layout of tables? - pandas 1.5.1 documentation](https://pandas.pydata.org/docs/getting_started/intro_tutorials/07_reshape_table_layout.html)

| Year | Canada | France | Germany | Great Britain | Japan | USA |
| --- | --- | --- | --- | --- | --- | --- |
| 2011 | 81.4 | 82.3 | 80.5 | 81.0 | 82.7 | 78.7 |
| 2012 | 81.6 | 82.1 | 80.6 | 81.0 | 83.2 | 78.8 |
| 2013 | 81.7 | 82.3 | 80.6 | 81.1 | 83.4 | 78.8 |
| 2014 | 81.8 | 82.8 | 81.2 | 81.4 | 83.7 | 78.9 |
| 2015 | 81.9 | 82.4 | 80.7 | 81.0 | 83.9 | 78.7 |
| 2016 | 82.0 | 82.7 | 81.0 | 81.2 | 84.1 | 78.7 |
| 2017 | 81.9 | 82.7 | 81.1 | 81.3 | 84.2 | 78.6 |
| 2018 | 82.0 | 82.8 | 81.0 | 81.3 | 84.3 | 78.7 |
| 2019 | 82.2 | 82.9 | 81.3 | 81.4 | 84.4 | 78.8 |
| 2020 | 81.7 | 82.3 | 81.1 | 80.4 | 84.7 | 77.0 |

### 2번 문제 풀이

강의를 제대로 보지 않았기 때문에 pivot_table()가 뭔지 몰라서 찾아봤다.

- 행 인덱스
- 열 인덱스
- 데이터 값
- 데이터 집계함수

기본 구성요소는 정리하면 이렇게 있었다.

```python
result=pivot_table(
    df,                     # 피벗할 데이터프레임
    index='coulmn_Name',    # 행 위치에 들어갈 열
    coulmns='row_Name',     # 열 위치에 들어갈 열
    values = 'Country',     # 데이터로 사용할 열
    aggfunc = 'Year'        # 데이터 집계함수
)
```

문제를 대충 해석해 보면 csv파일에 있는 연도가 첫 번째 컬럼명 기본키 자리에 나오게 해야하고

다음 컬럼으로 나라가 쭉 나와야 할 거 같다. 

그리고 값에는 라이프 뭐시기를 출력하면 될 것 같다.

#중간에 groupby와 unstack을 같이 써야 하는 줄 알고 사용하다가 정말 오래 걸렸다.

---

```python
import pandas as pd
df = pd.read_csv("https://raw.githubusercontent.com/mwaskom/seaborn-data/master/healthexp.csv")
df
```

```python
df.pivot_table(
    index='Year',
    columns= 'Country',
    values = 'Life_Expectancy',
    aggfunc="mean"
).tail(10)
```

<img src="/img/blogimg/BigData/BoostCourse/1WM2-2.png" style="height:auto">

groupy 떄문에 에러가 계속 났는데 안 써도 된다는 걸 알게 된 후로도 위에 문장을 짜는데 정말 오래 걸렸다. 

왜냐면 조건을 거는 방법을 몰랐다.

결국에는 뒤에서 부터 10개 출력하게 짰다,,,,,

<img src="/img/blogimg/BigData/BoostCourse/1WM3-1.png" style="height:auto">

### 3번 문제 풀이

너무 쉬웠다.

```python
* Pandas를 통한 파일 저장과 불러오기
    * to_csv("파일명", index=False) : csv 파일로 저장하기
    * read_csv("파일명") : csv 파일 불러오기
    * shape를 통한 행과 열의 수 보기
    * head, tail, sample 을 통한 일부 데이터 가져오기
```

```python
* DataFrame의 info(), describe() 등을 통한 요약과 기술통계 값 구하기
    * info()
    * describe()
    * nunique()
    * index
    * columns
    * values
```

```python
* Pandas의 DataFrame과 Series의 이해
    * Series : 1차원 벡터구조
    * DataFrame : 2차원 행렬구조
```

```python
* 색인하기
    * [컬럼]
    * .loc[행]
    * .loc[행, 열]
    * .loc[조건식, 열]
```

```python
* DataFrame의 데이터 타입 이해하기
    * 날짜 데이터의 변환
```

```python
* DataFrame 다루기
    * 열(column) 인덱싱
    * 행(index) 인덱싱
    * 행, 열 인덱싱
    * 정렬하기 : sort_values 사용하기
    * 조건식 사용하기
```

```python
* 빈도수 구하기
    * 한 개의 변수 : series.value_counts()
    * 두 개의 변수 : pd.crosstab()
```

```python
* groupby 와 pivot_table
    * 다양한 연산식의 사용
```

<img src="/img/blogimg/BigData/BoostCourse/1WM3-2.png" style="height:auto">

---

---

<img src="/img/blogimg/BigData/BoostCourse/1WM4-1.png" style="height:auto">

[서울특별시 강남구_생활폐기물배출량_20221019](https://www.data.go.kr/data/15107375/fileData.do)

[문자 인코딩 - 위키백과, 우리 모두의 백과사전](https://ko.wikipedia.org/wiki/%EB%AC%B8%EC%9E%90_%EC%9D%B8%EC%BD%94%EB%94%A9)

[파일을 열거나 저장할 때 텍스트 인코딩 선택](https://support.microsoft.com/ko-kr/office/%ED%8C%8C%EC%9D%BC%EC%9D%84-%EC%97%B4%EA%B1%B0%EB%82%98-%EC%A0%80%EC%9E%A5%ED%95%A0-%EB%95%8C-%ED%85%8D%EC%8A%A4%ED%8A%B8-%EC%9D%B8%EC%BD%94%EB%94%A9-%EC%84%A0%ED%83%9D-60d59c21-88b5-4006-831c-d536d42fd861)

### 4번 문제 풀이

처음에 encoding = cp949가 뭔지 몰라서 찾아봤다.

[[한글 인코딩(UTF8, CP949)]인코딩이 뭐야? 이건 무슨 에러인거야?](https://yololife-sy.medium.com/%ED%95%9C%EA%B8%80-%EC%9D%B8%EC%BD%94%EB%94%A9-utf8-cp949-%EC%9D%B8%EC%BD%94%EB%94%A9%EC%9D%B4-%EB%AD%90%EC%95%BC-%EC%9D%B4%EA%B1%B4-%EB%AC%B4%EC%8A%A8-%EC%97%90%EB%9F%AC%EC%9D%B8%EA%B1%B0%EC%95%BC-a9803fd042dd)

**CP949(확장 완성형)**

CP949는 사실 이전에 유닉스 계열에서 나온 EUC-KR에 생긴 문제를 해결하기 위해 만들어졌다. ‘MS949, WINDOWS949’라고도 불리기도 한다. 아까도 이야기 했지만, 국가별로 인코딩 방법이 다르다. (일본어는 CP932)

**UTF-8(유니코드)**

유니코드는 전 세계의 모든 문자를 컴퓨터에서 일관되게 표현할 수 있도록 고안된 코드 조합(인코딩이 아닌 문자와 2바이트 숫자와 1:1 매핑하는 방식)이다. 유니코드를 인코딩하는 방식중 하나가 UTF-8인 것이다.

이해하니까 간단했다. 한글은 출력이 안되니까 인코딩한다는 거였고

그 다음은 의외로 너무 간단했다.

<img src="/img/blogimg/BigData/BoostCourse/1WM4-2.png" style="height:auto">

위 사진 처럼 csv 파일을 저장했다. 그리고 절대경로를 이용해 불러왔다.

```python

import pandas as pd
df = pd.read_csv("Testdata/testdata1.csv" , encoding='cp949')
df
```

<img src="/img/blogimg/BigData/BoostCourse/1WM4-3.png" style="height:auto">