---
layout: content
title: "[GitHub 공부] 백준 풀이를 문제별로 정리하는 방법"
date: 2024-04-26 09:00:00 +0900
categories: [CodingTest]
permalink: /github/백준과깃허브연동/
---

기존 연동 메모를 문제별 풀이와 검증 기록을 관리하는 방법으로 정리했다. 2024년 학습 날짜를 재구성한 글이며 특정 계정의 실제 제출 이력을 나타내지 않는다.

## 문제별 폴더와 설명

풀이 파일과 설명을 같은 문제 번호 아래에 모으면 나중에 다시 찾기 쉽다. 설명에는 접근 방식·복잡도·반례·직접 실행한 결과를 적는다. 원문은 링크하고 문제 문장 전체를 그대로 복사하지 않는다.

```text
solutions/
  boj-7562/
    Main.java
    NOTES.md
```

## 로컬 실행

```bash
javac --release 11 -encoding UTF-8 Main.java
java -Dfile.encoding=UTF-8 Main
```

직접 만든 입력과 기대 출력을 비교한다. 시작과 목표가 같은 경우, 답이 없는 경우, 인덱스 경계처럼 알고리즘의 가정을 확인하는 예제를 추가한다. 로컬 예제 통과와 온라인 채점 결과는 구분해 기록한다.

## 변경 확인과 커밋

```bash
git status --short
git diff -- solutions/boj-7562/Main.java
git add -- solutions/boj-7562/Main.java solutions/boj-7562/NOTES.md
git diff --cached
git commit -m "Add knight movement BFS study"
git push
```

경로와 브랜치는 자신의 저장소에 맞게 선택한다. 결과 파일·개인정보·접근 토큰이 포함되지 않았는지 변경 내용을 읽고 필요한 파일만 추가한다. 외부 확장 프로그램의 제출 자동 업로드는 권한과 유지보수 상태를 확인한 뒤 별도로 선택한다.

## 원문과 채점 상태

2026년 10월 확인 당시 [백준 공식 홈페이지](https://www.acmicpc.net/)는 채점 서비스 준비 안내를 표시했다. 현재 이용 가능 여부를 과거 학습 날짜의 상태로 오해하지 않는다. 이 과정은 수동으로 풀이와 공부 기록을 관리하는 방법이다.

[GitHub 공식 커밋 안내](https://docs.github.com/en/get-started/using-git/about-git) · [백준 학습 목차](/study/2024/baekjoon/)
