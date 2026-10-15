# 로컬 서버 실행 가이드

- 문서 작성 일시: 2026-10-04 15:33:14 KST (한국 표준시, UTC+09:00)
- 저장소: https://github.com/OWNER/REPOSITORY
- 작업 폴더: `C:\projects\mini-homepage`
- 기본 접속 주소: http://localhost:4000

## 1. 실행 환경

현재 PC에는 아래 환경과 프로젝트 의존성 설치가 완료되어 있습니다.

| 항목 | 설치·사용 버전 |
| --- | --- |
| Ruby | 3.3.12, x64-mingw-ucrt |
| Bundler | 2.5.22 |
| Jekyll | 4.3.4 |
| Windows 컴파일 도구 | RubyInstaller에 포함된 MSYS2 Devkit |

Ruby 설치 경로는 `C:\tools\Ruby33-x64`입니다. 실행 스크립트는 PATH에 있는 Ruby를 먼저 찾고, 없으면 상위 `tools\Ruby33-x64`, 시스템 드라이브의 `Ruby33-x64`, 사용자 프로그램 폴더를 확인합니다.

Ruby가 없는 PC에서는 다음 명령으로 Ruby 3.3과 Devkit을 설치한 뒤 새 PowerShell 창을 엽니다.

```powershell
winget install --id RubyInstallerTeam.RubyWithDevKit.3.3 --exact --source winget --scope user
```

## 2. 작업 폴더 열기

PowerShell에서 다음 명령을 실행합니다.

```powershell
Set-Location "C:\projects\mini-homepage"
```

아래 명령들은 이 폴더에서 실행합니다.

## 3. 백그라운드 실행

PowerShell 창을 닫은 뒤에도 서버를 계속 실행하려면 다음 명령을 사용합니다.

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\start-server.ps1 -Background
```

스크립트는 의존성을 검사하고, 빠진 gem을 `vendor/bundle`에 설치한 다음 사이트를 빌드합니다. 빌드 후 포트가 열리면 `Running http://localhost:4000` 메시지를 표시합니다. 이번 확인에서는 초기 빌드에 약 48~59초가 걸렸습니다.

브라우저에서 http://localhost:4000 을 엽니다. 서버는 현재 PC의 `127.0.0.1`에 바인딩됩니다.

컴퓨터를 재부팅한 뒤에는 실행 명령을 다시 입력합니다.

## 4. 종료와 재시작

백그라운드 서버 종료:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\stop-server.ps1
```

재시작:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\stop-server.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File .\start-server.ps1 -Background
```

이미 실행 중인 서버가 있으면 시작 스크립트는 해당 서버의 PID를 표시하고 종료합니다. 설정을 바꾼 뒤에는 종료 후 다시 실행해야 합니다.

## 5. 로그를 보면서 실행

백그라운드 서버가 있다면 먼저 종료한 뒤 다음 명령을 사용합니다.

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\start-server.ps1
```

이 모드에서는 PowerShell 창에 빌드·실행 로그가 표시됩니다. 종료하려면 해당 창에서 `Ctrl+C`를 누릅니다.

## 6. 다른 포트 사용

기존 백그라운드 서버를 종료하고 원하는 포트로 시작합니다.

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\stop-server.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File .\start-server.ps1 -Background -Port 4001
```

이 경우 접속 주소는 http://localhost:4001 입니다. 종료 명령은 동일합니다.

## 7. 생성 파일과 로그

| 경로 | 용도 |
| --- | --- |
| `.jekyll-local/site/` | 로컬 서버가 제공하는 빌드 결과 |
| `.jekyll-local/production-site/` | 배포용 주소로 생성한 정적 사이트 빌드 결과 |
| `.jekyll-local/server.log` | 백그라운드 실행의 일반 로그 |
| `.jekyll-local/server-error.log` | 백그라운드 실행의 오류·경고 로그 |
| `.jekyll-local/server.pid` | 백그라운드 서버를 관리하는 PID |
| `.bundle/config` | 프로젝트의 Bundler 설정 |
| `vendor/bundle/` | 프로젝트에 설치된 gem |

