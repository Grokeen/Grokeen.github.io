---
layout: content
title:  "[Github Blog] 깃허브 블로그 로컬 서버 실행"
date:   2023-06-03 12:45:29 +0900
categories: Github
pin: true
---


GITHUB 로컬 서버에서 실행시키기
===

깃허브 블로그를 계속 작성은 했었다. 그런데 서버에 올라가지 않는다. 귀찮아서 오류 해결을 하지 않았었다. 오늘 끝내주마 껄껄

# 정리
## Gemfile이라는 파일에 아래 네 줄 추가
~~~
gem 'jekyll-paginate'
gem 'jekyll-sitemap'
gem 'jekyll-gist'
gem 'jekyll-include-cache'
~~~
## 아래 갱신/서버실행 명령어 입력
~~~
bundle install
bundle exec jekyll serve
~~~



# 로컬 서버 실행
깃허브 블로그는 Jekyll이라는 정적 사이트 생성기를 사용합니다. 따라서 Jekyll을 설치해야 합니다. Ruby와 RubyGems가 미리 설치되어 있어야 합니다. 설치되어 있지 않다면 해당 도구를 먼저 설치해야 합니다.

## Ruby와 RubyGems가 설치되었다면, 다음 명령어를 사용하여 Jekyll과 관련된 종속성을 설치합니다:
~~~
gem install bundler jekyll
~~~
## 종속성 설치가 완료되면, 다음 명령어를 사용하여 로컬 서버를 실행합니다:
~~~
bundle exec jekyll serve
~~~
### 첫 번째 오류 발생
~~~
Configuration file: /Users/kim-yongrok/Github_Blog/Grokeen.github.io/_config.yml
                    ------------------------------------------------
      Jekyll 4.3.1   Please append `--trace` to the `serve` command 
                     for any additional information or backtrace. 
                    ------------------------------------------------
~~~
이 에러는 _config.yml라는 파일에 문제가 있는 듯 싶다. 'serve' 뒤에 '--trace'를 붙여서 다시 해본다:
~~~
bundle exec jekyll serve --trace
~~~
### 두번 째 오류 발생, 어디서 부터 잘 못 된 걸까
bundler: failed to load command: jekyll (/usr/local/bin/jekyll)

이 에러는 Bundler가 jekyll 명령어를 로드하지 못했음을 나타냅니다. Bundler는 프로젝트의 종속성을 관리하는 도구로서, Jekyll과 관련된 종속성을 올바르게 설치하고 로드해야 한다.

#### Bundler가 설치되어 있는지 확인합니다. Bundler가 설치되어 있지 않다면 다음 명령어를 사용하여 설치합니다:
~~~
sudo gem install bundler
~~~
#### Bundler를 사용하여 Jekyll과 관련된 종속성을 설치합니다. 깃허브 블로그 저장소의 루트 디렉토리(예: /Users/kim-yongrok/Github_Blog/Grokeen.github.io)로 이동한 후 다음 명령어를 실행합니다:
~~~
bundle install
~~~
이 명령어는 Gemfile과 Gemfile.lock 파일을 기반으로 필요한 종속성을 설치합니다.

#### 설치가 완료되면 jekyll 명령어를 다시 실행해 봅니다:
~~~
bundle exec jekyll serve
~~~
### 세번 째 오류 발생, 아까랑 똑같지만 다른 에러
~~~
Your RubyGems version (3.0.3.1) has a bug that prevents `required_ruby_version` from working for Bundler. Any scripts that use `gem install bundler` will break as soon as Bundler drops support for your Ruby version. Please upgrade RubyGems to avoid future breakage and silence this warning by running `gem update --system 3.2.3`
~~~
위 에러는 친절하게 다른 버전을 설치하는 방법을 알려준다:
~~~
sudo gem update --system 3.2.3
~~~
이후에 'bundle exec jekyll serve'를 다시 해준다.

### 네번 째 오류, 아놔 첫 번째 오류랑 같다.ㅋ
Chat GPT의 힘을 빌렸다. 오류문을 스크랩해서 줬더니, 에러의 원인은 jekyll-4.3.1 버전의 jekyll/cache.rb 파일에서 발생한 것으로 보입니다. 더 구체적으로는 load 함수의 호출에서 dump format error가 발생하여 에러가 발생했다고 알려줬다.

