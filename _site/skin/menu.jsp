<!-- 포스트 내용 인덱스 -->

<!DOCTYPE HTML>
<html lang="ko-KR">

<head>
  <script src="/js/jquery-2.1.0.min.js"></script>
</head>

<body>
  <!-- 헤더 -->
  <header>
    <div id="includedHeader"></div>
    <script>
      $(function () {
        $("#includedHeader").load("skin/header.jsp");
      });
    </script>
  </header>



  <!-- 본문 시작 -->
  <div id="container">
    <!-- 게시물 내용 시작 -->
    <div id="main" class="post" itemscope itemprop="blogPost">
      <article itemprop="articleBody">
        <header class="article-info clearfix">
          <h1 itemprop="name">

            <a href="/2015/02/13/hello-world/" title="Hello World" itemprop="url">Hello World</a>
          </h1>
          <p class="article-author">By

            <a href="http://weibo.com/u/1839008305" title="yisuoyanyu111">yisuoyanyu111</a>
          </p>
          <p class="article-time">
            <time datetime="2015-02-13T04:56:46.000Z" itemprop="datePublished">2月 13 2015</time>
            更新日期:<time datetime="2015-02-12T08:19:01.000Z" itemprop="dateModified">2月 12 2015</time>

          </p>
        </header>
        <div class="article-content">


          <div id="toc" class="toc-article">
            <strong class="toc-title">文章目录</strong>
            <ol class="toc">
              <li class="toc-item toc-level-2"><a class="toc-link" href="#Quick_Start"><span
                    class="toc-number">1.</span> <span class="toc-text">Quick Start</span></a>
                <ol class="toc-child">
                  <li class="toc-item toc-level-3"><a class="toc-link" href="#Create_a_new_post"><span
                        class="toc-number">1.1.</span> <span class="toc-text">Create a new post</span></a></li>
                  <li class="toc-item toc-level-3"><a class="toc-link" href="#Run_server"><span
                        class="toc-number">1.2.</span> <span class="toc-text">Run server</span></a></li>
                  <li class="toc-item toc-level-3"><a class="toc-link" href="#Generate_static_files"><span
                        class="toc-number">1.3.</span> <span class="toc-text">Generate static files</span></a></li>
                  <li class="toc-item toc-level-3"><a class="toc-link" href="#Deploy_to_remote_sites"><span
                        class="toc-number">1.4.</span> <span class="toc-text">Deploy to remote sites</span></a></li>
                </ol>
              </li>
            </ol>
          </div>

          <p>Welcome to <a href="http://hexo.io/" target="_blank" rel="external">Hexo</a>! This is your very first post.
            Check <a href="http://hexo.io/docs/" target="_blank" rel="external">documentation</a> for more info. If you
            get any problems when using Hexo, you can find the answer in <a
              href="http://hexo.io/docs/troubleshooting.html" target="_blank" rel="external">trobuleshooting</a> or you
            can ask me on <a href="https://github.com/hexojs/hexo/issues" target="_blank" rel="external">GitHub</a>.</p>
          <h2 id="Quick_Start">Quick Start</h2>
          <h3 id="Create_a_new_post">Create a new post</h3>
          <figure class="highlight bash">
            <table>
              <tr>
                <td class="gutter">
                  <pre><div class="line">1</div></pre>
                </td>
                <td class="code">
                  <pre><div class="line">$ hexo new <span class="string">"My New Post"</span></div></pre>
                </td>
              </tr>
            </table>
          </figure>

          <p>More info: <a href="http://hexo.io/docs/writing.html" target="_blank" rel="external">Writing</a></p>
          <h3 id="Run_server">Run server</h3>
          <figure class="highlight bash">
            <table>
              <tr>
                <td class="gutter">
                  <pre><div class="line">1</div></pre>
                </td>
                <td class="code">
                  <pre><div class="line">$ hexo server</div></pre>
                </td>
              </tr>
            </table>
          </figure>

          <p>More info: <a href="http://hexo.io/docs/server.html" target="_blank" rel="external">Server</a></p>
          <h3 id="Generate_static_files">Generate static files</h3>
          <figure class="highlight bash">
            <table>
              <tr>
                <td class="gutter">
                  <pre><div class="line">1</div></pre>
                </td>
                <td class="code">
                  <pre><div class="line">$ hexo generate</div></pre>
                </td>
              </tr>
            </table>
          </figure>

          <p>More info: <a href="http://hexo.io/docs/generating.html" target="_blank" rel="external">Generating</a></p>
          <h3 id="Deploy_to_remote_sites">Deploy to remote sites</h3>
          <figure class="highlight bash">
            <table>
              <tr>
                <td class="gutter">
                  <pre><div class="line">1</div></pre>
                </td>
                <td class="code">
                  <pre><div class="line">$ hexo deploy</div></pre>
                </td>
              </tr>
            </table>
          </figure>

          <p>More info: <a href="http://hexo.io/docs/deployment.html" target="_blank" rel="external">Deployment</a></p>

        </div>
        <footer class="article-footer clearfix">




          <div class="article-share" id="share">

            <div data-url="http://weibo.com/u/1839008305/2015/02/13/hello-world/" data-title="Hello World | 一蓑烟雨任平生"
              data-tsina="null" class="share clearfix">
            </div>

          </div>
        </footer>
      </article>

      <nav class="article-nav clearfix">


        <div class="next">
          <a href="/2015/02/12/技术博客/" title="技术博客">
            <strong>NEXT:</strong><br />
            <span>技术博客
            </span>
          </a>
        </div>

      </nav>


    </div>
    <div class="openaside"><a class="navbutton" href="#" title="显示侧边栏"></a></div>

    <div id="toc" class="toc-aside">
      <strong class="toc-title">文章目录</strong>
      <ol class="toc">
        <li class="toc-item toc-level-2"><a class="toc-link" href="#Quick_Start"><span class="toc-number">1.</span>
            <span class="toc-text">Quick Start</span></a>
          <ol class="toc-child">
            <li class="toc-item toc-level-3"><a class="toc-link" href="#Create_a_new_post"><span
                  class="toc-number">1.1.</span> <span class="toc-text">Create a new post</span></a></li>
            <li class="toc-item toc-level-3"><a class="toc-link" href="#Run_server"><span class="toc-number">1.2.</span>
                <span class="toc-text">Run server</span></a></li>
            <li class="toc-item toc-level-3"><a class="toc-link" href="#Generate_static_files"><span
                  class="toc-number">1.3.</span> <span class="toc-text">Generate static files</span></a></li>
            <li class="toc-item toc-level-3"><a class="toc-link" href="#Deploy_to_remote_sites"><span
                  class="toc-number">1.4.</span> <span class="toc-text">Deploy to remote sites</span></a></li>
          </ol>
        </li>
      </ol>
    </div>
    <!-- 게시물 내용 끝 -->



    <!-- 우측 바  -->
    <div id="includedRight"></div>
    <script>
      $(function () {
        $("#includedRight").load("skin/rightbar.jsp");
      });
    </script>





    <!-- 코멘트 -->
    <section id="comment">
      <div id="disqus_thread"></div>
      <script type="text/javascript">
        /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
        var disqus_shortname = 'zhaoleiteng'; // required: replace example with your forum shortname

        /* * * DON'T EDIT BELOW THIS LINE * * */
        (function () {
          var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
          dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
          (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        })();
      </script>
      <noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by
          Disqus.</a></noscript>
      <a href="http://disqus.com" class="dsq-brlink">comments powered by <span class="logo-disqus">Disqus</span></a>
    </section>


  </div>
  <!-- 본문 끝 -->


  <!-- 푸터 -->
  <div id="includedFooter"></div>
  <script>
    $(function () {
      $("#includedFooter").load("skin/footer.jsp");
    });
  </script>




  <!-- 추가 푸터 -->
  <div id="includedFooterPlus"></div>
  <script>
    $(function () {
      $("#includedFooterPlus").load("skin/footerPlusMenu.jsp");
    });
  </script>


</body>

</html>