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

-->

<div id=slides>

<!-- ====================================================================== -->

<div class=slide>
<header><h1>Example, user database</h1><div class=slidenumber></div></header>
<div class=body>
  <div>
  <p>User datatype containing email and password.</p>
  <pre language=haskell class=signature>

> type Email    = String

  </pre>
  <pre language=haskell class=signature>

> type Password = String

  </pre>
  <pre language=haskell>

> data User     = User
>               { email    :: Email
>               , password :: Password
>               }

  </pre>
  </div>
  <div>
  <p>User database as mapping from email to user.</p>
  <pre language=haskell>

> type UserDB = Map Email User

  </pre>
  </div>
</div>
<footer></footer>
</div>

<div class=slide>
<header><h1>Example, performing a signup</h1><div class=slidenumber></div></header>
<div class=body>
  <div class=vindent>
  <p>Add a new user to a database, the email address must be unique.</p>
  <pre language=haskell class=signature>

> signup :: UserDB -> User -> Either String UserDB

  </pre>
  <pre language=haskell>

> signup db user = 
>   let mail = email user in
>   case M.lookup mail db of
>     Nothing -> Right (M.insert mail user db)
>     Just _  -> Left "email already taken"

  </pre>
  </div>
</div>
<footer></footer>
</div>

<div class=slide>
<header><h1>Example, authenticate a user</h1><div class=slidenumber></div></header>
<div class=body>
  <div class=vindent>
  <p>Does the database contain a user with the right email and password?</p>
  <pre language=haskell class=signature>

> authenticate :: UserDB -> User -> Bool

  </pre>
  <pre language=haskell>

> authenticate db user = 
>   case M.lookup (email user) db of
>     Just (User _ p) | p == password user -> True
>     _                                    -> False

  </pre>
  </div>
</div>
<footer></footer>
</div>

<div class=slide>
<header><h1>Map as binary tree</h1><div class=slidenumber></div></header>
<div class=body>
  <div class=vindent>
  <p>Haskell's <code>Data.Map</code> is implemented as size balanced binary tree.</p>
  </div>
  <div>
  <p>A simplified binary tree:</p>
  <pre language=haskell>

> data Tree k v =
>     Leaf
>   | Branch { key   :: k
>            , value :: v
>            , left  :: Tree k v
>            , right :: Tree k v
>            }

  </pre>
  </div>
</div>
<footer></footer>
</div>

<div class=slide>
<header><h1>Insertion into binary tree</h1><div class=slidenumber></div></header>
<div class=body>
  <div class=vindent>
  <pre language=haskell class=signature>

> insert :: Ord k => k -> v -> Tree k v -> Tree k v

  </pre>
  <pre language=haskell>

> insert k v (Branch m w l r) =
>   case k `compare` m of
>             LT -> Branch m w (insert k v l) r
>             EQ -> Branch k v l r
>             GT -> Branch m w l (insert k v r)
> insert k v Leaf = Branch k v Leaf Leaf

  </pre>
  </div>
</div>
<footer></footer>
</div>

<div class=slide>
<header><h1>Lookup on binary tree</h1><div class=slidenumber></div></header>
<div class=body>
  <div class=vindent>
  <pre language=haskell class=signature>

> lookup :: Ord k => k -> Tree k v -> Maybe v

  </pre>
  <pre language=haskell>

> lookup k (Branch m v l r) =
>   case k `compare` m of
>           LT -> lookup k l
>           EQ -> Just v
>           GT -> lookup k r
> lookup _ Leaf = Nothing

  </pre>
  </div>
</div>
<footer></footer>
</div>

<!--

> type Web a = IO a
> getPostVar :: String -> IO String
> getPostVar = undefined

-->

<div class=slide>
<header><h1>Example, web application</h1><div class=slidenumber></div></header>
<div class=body>
  <div class=vindent>
  <p>Get post data out of web environment and try signup.</p>
  <pre language=haskell class=signature>

> signupHandler :: TVar UserDB -> Web String

  </pre>
  <pre language=haskell>

> signupHandler dbVar =
>   do mail <- getPostVar "email"
>      pass <- getPostVar "password"
>      atomically $
>        do db <- readTVar dbVar
>           case signup db (User mail pass) of
>             Left  err -> return ("failed: " ++ err)
>             Right db' -> do writeTVar dbVar db'
>                             return "signup ok"

  </pre>
  </div>
</div>
<footer></footer>
</div>

<!-- ====================================================================== -->

<div class=slide>
<header><h1>The problem</h1><div class=slidenumber></div></header>
<div class=body>
  <div class="large vindent hindent">
  <p class=problem>When the programs terminates all data is lost.</p>
  </div>
</div>
</div>

<div class=slide>
<header><h1>&nbsp;</h1><div class=slidenumber></div></header>
<div class=body>
  <div class="large vindent hindent">
  <ol>
    <li>File based storage heap.</li>
    <li>Generic annotated traversals.</li>
    <li>Persistent recursive data structures.</li>
  </ol>
  </div>
</div>
</div>

<div class=slide>
<header><h1>The heap layout</h1><div class=slidenumber></div></header>
<div class=body>
  <div>
  <img style="margin-left:25px;margin-top:60px;"
       src="http://localhost/uu/msc/thesis/heap.pdf">
  </div>
</div>
</div>

<div class=slide>
<header><h1>The heap layout</h1><div class=slidenumber></div></header>
<div class=body>
  <div>
  <img style="margin-left:25px;margin-top:60px;height:50%"
       src="http://localhost/uu/msc/thesis/binarytree-ann.pdf">
  </div>
</div>
</div>

<!-- ====================================================================== -->

</div>

</body>

<script src=js/navigation.js></script>
<script src=js/zoom.js></script>
<script src=js/highlight.js></script>
<script src=js/bindings.js></script>

<script>

window.resizeTo(1024, 768)

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
installMouseBindings()
currentSlide = 1 * (window.location.hash.slice(1) || 1) - 1
showCurrentSlide()
</script>