#### Jekyll의 캐시를 삭제해 보세요. 다음 명령어를 실행하여 Jekyll의 캐시를 지웁니다:
~~~
bundle exec jekyll clean
~~~

#### Bundler를 사용하여 Jekyll과 관련된 종속성을 다시 설치합니다. 깃허브 블로그 저장소의 루트 디렉토리로 이동한 후 다음 명령어를 실행합니다:
~~~
bundle install
~~~
#### 위 단계를 마치면 다시 bundle exec jekyll serve 명령을 실행해 보세요. 새로운 캐시가 생성되며 문제가 해결되었을 것입니다.
~~~
bundle exec jekyll serve
~~~
#### 또한, 만약 위 단계가 도움이 되지 않는다면 Jekyll 및 Bundler를 최신 버전으로 업데이트해 보는 것도 고려해 볼 수 있습니다. 다음 명령어를 실행하여 최신 버전으로 업데이트할 수 있습니다:
~~~
gem update jekyll bundler
~~~

### 다섯 번 째 오류 발생, 'jekyll-paginate'가 없다는 거 같은데
~~~
  Dependency Error: Yikes! It looks like you don't have jekyll-paginate or one of its dependencies installed. In order to use Jekyll as currently configured, you'll need to install this gem. If you've run Jekyll with `bundle exec`, ensure that you have included the jekyll-paginate gem in your Gemfile as well. The full error message from Ruby is: 'cannot load such file -- jekyll-paginate' If you run into trouble, you can find helpful resources at https://jekyllrb.com/help/! 
                    ------------------------------------------------
      Jekyll 4.3.1   Please append `--trace` to the `serve` command 
                     for any additional information or backtrace. 
                    ------------------------------------------------

~~~
#### Gemfile을 열어서 jekyll-paginate gem이 명시적으로 포함되어 있는지 확인:
~~~
find / -name Gemfile(비추)
~~~
회사에서 사용하던 방식으로 찾아봤는데 너무 많이 나온다...
아 확인해보니 github 블로그 하위 디렉토리에 저 파일이 존재했다.

#### 만약 없다면, Gemfile라는 파일에서 가장 아래에 gem 'jekyll-paginate' 줄을 추가해라:
~~~
gem 'jekyll-paginate'
~~~
#### 다시 bundle install 명령을 실행하여 종속성을 설치한다:
~~~
bundle install
~~~

#### bundle exec jekyll serve 명령을 실행하여 Jekyll을 다시 시작.
~~~
bundle exec jekyll serve
~~~
### 여섯 번 째 오류 발생, 도루마무인가... 첫번 째 오류 발생
~~~
Configuration file: /Users/kim-yongrok/Github_Blog/Grokeen.github.io/_config.yml
  Dependency Error: Yikes! It looks like you don't have jekyll-sitemap or one of its dependencies installed. In order to use Jekyll as currently configured, you'll need to install this gem. If you've run Jekyll with `bundle exec`, ensure that you have included the jekyll-sitemap gem in your Gemfile as well. The full error message from Ruby is: 'cannot load such file -- jekyll-sitemap' If you run into trouble, you can find helpful resources at https://jekyllrb.com/help/! 
                    ------------------------------------------------
      Jekyll 4.3.1   Please append `--trace` to the `serve` command 
                     for any additional information or backtrace. 
                    ------------------------------------------------
~~~
이번엔 뭔 sitemap 이라는 녀석이다. 다시 반복해본다.

#### Gemfile라는 파일에서 가장 아래에 gem 'jekyll-paginate' 줄을 추가해라:
~~~
gem 'jekyll-sitemap'
~~~
#### 다시 bundle install 명령을 실행하여 종속성을 설치한다:
~~~
bundle install
~~~
#### bundle exec jekyll serve 명령을 실행하여 Jekyll을 다시 시작.
~~~
bundle exec jekyll serve
~~~

### 여섯 번 째 오류 발생. 이번에 jekyll-gist 이 녀석... 고지가 눈 앞이다:
~~~
gem 'jekyll-gist' 추가

