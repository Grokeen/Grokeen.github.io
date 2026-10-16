# 자격증 개념 노트 작성 기록

정보처리기사 40편·빅데이터분석기사 32편을 2021~2023년 날짜로 재구성했다. 각 글은 개념, 창작 문제, 풀이 근거, 주의점, 복습 문제와 공식 출처를 제공한다. 실제 응시·합격 이력을 주장하지 않으며 실제 기출문제의 연도·회차를 붙이지 않는다.

## 범위의 근거

- 정보처리기사: Q-Net의 [2020~2022 출제기준](https://q-net.or.kr/cst006.do?id=cst00602&gSite=Q&gId=&artlSeq=5205254&brdId=Q006&code=1202) 및 [2023~2025 출제기준](https://q-net.or.kr/cst006.do?artlSeq=5210765&brdId=Q006&gSite=Q&id=cst00602)의 실제 HWP 첨부 본문을 읽고 설계·DB·프로그래밍·운영체제·네트워크·보안을 정리했다.
- 빅데이터분석기사: [한국데이터산업진흥원 2022 안내](https://www.dataq.or.kr/www/dataq_brochure_2022.pdf)의 기획·탐색·모델링·결과 해석 범위를 참고했다. 현재 환경이나 시험 운영을 과거와 동일하다고 가정하지 않는다.
- 주요 개념의 학습 자료이며 두 시험의 모든 세부 출제 항목을 대체하는 완전한 교재로 표시하지 않는다.

## 예제 환경과 검증

Python 3.9, NumPy 1.20.3, pandas 1.2.5, SciPy 1.6.3, scikit-learn 0.24.2를 사용한다. 빅데이터 실습은 이 버전들이 출시된 이후인 2021년 7월부터 배치했다. pandas의 과거 HTML 문서 중 실제 접근이 불가능한 주소는 공식 저장소의 v1.2.5 태그 자료로 교체했다.

`scripts/validate-certification-notes.py`는 실제 게시글의 코드 블록을 추출한다. Python은 별도 임시 디렉터리에서 실행하고 출력과 대조하며 SQL은 메모리 SQLite에서 반환 행을 검증한다. C11·Java 8 예제는 컴파일러가 있을 때 컴파일·실행한다. CI에서는 컴파일러 누락을 허용하지 않는다. 코드가 없는 개념 문제는 풀이의 전제와 용어를 원문 자료에 따라 검토했다.

```bash
python3.9 -m venv .jekyll-local/cert-env
.jekyll-local/cert-env/bin/python -m pip install --only-binary=:all: -r scripts/requirements-certification-2021.txt
.jekyll-local/cert-env/bin/python scripts/validate-certification-notes.py --require-compilers
```

Windows 임베디드 Python 검증에서는 `STUDY_CERT_PACKAGES`를 패키지가 풀린 절대 디렉터리로 지정할 수 있다. 과거 라이브러리를 사이트 실행 환경 전체에 설치하지 않고 검증 전용 환경으로 격리한다.

Jekyll 빌드 후 Node 검사로 72개 파일·날짜·제목·목차·본문·코드 보존·출처·내부 탐색 링크를 확인한다. 파일 목록과 기대 출력은 [명세](CERTIFICATION_2021_2023_MANIFEST.json)에 기록했다. README와 청첩장 파일은 변경하지 않는다.