백그라운드 로그 확인:

```powershell
Get-Content .\.jekyll-local\server.log -Encoding UTF8 -Tail 40
Get-Content .\.jekyll-local\server-error.log -Encoding UTF8 -Tail 40
```

일반 로그를 계속 확인하려면:

```powershell
Get-Content .\.jekyll-local\server.log -Encoding UTF8 -Tail 20 -Wait
```

로그는 백그라운드 서버를 다시 시작할 때 새로 기록됩니다. 생성 파일과 설치된 gem은 `.gitignore`에 등록되어 있습니다.

## 8. 수정한 내용 반영

게시글·HTML·CSS 파일을 저장하면 Jekyll이 사이트를 자동으로 다시 빌드합니다. 빌드가 끝난 뒤 브라우저를 새로고침합니다.

`_config.yml`, `_config.local.yml`, `Gemfile`, `Gemfile.lock` 또는 실행 스크립트를 수정한 경우에는 서버를 재시작합니다.

## 9. 실행 상태 확인과 문제 해결

홈페이지가 HTTP 200으로 응답하는지 확인합니다.

```powershell
(Invoke-WebRequest -Uri "http://localhost:4000/" -UseBasicParsing -TimeoutSec 10 -ErrorAction Stop).StatusCode
```

| 메시지·현상 | 확인 방법 |
| --- | --- |
| `Ruby was not found` | Ruby+Devkit 설치 여부와 Ruby 설치 경로를 확인하고 새 PowerShell 창에서 실행합니다. |
| `Port 4000 is already in use` | 다른 프로그램이 포트를 사용 중인지 확인하거나 `-Port 4001`로 실행합니다. |
| `Jekyll failed to start` | `.jekyll-local/server-error.log`에서 빌드 오류를 확인합니다. |
| `Jekyll is still starting` | 시작 확인 제한 시간은 120초입니다. 로그에서 빌드 진행 상황을 확인합니다. |
| 기존 게시글의 레이아웃 누락·URL 중복 경고 | 게시글의 레이아웃과 permalink를 확인합니다. |

이번 작업에서 홈페이지, 메뉴 페이지, CSS, 이미지, 피드와 사이트맵의 HTTP 200 응답을 확인했습니다. 자세한 변경 내역은 [업데이트 기록](UPDATE_HISTORY.md)을 참고합니다.

## 10. 배포용 빌드와 GitHub 업로드

배포용 빌드는 로컬 설정을 제외하고 `_config.yml`만 사용합니다. `url`에 배포 주소를 입력해야 하며, 시간대는 `Asia/Seoul`입니다.

Ruby가 PATH에 등록되어 있지 않은 현재 PC에서는 먼저 다음 명령을 실행합니다. 다른 PC에서는 설치한 Ruby의 `bin` 경로를 사용합니다.

```powershell
$env:Path = "C:\tools\Ruby33-x64\bin;$env:Path"
```

저장소 폴더에서 배포용 정적 HTML·CSS·JavaScript·이미지를 생성합니다.

```powershell
$env:JEKYLL_ENV = "production"
bundle exec jekyll build --config _config.yml --destination .jekyll-local/production-site
Remove-Item Env:\JEKYLL_ENV
```

결과는 `.jekyll-local/production-site/`에 생성됩니다. 실행 중인 로컬 서버 결과를 덮어쓰지 않습니다. `_site/`는 Git에서 제외합니다. 실행 스크립트, 문서, 설치된 gem과 임시 파일은 배포용 출력에서 제외합니다.

검증한 소스와 이미지·문서를 커밋한 뒤 업로드합니다.

```powershell
git add .
git diff --cached --check
git commit -m "Update wedding invitation"
git push origin main
```

`.jekyll-local/`의 빌드 결과와 원본 테스트 이미지는 Git에서 제외합니다. 2026-10-06 확인 기준 이 저장소에는 GitHub Pages가 설정되어 있지 않습니다. GitHub 업로드 후 웹사이트를 공개하려면 저장소의 **Settings → Pages**에서 게시 방식을 별도로 설정해야 합니다.
