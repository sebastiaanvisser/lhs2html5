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

> module Main where

-->

<!-- ====================================================================== -->

<div class=slide>

<header>
<h1>Annotated Fixed Point</h1>
<div class=slidenumber></div>
</header>

<div class=body>

<div>
<p>We define an <em>annotated fixed point</em> combinator <code>FixA</code>:</p>
<pre language=haskell>

> data FixA a f =
>     InA { outa :: a f (FixA a f) }
>   | InF { outf ::   f (FixA a f) }

</pre>
</div>

<div>
<p>And the <em>printer</em> function that takes a <code>b</code> to an <code>m b</code>:</p>
<pre language=haskell>

> printer :: (MonadIO m, Show b) => String -> b -> m b
> printer s f =
>   do  liftIO (putStrLn (s ++ ": " ++ show f))
>       return f

</pre>
</div>

</div>

<footer></footer>
</div>

<!-- ====================================================================== -->

<div class=slide>

<div class=body>

<div>
<center>
<table>
<tr><td>send <code>τ</code> then <code>r</code>:</td><td>τ!r</td></tr>
<tr><td>receive <code>τ</code> then <code>r</code>:</td><td>τ?r</td></tr>
<tr><td>offer <code>r</code> and <code>s</code>:</td><td>r&s</td></tr>
<tr><td>select <code>r</code> or <code>s</code>:</td><td>r+s</td></tr>
<tr><td>close connection:</td><td>ε</td></tr>
<tr><td>recursion on <code>r</code>:</td><td>μβ.r</td></tr>
</table>
</center>
</div>

<div>
<p>This notation has been introduced by Gay & Hole in their paper about Types and
subtypes for client-server interactions. (1999)</p>
</div>

</div>

</div>

<!-- ====================================================================== -->

<div class=slide>

<header>
<h1>nog meer interessants</h1>
<div class=slidenumber></div>
</header>

<div class=body>

<div>
<p>A <em>Rendezvous</em> is used to connect a <em class=em0>client</em> to a <em class=em1>server.</em></p>
<pre language=haskell>
data Rendezvous r
newRendezvous :: IO (Rendezvous r)
</pre>
</div>

<div>
<p>Create a one endpoint with session <code>r</code>.</p>
<pre language=haskell>
accept :: Rendezvous r -> Session (Cap () r) () a -> IO a
</pre>
</div>

<div>
<p>Connect the other endpoint with session <code>s</code> dual of <code>r</code>.</p>
<pre language=haskell>
request :: Dual r s =>
  Rendezvous r -> Session (Cap () s) () a -> IO a
</pre>
</div>

</div>

<footer></footer>
</div>

<!-- ====================================================================== -->

</body>

<script src=js/navigation.js></script>
<script src=js/zoom.js></script>
<script src=js/highlight.js></script>
<script src=js/keybindings.js></script>

<script>

$("footer").each
  (function ()
   {
     var foot = "A Generic Approach to Datatype Persistency in Haskell - <strong>Sebastiaan Visser</strong>";
     $(this).html(foot)
   })

$(".slide .body > div > *").attr("contentEditable", "true")

highlightCode()
numberSlides()
installKeyBindings()
firstSlide()
</script>

