<!DOCTYPE HTML>
<html lang="ko-KR">
<head>
</head>
<body>
<footer>
  <!-- 푸터 본문 -->
  <div id="footer" >

	<div class="line">
		<span></span>
		<div class="author"></div>
	</div>

	<div class="social-font clearfix">
	</div>

		<p class="copyright">Powered by 
      <a href="http://hexo.io" target="_blank" title="hexo">
        hexo
      </a> 
      and Theme by 
      <a href="https://github.com/A-limon/pacman" target="_blank" title="Pacman">
        Pacman
      </a> 
      © 2022 
		<a href="mailto:ygreen0516@gmail.com" target="_blank" title="Grokeen">
      Grokeen
    </a>
		</p>
</div>
<!-- mathjax config similar to math.stackexchange -->

<!-- 푸터 기능 -->
<script type="text/x-mathjax-config">
  MathJax.Hub.Config({
    tex2jax: {
      inlineMath: [ ['$','$'], ["\\(","\\)"] ],
      processEscapes: true
    }
  });
</script>

<script type="text/x-mathjax-config">
    MathJax.Hub.Config({
      tex2jax: {
        skipTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code']
      }
    });
</script>

<script type="text/x-mathjax-config">
    MathJax.Hub.Queue(function() {
        var all = MathJax.Hub.getAllJax(), i;
        for(i=0; i < all.length; i += 1) {
            all[i].SourceElement().parentNode.className += ' has-jax';
        }
    });
</script>
</footer>

<!-- 주요 Home 페이지 기능 -->
<script src="/js/jquery-2.1.0.min.js"></script>
<script type="text/javascript">
$(document).ready(function(){ 
  $('.navbar').click(function(){
    $('header nav').toggleClass('shownav');
  });
  var myWidth = 0;
  function getSize(){
    if( typeof( window.innerWidth ) == 'number' ) {
      myWidth = window.innerWidth;
    } else if( document.documentElement && document.documentElement.clientWidth) {
      myWidth = document.documentElement.clientWidth;
    };
  };
  var m = $('#main'),
      a = $('#asidepart'),
      c = $('.closeaside'),
      o = $('.openaside');
  $(window).resize(function(){
    getSize(); 
    if (myWidth >= 1024) {
      $('header nav').removeClass('shownav');
    }else
    {
      m.removeClass('moveMain');
      a.css('display', 'block').removeClass('fadeOut');
      o.css('display', 'none');
        
    }
  });
  c.click(function(){
    a.addClass('fadeOut').css('display', 'none');
    o.css('display', 'block').addClass('fadeIn');
    m.addClass('moveMain');
  });
  o.click(function(){
    o.css('display', 'none').removeClass('beforeFadeIn');
    a.css('display', 'block').removeClass('fadeOut').addClass('fadeIn');      
    m.removeClass('moveMain');
  });
  $(window).scroll(function(){
    o.css("top",Math.max(80,260-$(this).scrollTop()));
  });
});
</script>

</body>
</html>