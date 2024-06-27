---
layout: content
title:  "[Github Blog] 깃허브 블로그 로컬 서버 실행"
date:   2023-06-03 12:45:29 +0900
categories: Github
pin: false
---



[참고](https://stackoverflow.com/questions/20381128/installing-homebrew-on-macos)


According to the Homebrew site, to install it, I need to type:

brew install wget
I get an error message:

-bash: brew: command not found
Found this answer. The problem, however, is I don't see brew in /usr/local/bin.

I added the below line to my .bashrc file

export PATH=/usr/local/bin:$PATH
Still getting the command not found error.

How do I install Homebrew on macOS?




/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"



[참고2](https://stackoverflow.com/questions/66666134/how-to-install-homebrew-on-m1-mac)