# GitHub Pages 404 원인과 배포 구성

## 확인한 원인

2026-10-16 확인 당시 Pages의 `build_type`은 `workflow`, 게시 대상은 `main`의 루트였다. Actions는 활성화돼 있었지만 저장소에는 `.github/workflows/`의 배포 파일이 없었고 워크플로 실행 수도 0이었다. 공개 사이트는 GitHub Pages의 404를 반환했다.

Pages를 GitHub Actions 방식으로 설정한 뒤에는 소스 푸시만으로 정적 사이트가 배포되지 않는다. 빌드 결과를 업로드하고 게시하는 워크플로가 필요하다. 이전 확인은 로컬 빌드·실행과 원격 커밋 일치까지만 다뤘고 공개 배포를 검증하지 못했다.

## 수정한 구성

[pages.yml](../.github/workflows/pages.yml)은 다음 과정을 수행한다.

1. `main` 푸시 또는 수동 실행으로 시작한다.
2. Ubuntu 24.04에서 Ruby 3.3, `Gemfile.lock`의 gem과 Node.js 24 의존성을 설치한다.
3. Pages의 공개 주소와 기본 경로를 읽어 임시 Jekyll 설정으로 전달한다.
4. Jekyll로 `.jekyll-local/site/`를 생성하고 자동 검사를 실행한다.
5. 생성한 정적 파일만 Pages 아티팩트로 업로드한다.
6. 빌드가 성공하면 `github-pages` 환경으로 배포한다.

빌드 작업은 저장소·Pages 읽기 권한을 사용하고 배포 작업에만 `pages: write`, `id-token: write`를 부여한다. 로컬 설정 파일은 사용하지 않는다. Jekyll 4.3.4는 `--url` 옵션을 지원하지 않으므로 URL을 임시 설정 파일에 넣는다.

## 운영 확인

- 저장소 **Settings → Pages → Source**: **GitHub Actions**
- 실행 결과: **Actions → Build and deploy GitHub Pages**의 `build`, `deploy`
- 재배포: 해당 워크플로의 **Run workflow**
- 성공 확인: 공개 홈페이지·게시판·게시글·CSS·JavaScript의 HTTP 응답과 내용 확인

청첩장 관련 파일과 작업 전 다른 경로에서 삭제돼 있던 파일은 이 수정에 포함하지 않는다. 빌드 점검은 별도의 Git 체크아웃에서도 수행해 로컬의 기존 삭제 상태에 의존하지 않도록 한다.

## 전체 소스 재검증에서 확인한 사항

- 원격 소스의 옛 GPT 활용 글 한 개가 이미 제거된 개인 면접 이미지 두 개를 참조했다. 해당 글은 로컬에서 삭제된 상태였기 때문에 이전 로컬 검사에서는 나타나지 않았다. 로컬 파일의 삭제 상태는 보존하고 `_config.yml`의 제외 목록에 이 글을 명시해 공개 배포되지 않도록 했다.
- Git의 줄바꿈 변환으로 체크아웃한 Markdown이 CRLF가 될 수 있었다. 본문 검사에서 LF와 CRLF를 모두 허용하도록 정리했다. 실제 내용과 게시 조건은 동일하게 검사한다.

## 참고

- [GitHub 공식 문서: 사용자 지정 Pages 워크플로](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [워크플로 실행 목록](https://github.com/Grokeen/Grokeen.github.io/actions/workflows/pages.yml)

## 배포 전 검증 결과

- Git 커밋에서 별도로 추출한 전체 소스로 운영 주소를 적용해 Jekyll 빌드 성공.
- 일반 게시글·정적 자산·홈 기능·스크랩·청첩장 검사 18개 모두 통과.
- 워크플로 YAML 문법 검사 통과.
- README는 프로젝트 소개·기능·구성만 남기고 개발 결과를 별도 문서로 이동.

## 공개 배포 확인 결과

- 2026-10-16: [첫 자동 배포 실행](https://github.com/Grokeen/Grokeen.github.io/actions/runs/38827844449)의 `build`와 `deploy` 모두 성공.
- GitHub Ubuntu 러너에서도 자동 검사 18개 통과.
- [공개 홈페이지](https://grokeen.github.io/) HTTP 200과 미니홈피 HTML 확인.
- 홈페이지에 연결된 게시글 200개를 포함해 총 210개 공개 URL의 HTTP 200 응답 확인. 홈페이지·게시판·청첩장·피드·사이트맵·주요 CSS·JavaScript·이미지를 포함한다.
- 경제신문 스크랩이 공개 목록에 나타나고, 개인 면접 이미지를 참조하던 제외 글은 목록에 없는 것을 확인.
- 배포용 피드·사이트맵은 공개 도메인을 사용하며 localhost 주소가 포함되지 않는다. 내부 문서와 원본 `_posts` 디렉터리는 배포하지 않는다.