bundle install
bundle exec jekyll serve
~~~
### 일곱 번 째 오류 발생. jekyll-include-cache 도루마무 이 자식 처음부터 알려 주던가...
~~~
gem 'jekyll-include-cache' 추가

bundle install
bundle exec jekyll serve
~~~
### 여덟 번 째 오류 발생. 오 성과가 있다. 다른 애러가 발생했다.
내가 작성한 마크 다운 중에 날짜 문제가 있다고 한다.
2022-12-0\28 라고 적어 놨는데 \가 문제인 거 같다.
마크다운 처음을 대부분 복붙으로 해놨더니 생각보다 많은 파일을 저렇게 작성했었다.

모두 수정 완료....

왓더 뻐어어어어어어어억 
성공했다!!!!!


## 로컬 서버가 실행되면 커맨드 라인에 서버가 실행 중인 주소(http://127.0.0.1:4000 또는 http://localhost:4000)가 표시된다.
웹 브라우저에서 해당 주소를 열면 깃허브 블로그가 로컬 서버에서 실행되는 것을 확인할 수 있다:

http://localhost:4000

### 하 또 오류냐 페이지가 안 보인다.
#### 첫 번째 오류 발생, ERROR `/favicon.ico' not found.
간단히 새로운 파일 만들고 'favicon.ico'로 이름을 바꿔줬다. 다시 로컬서버로 접속해보니 오류는 없다. 그러나 아무 화면이 안 나온다.

index.html 내부에 경로 지정이라도 해줘야 하나? 개꿀잼 몰카가 아닌가 싶다.

#### 두 번째 오류 발생, Option + Command + I
[Error] Failed to load resource: You do not have permission to access the requested resource.

단축키로 브라우저(맥북 사파리)에 오류 확인하려고 보니까 소스를 엑세스 할 권한이 없다는데? 지랄도 병이다.

Option + Command + E

로 캐시를 삭제 시켜줘 봤다. 추가적으로 모든 브라우저를 종료했다.

#### 세 번째 오류 발생, 갑자기 로그에 애플 뭐시기 발생
~~~ 
[2023-06-03 16:37:01] ERROR `/apple-touch-icon-precomposed.png' not found.
[2023-06-03 16:37:01] ERROR `/apple-touch-icon.png' not found.
~~~
이건 사파리 이것 저것 누르니까 자동으로 사라졌다. 크롬에서 돌려봤는데 똑같이 아무 화면이 안 나오고 오류 문도 없다.

#### 네 번째 오류 발생, 알아 버렸다. 노란 글씨로 나와서 에러가 아닌 줄 알았다.
~~~
Build Warning: Layout 'post' requested in _posts/2022-12-06-welcome-to-jekyll.md does not exist.
~~~

이런 식으로 에러가 나온다.

예를 들어
~~~
'---
layout: post
title:  "Github Blog(3)"
date:   2023-06-03 12:45:29 +0900
categories: person update
---'
~~~
각 마크다운 마다 '2023-06-03-GithubBlog(3).md' 제목과 날짜와 내부에 작성한 제목과 날짜가 달라서 난 거 같아 노가다로 수정해줬다. 
실패 1, 여전히 오류가 발생한다.

혹시 몰라 /GithubBlog/_Layout 이라는 디렉토리를 만들고, post,home,default 등 추가 하위 디렉토리를 만들어 줬다. 
실패 2, 서버 재시작 해도 똑같다.

아. 알았다. 서버는 정상적으로 실행 중인게 맞다. /GithubBlog/index.html과 index.md 를 수정하면 흰 화면에 반영된다. 아까 보니 서버 실행을 위한 _config.yml 파일이 리셋 됐나 보다.

#### 실행
~~~
bundle exec jekyll serve
~~~
#### 서버 실행시 포트 중복 오류(Ex:4000)
~~~
lsof -i :4000
~~~
#### 다른 포트로 실행시키는 법
~~~
bundle exec jekyll serve --port 3000
~~~



대체 몇 일을 썼을까,
_layout에서 _layouts로 변경하니 인식된다.

 Liquid 템플릿 문법을 숙지해야 한다는 것을 알았다.


[운영서버 로그 확인](https://github.com/Grokeen/Grokeen.github.io/actions)
