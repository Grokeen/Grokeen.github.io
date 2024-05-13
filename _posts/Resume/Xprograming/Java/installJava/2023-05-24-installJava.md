---
layout: content
title:  "[Java] 맥북에 자바 설치"
date:   2023-05-24 12:45:29 +0900
categories: Java
pin: true
---


XPS를 오래 사용하다가 22년 상반기에 M1 pro를 탑재한 21년형 맥북 프로를 구매했습니다. 
윈도우 이클립스에 과거에 진행했던 Spring 프로젝트를 영상으로 만 봤던 더 유연한 Gradle로 변경하면서 옮겨 볼 것 예정입니다.

첫 번째, 맥북 vscode에서 자바 Spring 실행 및 설치 방법
================

# 1. 아래 링크 클릭하여 자바 설치
https://www.java.com/en/download/


# 2. VS Code 설치:
맥 앱 스토어 또는 Visual Studio Code 공식 웹 사이트(https://code.visualstudio.com/)에서 VS Code를 다운로드하고 설치합니다.

# 3. VS Code에 Java Extension Pack 설치:
VS Code를 열고 좌측 사이드바의 Extensions(확장) 아이콘을 클릭합니다.
검색 상자에 "Java Extension Pack"을 입력하고 해당 확장을 찾아 설치합니다.
Java Extension Pack은 Java 개발을 위한 필수 도구 및 확장을 제공합니다.

# 4. Spring Boot 프로젝트 생성:
터미널에서 Spring Boot 프로젝트를 생성할 디렉토리로 이동합니다.
## 다음 명령을 실행하여 Spring Initializr를 사용하여 프로젝트를 생성합니다:
- curl https://start.spring.io/starter.zip -o Spring_Project_Factory.zip
- 파일에 압축 풀기 : unzip Spring_Project_Factory.zip -d Spring_Project_Factory
- 현재 디렉토리에 압축풀기 : unzip Spring_Project_Factory.zip
- cd Spring_Project_Factory

# 5. 프로젝트를 VS Code에서 열기:
터미널에서 다음 명령을 실행하여 VS Code에서 프로젝트를 엽니다:
code .

# 6. VS Code에서 Spring Boot 개발:
VS Code의 왼쪽 사이드바에서 프로젝트 폴더 구조를 확인하고, Java 파일이나 리소스 파일을 엽니다.
Spring Boot 애플리케이션을 개발하고, 코드 편집, 디버깅 등의 작업을 수행합니다.

위 단계를 따라 맥북에서 VS Code에서 Spring을 사용할 수 있습니다. 또한 VS Code의 Java Extension Pack은 Spring 개발을 위한 추가 기능과 도구를 제공하기 때문에 개발 작업을 보다 효율적으로 수행할 수 있습니다.


