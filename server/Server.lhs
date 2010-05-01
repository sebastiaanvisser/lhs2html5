#!/usr/bin/runhaskell

> {-# LANGUAGE FlexibleContexts #-}
> module Main where

> import Data.Char
> import Data.Record.Label
> import Network.Protocol.Http
> import Network.Salvia hiding (start)
> import Network.Salvia.Impl.Cgi
> import Text.Highlighting.Illuminate
> import Text.XHtml hiding (start)

> main :: IO ()
> main = start "/code/lhs2html5/" (hCgiEnv routes) ()
>   where

>   routes = hPrefix "highlight/" highlight (hError BadRequest)

>   highlight =
>     do response (contentType =: Just ("text/html", Just "utf-8"))
>        request (connection =: Just "Close")
>        r <- request (getM uri)
>        b <- hRequestBodyStringUTF8
>        let hs = tokenize (lexerByName r) (preprocess b)
>        send $
>          case hs of
>            Left err -> err
>            Right tk -> renderHtmlFragment (toXHtmlCSS defaultOptions tk)

This function removes all empty lines from the beginning and end of the code,
removes all bird-style tags from the beginning of a line and removes and
outdents the code block to the first column.

> preprocess :: String -> String
> preprocess cd =
>   let allSpace    = and . map isSpace
>       bothSides f = reverse . f . reverse . f
>       trimmed     = bothSides (dropWhile allSpace) (lines cd)
>       nobirds     = map (dropWhile (=='>')) trimmed
>       spaces      = minimum (map (length . takeWhile isSpace) nobirds)
>       outdented   = map (drop spaces) nobirds
>   in unlines outdented

