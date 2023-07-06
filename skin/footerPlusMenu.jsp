<!-- 게시글에 추적으로 푸터 위에 넣주는 html -->
<!DOCTYPE HTML>
<html lang="ko-KR">

<head>
</head>

<body>
  <script type="text/javascript">
    $(document).ready(function () {
      var ai = $('.article-content>iframe'),
        ae = $('.article-content>embed'),
        t = $('#toc'),
        h = $('article h2')
      ah = $('article h2'),
        ta = $('#toc.toc-aside'),
        o = $('.openaside'),
        c = $('.closeaside');
      if (ai.length > 0) {
        ai.wrap('<div class="video-container" />');
      };
      if (ae.length > 0) {
        ae.wrap('<div class="video-container" />');
      };
      if (ah.length == 0) {
        t.css('display', 'none');
      } else {
        c.click(function () {
          ta.css('display', 'block').addClass('fadeIn');
        });
        o.click(function () {
          ta.css('display', 'none');
        });
        $(window).scroll(function () {
          ta.css("top", Math.max(140, 320 - $(this).scrollTop()));
        });
      };
    });
  </script>



  <script type="text/javascript">
    $(document).ready(function () {
      var $this = $('.share'),
        url = $this.attr('data-url'),
        encodedUrl = encodeURIComponent(url),
        title = $this.attr('data-title'),
        tsina = $this.attr('data-tsina');
      var html = [
        '<a href="#" class="overlay" id="qrcode"></a>',
        '<div class="qrcode clearfix"><span>扫描二维码分享到微信朋友圈</span><a class="qrclose" href="#share"></a><strong>Loading...Please wait</strong><img id="qrcode-pic" data-src="http://s.jiathis.com/qrcode.php?url=' + encodedUrl + '"/></div>',
        '<a href="#textlogo" class="article-back-to-top" title="Top"></a>',
        '<a href="https://www.facebook.com/sharer.php?u=' + encodedUrl + '" class="article-share-facebook" target="_blank" title="Facebook"></a>',
        '<a href="#qrcode" class="article-share-qrcode" title="QRcode"></a>',
        '<a href="https://twitter.com/intent/tweet?url=' + encodedUrl + '" class="article-share-twitter" target="_blank" title="Twitter"></a>',
        '<a href="http://service.weibo.com/share/share.php?title=' + title + '&url=' + encodedUrl + '&ralateUid=' + tsina + '&searchPic=true&style=number' + '" class="article-share-weibo" target="_blank" title="Weibo"></a>',
        '<span title="Share to"></span>'
      ].join('');
      $this.append(html);
      $('.article-share-qrcode').click(function () {
        var imgSrc = $('#qrcode-pic').attr('data-src');
        $('#qrcode-pic').attr('src', imgSrc);
        $('#qrcode-pic').load(function () {
          $('.qrcode strong').text(' ');
        });
      });
    });     
  </script>






</body>

</html>