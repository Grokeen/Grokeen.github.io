# 2020 Java·Spring 학습 노트

총 80편(Java 40, Spring 40)으로 사용자 상한 200편 이내다. Java는 2020-01-01~09-30, Spring은 10-01~12-31의 재구성 학습 날짜다. Spring Boot 2.3.4.RELEASE·Framework 5.2.9.RELEASE와 Java 11을 사용한다.

## 실행과 검증 범위

Java 예제는 각각 독립적인 Main.java이며 javac --release 11로 컴파일한 뒤 40개 표준 출력을 실제 본문과 대조했다. Spring 예제는 공개 Markdown의 전체 StudyTest.java를 추출해 버전 고정 POM으로 40개 JUnit 검사를 실행했다. 생성자 주입·범위·설정·이벤트·검증·MVC·오류·필터·Mockito·JDBC·트랜잭션을 다룬다. HTTP는 MockMvc, DB는 매번 새로 만든 인메모리 H2다.

로컬 JDK는 Temurin 11.0.32.1, Maven은 3.6.3이다. 최신 보안 패치가 적용된 Java 11 실행기로 검사했으며 2020년 배포 바이너리 전체를 재현했다는 뜻은 아니다. Boot 의존성 버전은 2.3.4 부모 POM으로 고정했다.

```bash
python3 scripts/validate-java-spring-notes.py
npm test
```

검사 스크립트는 원본 게시글을 컴파일하며 별도 복제 코드를 검사하지 않는다. source-checks에서 고유 공식 링크 71개가 HTTP 200임을 확인했다. 사이트 검사는 목차 80편과 홈·게시판 노출, 코드 보존, 해설, 앞뒤 링크를 확인한다. 실제 서버 인증·외부 DB·운영 배포 안전성은 이 학습 예제의 검증 범위가 아니다.

파일별 날짜·출처·기대 출력은 [목록](JAVA_SPRING_2020_MANIFEST.json)에 둔다. README와 청첩장, 기존 삭제 파일은 유지한다.
