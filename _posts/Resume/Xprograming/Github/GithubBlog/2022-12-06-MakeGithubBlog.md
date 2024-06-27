---
layout: content
title:  "[Github Blog] 나만의 블로그 만들기"
date:   2022-12-06 12:45:29 +0900
categories: Github
pin: false
---



맥북에서 깃허브 블로그를 로컬 서버로 실행하는 방법은 다음과 같습니다.
==========


# 1. Ruby 설치:
## 1. 터미널을 열고 다음 명령을 실행하여 Homebrew를 설치합니다:
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

## 2. 다음으로 Ruby를 설치합니다. 터미널에서 다음 명령을 실행하세요:
    brew install ruby

## 3. Ruby 설치가 완료되면 버전을 확인합니다:
    ruby --version


# 2. Bundler 설치:
## 1. 터미널에서 다음 명령을 실행하여 Bundler를 설치합니다:
    gem install bundler


# 3. 깃허브 블로그 저장소 클론:
## 1. 깃허브 블로그 저장소를 원하는 디렉토리로 클론합니다. 터미널에서 다음 명령을 실행하세요:
    git clone https://github.com/사용자명/블로그저장소.git
    여기서 사용자명과 블로그저장소는 귀하의 깃허브 사용자명과 블로그 저장소 이름으로 대체해야 합니다.


# 4. 의존성 설치:
## 1. 저장소 디렉토리로 이동한 후 다음 명령을 실행하여 필요한 의존성을 설치합니다:
    cd 블로그저장소
    bundle install


# 5. 로컬 서버 실행:
## 1. 다음 명령을 실행하여 깃허브 블로그를 로컬 서버에서 실행합니다:
    bundle exec jekyll serve

## 2. 에러 정리:
### " Jekyll 4.3.1   Please append `--trace` to the `serve` command for any additional information or backtrace."
    위 같은 에러는 추가 정보 또는 추적 정보를 보려면 serve 명령 뒤에 --trace를 추가하라는 내용이다.
    bundle exec jekyll serve --trace

### "in `load': dump format error for symbol(0x45) (ArgumentError)"
    명령어를 입력하니 위 같은 에러 내용이 나왔다. 

# 6. 확인:
    로컬 서버가 실행되면 터미널에 URL 정보가 표시됩니다. 기본적으로 http://localhost:4000로 접속할 수 있습니다.
    웹 브라우저에서 http://localhost:4000에 접속하여 로컬 서버에서 깃허브 블로그를 확인할 수 있습니다.
    변경 사항을 저장하고 브라우저에서 새로고침하면 로컬 서버에서 자동으로 반영됩니다.
     
## 아래 설치가 완료되면 "2022-12-06-welcome-to-jekyll.md"이 생성된 걸 알 수 있습니다.

    1) 
    You’ll find this post in your `_posts` directory. 
    Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, 
    but the most common way is to run `jekyll serve`, which launches a web server and auto-regenerates your site when a file is updated.

    2) Jekyll requires blog post files to be named according to the following format:

    3) 파일 형식, `YEAR-MONTH-DAY-title.MARKUP`

    4) 
    Where `YEAR` is a four-digit number, `MONTH` and `DAY` are both two-digit numbers, 
    and `MARKUP` is the file extension representing the format used in the file. 
    After that, include the necessary front matter. 
    Take a look at the source for this post to get an idea about how it works.

    5) Jekyll also offers powerful support for code snippets:

    6)
    {% highlight ruby %}
    def print_hi(name)
      puts "Hi, #{name}"
    end
    print_hi('Tom')
    #=> prints 'Hi, Tom' to STDOUT.
    {% endhighlight %}

    7) 
    Check out the [Jekyll docs][jekyll-docs] for more info on how to get the most out of Jekyll. 
    File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh].
    If you have questions, you can ask them on [Jekyll Talk][jekyll-talk].

    8) 추가적으로
    [jekyll-docs]: https://jekyllrb.com/docs/home
    [jekyll-gh]:   https://github.com/jekyll/jekyll
    [jekyll-talk]: https://talk.jekyllrb.com/

