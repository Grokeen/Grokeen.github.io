<!DOCTYPE HTML>
<html lang="ko-KR">

<head>
  <script src="/js/jquery-2.1.0.min.js"></script>
  <!-- maekdown 파일 내용 불러오기 -->
  <script>
    

    // HTML 변경하기 
    function changeHtml(countMdFile) {
      // 첫 번째, md 파일 갯수
      var htmlCopy = '';

      //  if (countMdFile != 0) {
      //   for (i = 0; i < countMdFile; i++) {
      //     htmlCopy += "<a href='" + / 2015 /02 / 12 / 몬ㄷ / +"' title='"+몬ㄷ+"'' itemprop='url'>";
      //     htmlCopy += "<h1 itemprop='name'>"+name+"</h1>";
      //     htmlCopy += "<p itemprop='description'>"+ㅋㅋㅋㅋ 내용이다+"</p>";
      //     htmlCopy += "<time datetime='"+2015-02 - 12T08: 51: 13.000Z+"' itemprop='datePublished'>"+2月 12 2015+"</time>";
      //     htmlCopy += "</a>";
      //   }
      // }
      $('#printColumnOUT').html(htmlCopy);

    }



    // Markdown 파일 불러오기
    function loadMarkdownFile(url) {
      fetch(url)
        .then(response => response.text())
        .then(text => {
          // Marked.js를 사용하여 Markdown을 HTML로 변환
          const html = marked(text);
          // 변환된 HTML을 특정 영역에 삽입
          // document.getElementById('markdownContent').innerHTML = html;
          $('markdownContent').val();
        }
        )
        .catch(error => console.error(error));
      
    }
    loadMarkdownFile('/layout/post/2023-05-24-Java(1).md');

  </script>



</head>

<body>
  <!-- 게시글 -->
  <div id="main">
    <section class="post" itemscope itemprop="blogPost">
      <a href="menuindex.html" title="Hello World" itemprop="url">
        <h1 itemprop="name">Hello World</h1>
        <p itemprop="description">Welcome to Hexo! This is your very first post. Check documentation for more info. If
          you get any problems when using Hexo, you can find the </p>
        <time datetime="2015-02-13T04:56:46.000Z" itemprop="datePublished">2月 13 2015</time>
      </a>
    </section>

    <!-- markdown 불러오기 -->
    <section class="post" itemscope itemprop="blogPost">
      <a href="/2015/02/12/몬ㄷ/" title="몬ㄷ" itemprop="url">
        <h1 itemprop="name"></h1>
        <p itemprop="description">ㅋㅋㅋㅋ 내용이다</p>
        <time datetime="2015-02-12T08:51:13.000Z" itemprop="datePublished">2月 12 2015</time>
      </a>
      asdsada
      <div id="markdownContent">asdasd</div>
      ㅁㄴㅇㅁㅇㄴㅁ
      <div class="list__item">ㅂㅂㅂㅈㅂㅈ</div>

    </section>

  </div>
</body>

</html>