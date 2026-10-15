# 미니홈피

싸이월드 미니홈피의 제본 형태와 미니룸을 참고한 Jekyll 사이트입니다. 기본 화면은 개인정보가 없는 닉네임과 이미지로 구성됩니다.

## 실행

Windows에서는 Ruby 3.3과 MSYS2 Devkit을 설치한 뒤 새 PowerShell 창을 엽니다.

```powershell
winget install --id RubyInstallerTeam.RubyWithDevKit.3.3 --exact --source winget --scope user
powershell -NoProfile -ExecutionPolicy Bypass -File .\start-server.ps1 -Background
```

접속 주소: http://localhost:4000

종료:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\stop-server.ps1
```

다른 포트를 사용하려면 실행 명령에 `-Port 4001`을 추가합니다. macOS/Linux에서는 `bundle install` 후 `bundle exec jekyll serve --config _config.yml,_config.local.yml --destination .jekyll-local/site`로 실행합니다.

## 구성

- 일반 게시글: `_layouts/blog.html`, `_layouts/content.html`, `css/blog.css`
- 시작 화면: `_layouts/cyworld.html`, `css/cyworld.css`, `js/cyworld.js`
- 메뉴: 홈, 프로필, 다이어리, 사진첩, 게시판, 방명록
- 기분·스킨 선택, 달력, 제목 검색, 사진 확대, BGM 재생·곡 선택·볼륨 지원
- 다이어리·일촌평·방명록은 메모리에서만 유지되며 새로고침하면 사라집니다. 서버나 브라우저 저장소에 기록하지 않습니다.
- 방문 카운터와 도토리는 표시용으로 0을 사용합니다. 방문자 추적이나 계정 연동은 없습니다.
- 청첩장 템플릿: `/wedding/`, [사용 안내](_docs/WEDDING.md)

실행 및 배포 방법은 [실행 가이드](_docs/RUNNING.md), 변경 내역은 [업데이트 기록](_docs/UPDATE_HISTORY.md)를 참고합니다.

## 개인정보와 빌드 결과

이력서·자기소개서·지원 기록·개인 사진과 연락처는 현재 소스에서 제거했습니다. 일반 기술 문서의 개인 경로는 예시로 변경했습니다. 과거 Git 커밋은 별도로 남아 있습니다.

`_site/`와 `.jekyll-local/`은 Git에서 제외합니다. `_posts` 원문과 내부 문서는 정적 파일로 배포하지 않습니다. 배포 주소는 `_config.yml`의 `url`에 설정하세요.

## 화면 참고

[아시아경제의 과거 미니홈피 화면](https://cm.asiae.co.kr/article/2019101912224446735)을 참고해 프로필·최근 소식·미니룸·일촌평·세로 탭·BGM 플레이어를 구성했습니다. 기존 미니룸 이미지는 유지했으며 기본 미니미와 노을 그림은 SVG로 작성했습니다.

## 개발 확인

Node.js가 있는 환경에서 `npm ci`를 실행합니다. 로컬 Jekyll 빌드를 만든 뒤 `npm test`로 메뉴·입력·달력·검색·음악 제어를 검사합니다. 오디오 장치와 사진 대화상자는 DOM 테스트에서 대역을 사용합니다. 실제 브라우저의 화면 배치와 오디오 출력은 별도 확인이 필요합니다.
