---
layout: content
title:  "[지피터스]ChatGPT를 활용한 Google SEO 글쓰기 활용 사례 및 경험 공유"
date:   2023-08-17 12:45:29 +0900
categories: GPTers
pin: true
---

지피터스([GPTers](https://www.gpters.org/c/contents/chatgpt-google-seo))에서 흥미로웠던 글을 가져왔다.


# Creating a markdown file with the provided content

google_seo_markdown_content = """
# 개인적으로도 블로그 작성에 관심이 많고 그중에서도 Google SEO 블로그에 관심이 많습니다.

Google SEO GPT활용 사례와 경험들을 정리 해보았습니다.

## 일반 블로그와 다르게 Google SEO 블로그의 경우

### 주제선정 > 키워드 조사 및 목표 키워드 선정 > 제목선정 > 글 작성 순서가 중요하다고 생각이 되는데요

원하는 주제나 키워드는 있다고 가정하고 ChatGPT에게 도움 받을수 있는 부분이

- 키워드 조사 및 목표 키워드 선정
- 제목선정
- 글 작성 초안

이라고 생각이 되어 아래의 순서로 정리를 해보았습니다.

먼저 시작하기전에 아래와 같이 custom instruction 에 지정 합니다.
<img src="/img/blogimg/GPTers-GoogleSEO/1-1.png" style="height:500px"><img src="/img/blogimg/GPTers-GoogleSEO/1-2.png" style="height:500px"><br>

실제 개발을 할때는 system prompt 라는걸 사용하는데 custom instruction 기능이 나와서 chatgpt에서도 쉽게 활용 할수 있습니다.

### 1) 키워드 조사 및 목표 키워드 선정

키워드 조사를 할때는 키워드를 추천해달라고 하기 보다는 keyword volume과 keyword difficulty 를 같이 알려달라고 하면 조금더 좋은 키워드를 제안 해줍니다. 참고로 semrush 의 실제 값과 비료를 해보면 차이가 나는데 keyword volume과 keyword difficulty를 넣어주는것만으로 일반적인 프롬프트 보다 SEO에 맞는 키워드가 제안 되었습니다.

<img src="/img/blogimg/GPTers-GoogleSEO/1-3.png" style="height:500px"><img src="/img/blogimg/GPTers-GoogleSEO/1-4.png" style="height:500px"><br>

custom instruction 에 입력하기에는 글자 제한이 있어 따로 사용 했지만 custom instruction 에 넣어 사용 할수 있습니다.

### 2) 제목선정

키워드를 고르고 아래와 같이 블로그 제목을 요청 합니다.

custom instruction 덕분에 요구사항에 맞게 작성을 잘 해줍니다.
<img src="/img/blogimg/GPTers-GoogleSEO/1-5.png" style="height:500px"><br>

### 3) 글 작성 초안

그 다음으로는 meta와 outline을 요청 합니다.

custom instruction 덕분에 쉽게 가능 합니다.
<img src="/img/blogimg/GPTers-GoogleSEO/1-6.png" style="height:500px"><br>

Meta 와 Outline이 작성 되었으니 이번에는 블로그 글을 작성해달라고 합니다.

‘위의 meta 와 outline을 기반으로 '개발자 공부 방법: 프로젝트 기반 학습' 블로그 글을 작성해줘.’

역시 custom instruction의 도움으로 SEO 요구사항에 맞는 글을 작성 해줍니다.
<img src="/img/blogimg/GPTers-GoogleSEO/1-7.png" style="height:500px"><br>

이렇게 블로그 작성 방법을 알아보았는데요 ChatGPT로 원하는 주제가 있고 블로그를 쓰고 싶은 사람이라면

- 키워드 조사
- 제목 고르기
- 블로그 초안 작성

이 너무 쉬워졌습니다.

결국 가장 중요한것은 블로그를 쓰고 싶은 의지, 그리고 ChatGPT가 만들어준 초안을 잘 다듬고 편집 하는 역량이 중요 해졌습니다. 한편 저작권에 민감함하거나 출처 표시가 필요한 내용의 경우 보완이 필요하다는 생각이 들었습니다.

그리고 위에서 얘기한 순서대로 키워드 조사 부터 초안 까지 작성하여 다운받을수 있는 간단한 프로토타입도 만들어봤습니다.

[데모 사이트](https://www.magicaiprompts.com/projects/blog-flow)



1) 키워드 조사
<img src="/img/blogimg/GPTers-GoogleSEO/1-8.png" style="height:500px"><br>

2) 제목선정
<img src="/img/blogimg/GPTers-GoogleSEO/1-9.png" style="height:500px"><br>

3) outline 및 초안 작성
<img src="/img/blogimg/GPTers-GoogleSEO/1-10.png" style="height:500px"><img src="/img/blogimg/GPTers-GoogleSEO/1-11.png" style="height:500px"><br>


아직 프로토타입 수준이라 부족한 부분이 많지만 구글 SEO 블로그 작성하고자 하시는 분들에게 도움이 되셨으면 좋겠습니다.

혹시라도 [이 링크](https://www.magicaiprompts.com/projects/blog-flow) 사용해서 키워드 조사 해보신분 있으시면 실제 키워드 조사 결과의 volume과 keyword difficulty 도 확인 해드려보겠습니다.

성과도 궁금하신 분들이 있으실텐데 4개월전에 만든 블로그인데 Google SEO만으로 월 10,000명 가까이 방문하는 사이트가 되었습니다.
<img src="/img/blogimg/GPTers-GoogleSEO/1-12.png" style="height:500px"><br>

[본문 작성자님 링크](https://www.magicaiprompts.com/blog/google-seo-blog-writing-with-chatgpt)


