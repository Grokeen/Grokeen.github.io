# 2021 학습 노트 작성·검증 기록

## 구성과 작성 기준

- 게시글 108편: 파이썬 72편, 라즈베리파이 36편.
- 게시 날짜: 2021-01-04 ~ 2021-12-27. 기존 글을 변경하지 않고 날짜순 학습 과정으로 재구성했다.
- 위치: `_posts/Study2021/Python/`, `_posts/Study2021/RaspberryPi/`.
- 공개 목차: `/study/2021/`. 홈페이지 게시판과 전체 게시글 목록에서 연결한다.
- 각 글은 개념·예제·출력 또는 장비 확인 방법·코드 해설·주의점·복습 문제와 풀이·공식 문서 링크를 포함한다.
- 실제 2021년 일기나 장비 실험을 수행했다는 주장을 추가하지 않는다. 날짜를 재구성한 학습 노트라는 점을 목차에 표시한다.

파이썬은 Python 3.9를 기준으로 하며 3.10 이후의 match, zip의 strict, `T | None` 같은 문법을 섞지 않았다. 라즈베리파이는 40핀 Raspberry Pi 3/4, Raspberry Pi OS Buster, Python 3.7 문법, GPIO Zero 1.6.2 API를 기준으로 한다. GPIO Zero 1.6.2는 [변경 기록](https://gpiozero.readthedocs.io/en/v1.6.2/changelog.html)에 따라 2021-03-18 공개 버전이며 관련 글은 그 이후 날짜다. [Bullseye 공개](https://www.raspberrypi.com/news/raspberry-pi-os-debian-bullseye/) 이후에도 실습 기준을 Buster로 유지했다. 과거 학습 환경을 설명하는 기준이며 현재 설치 환경의 지원 상태를 뜻하지 않는다.

공식 문서의 개념과 API를 대조하고 학습용 설명과 예제를 작성했다. 출처는 Python Software Foundation, GPIO Zero, Raspberry Pi, pySerial 및 Debian에서 제공하는 매뉴얼이다. GNU 사이트를 이 환경에서 읽을 수 없었던 셸·권한 설명은 Debian Buster의 해당 패키지 매뉴얼로 연결했다. 출처별 URL과 게시글 정보는 [목록 파일](STUDY_2021_MANIFEST.json)에 기록한다.

## 검증

`scripts/validate-study-notes.py`는 게시글에 실린 코드 자체를 추출한다.

- Python 코드 93개: 구문 검사. 라즈베리파이 코드는 Python 3.7 문법 제한으로도 검사한다.
- 장비 없이 실행 가능한 Python 예제 77개: 별도 임시 폴더에서 실행하고 입력·기대 출력·게시글의 출력 예제까지 대조한다. 로컬 검증 인터프리터는 Python 3.9.1이다.
- 장비가 필요한 Python 예제 16개: 구문만 검사한다. 실제 GPIO·센서·UART 출력이나 전기적 동작을 검증하지 않았다.
- 셸 예제 13개: `bash -n`으로 구문만 검사한다. SSH 접속·패키지 설치·장비 설정 변경은 실행하지 않는다.
- cron·systemd 예제 2개: 구성 형식만 확인한다. 예약·서비스를 등록하지 않는다.
- 생성 사이트 검사: 108편의 개수·날짜·제목·목차·본문·코드·출처·앞뒤 학습 링크·홈페이지 및 목록 노출을 확인한다.

코드 실행 검사는 표준 라이브러리만 사용한다. GitHub Pages 빌드에서도 아래 검사를 수행하며, 실행 환경의 Python 버전은 빌드 로그에서 확인할 수 있다.

```bash
python3 scripts/validate-study-notes.py --require-bash
npm test
```

장비 실습의 실제 반응과 최신 보드·OS에서의 호환성은 별도 확인이 필요하다. 청첩장, README의 프로젝트 소개, 기존 작업 폴더에 남아 있던 다른 글의 삭제 상태는 변경하지 않았다.
