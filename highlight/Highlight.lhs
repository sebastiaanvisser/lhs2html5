#!/usr/bin/runghc

> import Control.Applicative
> import Data.Char
> import Data.List
> import System.Process
> import System.IO
> import System.Environment

> main :: IO ()
> main =

Print the HTTP header.

>   do putStr "Content-Type: text/html;charset=utf-8\r\n"
>      putStr "\r\n"

Read the query string for the request language to highlight.

>      lang <- maybe "haskell" validLanguages . lookup "QUERY_STRING" <$> getEnvironment

Highlight and return the input code.

>      code <- preprocess <$> hGetContents stdin
>      res <- readProcess "illuminate" ["--syntax=" ++ lang, "--to=htmlcss"] code

Write the output.

>      print code
>      putStrLn res
>      hFlush stdout

This function removes all empty lines from the beginning and end of the code,
removes all bird-style tags from the beginning of a line and removes and
outdents the code block to the first column.

> preprocess :: String -> String
> preprocess cd =
>   let allSpace    = all isSpace
>       bothSides f = reverse . f . reverse . f
>       trimmed     = bothSides (dropWhile allSpace) (lines cd)
>       nobirds     = map (dropWhile (=='>')) trimmed
>       spaces      = minimum (filter (/= 0) $ map (length . takeWhile isSpace) nobirds)
>       outdented   = map (drop spaces) nobirds
>       dropDoubles = nubWith (\a b -> allSpace a && a == b) outdented
>   in intercalate "\n" dropDoubles

Helper function to eliminate consecutive items under certain conditions.

> nubWith :: (a -> a -> Bool) -> [a] -> [a]
> nubWith f = go
>  where
>     go []                   = []
>     go [x]                  = [x]
>     go (x:y:xs) | f x y     = go (y:xs)
>                 | otherwise = x : go (y:xs)

A white list based validator of known languages.

> validLanguages :: String -> String
> validLanguages lang =
>   let norm = map toLower lang in
>   if norm `elem` languages
>   then norm
>   else "haskell"

> languages :: [String]
> languages =
>   [ "alex"
>   , "bibtex"
>   , "c"
>   , "cabal"
>   , "cplusplus"
>   , "csharp"
>   , "css"
>   , "d"
>   , "diff"
>   , "haskell"
>   , "html"
>   , "java"
>   , "javascript"
>   , "literatehaskell"
>   , "python"
>   , "ruby"
>   , "rhtml"
>   , "rxml"
>   , "sh"
>   , "tex"
>   , "xml"
>   ]

