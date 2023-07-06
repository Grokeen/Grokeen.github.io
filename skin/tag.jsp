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






  <div id="container">

    <div class="archive-title">
      <h2 class="archive-icon">归档</h2>
      <div class="archiveslist archive-float clearfix">
        <ul class="archive-list">
          <li class="archive-list-item"><a class="archive-list-link" href="/archives/2015/02/">February 2015</a><span
              class="archive-list-count">2</span></li>
        </ul>
      </div>
    </div>

    <div id="main" class="archive-part clearfix">
      <div id="archive-page">
        <section class="post" itemscope itemprop="blogPost">
          <a href="/2015/02/13/hello-world/" title="Hello World" itemprop="url">
            <h1 itemprop="name">Hello World</h1>
            <time datetime="2015-02-13T04:56:46.000Z" itemprop="datePublished">2月 13 2015</time>
          </a>
        </section>

        <section class="post" itemscope itemprop="blogPost">
          <a href="/2015/02/12/技术博客/" title="技术博客" itemprop="url">
            <h1 itemprop="name">技术博客</h1>
            <time datetime="2015-02-12T08:51:13.000Z" itemprop="datePublished">2月 12 2015</time>
          </a>
        </section>


      </div>
    </div>

  </div>


  <!-- 푸터 -->
  <div id="includedFooter"></div>
  <script>
    $(function () {
      $("#includedFooter").load("skin/footer.jsp");
    });
  </script>




</body>

</html>