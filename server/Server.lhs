{-# LANGUAGE FlexibleContexts #-}
module Main where

import Control.Monad.Trans
import Data.Char
import Data.Record.Label
import Network.Protocol.Http
import Network.Salvia
import Network.Salvia.Handler.ColorLog
import System.IO
import Text.Highlighting.Illuminate
import Text.XHtml hiding (start)

main :: IO ()
main = start defaultConfig (hDefaultEnv routes) ()

routes :: (ServerAddressM m, SendM m, HttpM' m, BodyM Request m, MonadIO m, ClientAddressM m) => m ()
routes =
  do hPrefixRouter
       [ ("/highlight/", highlight)
       ] (hFileSystem ".")
     hColorLog stdout

highlight :: (SendM m, HttpM Response m, HttpM Request m, BodyM Request m) => m ()
highlight =
  do response (contentType =: Just ("text/html", Just "utf-8"))
     r <- request (getM uri)
     b <- hRequestBodyStringUTF8
     let hs = tokenize (lexerByName r) (preprocess b)
     send $
       case hs of
         Left err -> err
         Right tk -> renderHtmlFragment (toXHtmlCSS defaultOptions tk)

-- | This function removes all empty lines from the beginning and end of the
-- code, removes all bird-style tags from the beginning of a line and removes
-- and outdents the code block to the first column.

preprocess :: String -> String
preprocess cd =
  let allSpace    = and . map isSpace
      bothSides f = reverse . f . reverse . f
      trimmed     = bothSides (dropWhile allSpace) (lines cd)
      nobirds     = map (dropWhile (=='>')) trimmed
      spaces      = minimum (map (length . takeWhile isSpace) nobirds)
      outdented   = map (drop spaces) nobirds
  in unlines outdented

