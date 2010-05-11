function replaceSymbols ()
{
  $(".Symbol").each(
    function (e)
    {
      var sym = $(this)
      switch (sym.text())
      {
        case "->": sym.text("→"); padding(sym,2,3); myriad(sym); break
        case "<-": sym.text("←"); padding(sym,2,3);              break
        case "==": sym.text("≡"); padding(sym,8,7);              break
        case "=>": sym.text("⇒"); padding(sym,3,4);              break
        case "::": sym.text("∷"); padding(sym,8,7);              break
        case "$" : sym.text("$");                   myriad(sym); break
      }
    }
  )


}

function padding (n,x,y)
{
  n.css("margin-left",  x + "px")
  n.css("margin-right", y + "px")
}

function myriad (n)
{
  n.css("font-family", "Myriad Pro")
}
