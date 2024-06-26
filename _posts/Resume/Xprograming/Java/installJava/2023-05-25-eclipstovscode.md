---
layout: content
title:  "[Java] Window Eclips에서 M1 Mac VS code로 Spring 프로젝트 옮기기"
date:   2023-05-25 12:45:29 +0900
categories: Java
pin: false
---



두 번째, DB를 옮겨보자.
================
Mac에서 Oracle 데이터베이스를 설치하고 설정하는 방법은 다음과 같습니다:

## Oracle 홈페이지에서 다운로드:
맥에서 Oracle 데이터베이스를 설치하려면 Oracle 홈페이지(https://www.oracle.com/database/technologies/oracle-database-software-downloads.html)에 접속하여 다운로드 페이지로 이동합니다.
"Oracle Database" 섹션에서 원하는 버전의 Oracle 데이터베이스를 선택합니다.
주로 "Oracle Database Express Edition (XE)" 또는 "Standard Edition 2" 버전을 사용합니다.
해당 버전에 대한 macOS 용 설치 파일을 다운로드합니다.

## 설치:
다운로드한 설치 파일을 실행하여 Oracle 데이터베이스 설치 마법사를 시작합니다.
마법사의 지시에 따라 설치 옵션을 선택합니다. 일반적으로 기본 옵션을 그대로 사용할 수 있습니다.

## 데이터베이스 구성:
설치가 완료되면 터미널을 열고 sqlplus 명령어를 실행하여 SQL*Plus 클라이언트를 실행합니다. 이를 통해 데이터베이스에 연결할 수 있습니다.

## sys 사용자로 로그인하려면 다음과 같은 명령을 실행합니다:
sqlplus sys as sysdba
패스워드를 설정하고, 데이터베이스의 이름, 포트 등의 구성을 진행합니다.

## 데이터베이스 시작 및 정지:
Oracle 데이터베이스를 시작하려면 다음 명령을 실행합니다:
csharp

SQL> 
startup

## 데이터베이스를 정지하려면 다음 명령을 실행합니다:
arduino

SQL> 
shutdown

## SQL Developer 설치(선택 사항):
Oracle 데이터베이스와 상호 작용하기 위해 Oracle SQL Developer를 설치할 수 있습니다. 
SQL Developer는 데이터베이스 관리 및 쿼리 도구로 사용됩니다.
Oracle 홈페이지(https://www.oracle.com/tools/downloads/sqldev-downloads.html)에서 SQL Developer를 다운로드하고 설치합니다.


위 단계를 따라하면 맥에서 Oracle 데이터베이스를 설치하고 설정할 수 있습니다. 
Oracle 데이터베이스는 기업 환경에서 많이 사용되며, 많은 기능과 유연성을 제공합니다. 설정 및 관리에는 일정한 경험이 필요할 수 있으므로, 설치 및 구성에 어려움을 겪는다면 Oracle 공식 문서와 관련 가이드를 참조하는 것이 좋습니다.