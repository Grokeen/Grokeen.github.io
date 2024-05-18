

# 로컬서버 실행 방법
```
bundle exec jekyll serve
```
로컬에서 실행해도 github 운영서버에 올릴 시, jekyll에 의해 로컬에서 작성한 css가 깨질 수 있음.
이 부분 수정 필요.

## 안될 시, bundle install로 종속해줘야 함
(#비밀번호는 컴퓨터 잠금번호)

```
bundle install
```


<!-- 
온라인 수익화 분석 및 불법 수익 창출을 위한 블로그 활용 등의 개발자 윤리, 깃허브 블로그
===

****

- 초록 :

    이 프로젝트는 블로그를 활용하여 불법 서비스 광고를 통해 상당한 수익을 창출한 개발자의 사례를 탐구한다. 보안 및 코딩 방법을 포함하여 사이트 운영의 기술적 측면을 자세히 살펴보고 이러한 활동이 미치는 광범위한 사회 경제적, 윤리적 영향을 조사한다. 본 프로젝트는 불법 활동에 블로그를 사용하는 동기를 이해하고 개인과 사회에 미칠 잠재적인 결과에 대해 논의하는 것을 목표로 한다.

****

- 개요 :

    인터넷은 개인이 소득을 얻을 수 있는 경로를 크게 확장했다. 그러나 이는 또한 불법적인 온라인 활동에 대해서도 마찬가지로 광범위한 가능성을 열어 놓았다. 이 프로젝트에서는 블로그가 성매매 서비스와 불법 도박을 호스팅하고 광고하기 위한 플랫폼으로 사용되어 상당한 수익을 창출한 것으로 알려진 구체적인 사례를 보여준다. 그러한 활동의 ​​윤리적 고려 사항, 그러한 운영 설정의 용이성 및 잠재적인 사회적 영향을 조사한다.


****

- 본론 : 

    50대 개발자가 귀농한 척 하고 시골에서 성매매 알선 사이트로 75억 벌었다고 예전에 뉴스에서 봤다. 75억을 벌어드린 사이트 방식이 궁금하더라.
    구글링 하면 사이트들이야 찾기 쉽다. 이런 불법 사이트가 접근성이 높다는 것도 문제다. 사이트들을 하나하나 분석했다. 이 프로젝트는 불법 콘텐츠를 호스팅하는 블로그를 통해 소득 창출로 전환한 과정에 대한 설명을 다룰 것이다.

    - 관련 뉴스

        ['귀농인?' 시골 농막, 알고보니 불법성매매 광고사이트…'범죄수익 75억'](http://www.joongang.tv/news/articleView.html?idxno=68030)


    - 발견 및 분석 : 

        75억이라는 수익 창출 방법에 대한 초기 호기심은 사이트의 접근성, 결제 기능 및 광고 메커니즘에 대한 분석으로 이어졌다. 
        불법 사이트에 결제 기능이 있는지, 배너에는 뭐가 있는지, 왜 이게 돈이 됐을지 분석했다. 개발자 모드로 웹 코드도 보려 했는데, IP 차단 당해서 아에 접속제한이 걸리더라. 그래서 우리집 IP를 VPN과 통신사 네트워크를 이용해서 우회시키니 보였다. 주석 달린 것을 보니 React인 거 같기도 하고, 근데 전반적인 에러를 보니 XMLRequest 뭐시기 에러였다. Spring할 때, 많이 보던 거다. AJax 에러다. 그렇다고 단정지을 수는 없다.

        * 확인 사항

            1. 사이트 접근성
            2. 결제 방식
            3. 광고 매커니즘
            4. 정부의 사이트 제제 및 보안

    - 사이트 분석 : 

        대단한 건 없었다. 키보드 누르는 걸 인식해 IP를 차단하는 검증 단계를 만들었을까 알아내지 못한 보안 방법이 궁금할 뿐이었다.

        그러다가 문득 보이더라. 그렇다. 너무 흔해서 못 알아볼 뻔 했다. 블로그다.

        게시글에 성매매 업소를 광고해주고, 배너로 불법도박 사이트를 광고해주면서 추가 수익을 얻는 방식이고, 배너로는 사이트당 header, footer에 적게는 15개 씩, 많게는 30개 정도 있었다.
        
        깃허브 블로그를 만들어 논 것을 문득 생각했다.

        여태 블로그를 안한 건 아니다. 네이버 블로그를 학생 때, 잠깐 했었다. 취업하기 전까지 관리했지만, 취업 이후에는 보지 않게 되더라. 보여주기 식 정말 의미 없다고 느꼈지만, 퇴사 이후에도 깃허브 블로그를 만들었었다.

        - 수익 흐름 : 

            불법 서비스에 대한 광고 배너와 게시글 등, 불법적인 정보를 제공하는 방법을 통해 블로그에서 수익을 창출

****

- 기술적 조사 : 

    문득 블로그를 A to Z로 직접 만들어 보고 싶었다. 기존에 사용한 JellyTool로 css 같은 특정 팜플렛 불러와서 할 수 도 있지만, 마음에 드는 블로그들 찾아 다니면서 CSS를 복사해 필요한 부분 만 사용했다. 그렇게 만들었더니 문제가 있다. 로컬 서버에서 정상 작동하던 CSS가 깃허브 서버에 올리는 순간 깨진다. 그게 _congfig.yml 때문인데, 로컬 서버에서는 이게 어떻게 작동하는지 확인할 방법이 없던 것이다. 기존 자바 프로젝트 처럼 로컬에서 만든 것이 컴파일 이후에 올라가는 방법이라고 만 생각했다. 

    깃허브 블로그 개설을 통해 누구나 한 번의 선택으로 범죄자가 될 수 있다는 것을 쉽게 보여준다.

    - 개발 기간 :

        개발 기간은 최소한으로 잡을 것이다. 스크럼이나 스프린트 방법론을 적용해서 해볼 것이다.
        
        *스크럼 : 비즈니스 요구에 초점을 둔 짧은 기간 개발 방법론(구현 중심)
        
        *스프린트 : 짧은 기간을 정해놓고 하는 방법론(스프린트 -> 즉시 새로운 스프린트 -> 또 다른 스프린트)

****

- 결론 :
    
    - 실행 화면 : 
        ![ㅇㅇ](/pacman.jpg)

        [사이트 들어가 보기](https://grokeen.github.io/)


    - 후기

        개발은 이미 만들어놨던 깃허브 블로그를 Jelly 사용을 최소화 하는 작업이라 오래 걸리진 않았다. 블로그를 만들어 보면서 누구나 쉽게 돈을 벌 수 있다고 생각했다. 물론 안한다. 수정한 불로그도 불법 사이트와는 무관하다. 제대로 된 가정교육 만 받았어도 불법적인 일은 안하는 것이 맞다. 근데 사회가 지금처럼 계속 어렵다면, 유혹을 이겨내지 못하고 불법적인 일에도 손 대는 사람들이 더 많아질 거라 생각하니 가슴 아팠다. 사례 연구하면서, 블로그가 어떻게 상당한 불법 이익을 위해 사용될 수 있는지 보여주는 예다. 이 프로젝트는 디지털 플랫폼의 오용을 방지하기 위한 강력한 법적 프레임워크, 개발자의 윤리 및 예방 기술의 필요성을 강조한다.
    
        인터넷은 혁신과 기업가 정신을 위한 방대한 기회를 제공하는 동시에 피해를 방지하기 위한 동등한 조치도 필요하다.

    - 해결 방법 : 

        1. 불법 사이트 접근성 저하 
        
            -> 구글링해도 쉽게 불법 사이트들을 찾을 수 있다. 이것은 이전과 다르게 인터넷을 접하기 쉬워졌다. 그렇기 때문에 자아가 성립되지 못한 유년/청소년 기 학생들에게 치명적일 것이다.

            -> LLM 모델인 ChatGP가 브라우저에서 탐색해 최적의 정보를 제공하는 방법으로 알고있다. 이 방법을 그대로 사용하면서 AI가 불법 사이트를 주기적으로 계속 제제를 걸 수 있는 방법은 없을까. 그러나 이 방법은 빅데이터분석기사 공부할 때, 나온다. 범죄를 짖기 전에 먼저 제제가 가해져 억울한 사람이 발생할 우려가 있다. 그 예로 영화 "마이너리티 리포트"가 있다.
        
        2. 성매매 합법화 
            
            -> "불법은 돈이된다" 라는 사실을 이제 누구나 찾을 수 있는 합법으로 만들어 버리는 방법이다.
        


    

****

 -->












