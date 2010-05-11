<!doctype html>

<title>A Generic Approach to Datatype Persistency in Haskell</title>
<meta http-equiv=Content-Type content=text/html;charset=utf-8>
<meta charset=utf-8>
<link rel=stylesheet href=css/layout.css type=text/css media=screen>
<link rel=stylesheet href=css/font.css type=text/css media=screen>
<link rel=stylesheet href=css/style.css type=text/css media=screen>
<link rel=stylesheet href=css/code.css type=text/css media=screen>
<script type=text/javascript src=3rd/jquery-1.4.2.js></script>

<body>

<!--

> module Presentation where
> import Data.Map (Map)
> import Prelude hiding (lookup)
> import qualified Data.Map as M
> import Control.Concurrent.STM
> import Control.Monad.State
> import Control.Monad.Reader
> import System.IO

-->

<div id=slides>

<!-- ====================================================================== -->

<div class=slide>
<header><h1></h1></header>
<div class=body>
  <div>
  <p><!--#config timefmt="%A %B %d, %Y" --><!--#flastmod file="presentation.html" --></p>

  </div>
</div>
<footer></footer>
</div>

<!--#include virtual="example.html" -->
<!--#include virtual="problem.html" -->
<!--#include virtual="heap.html"    -->

</div>

</body>

<script src=js/navigation.js></script>
<script src=js/zoom.js></script>
<script src=js/highlight.js></script>
<script src=js/bindings.js></script>
<script src=js/symbols.js></script>

<script>

$("footer").each
  (function ()
   {
     var foot = "<strong>A purely functional database in Haskell</strong> - Sebastiaan Visser";
     $(this).html(foot)
   })

$(".slide .body > div > *").attr("contentEditable", "true")

highlightCode()
numberSlides()
installKeyBindings()
// installMouseBindings()
currentSlide = 1 * (window.location.hash.slice(1) || 1) - 1
showCurrentSlide()
replaceSymbols()
</script>

