function replaceSymbols ()
{
  $(".Symbol").each(
    function (e)
    {
      var sym = $(this)
      switch (sym.text())
      {
        case "->": sym.text("→"); padding(sym,2,3,3,0); roman(sym);  break
        case "<-": sym.text("←"); padding(sym,2,3,3,0); roman(sym);  break
        case "==": sym.text("≡"); padding(sym,8,7,0,0);              break
        case "=>": sym.text("⇒"); padding(sym,3,4,0,0); myriad(sym); break
        case "::": sym.text("∷"); padding(sym,8,7,0,0);              break
        case "$" : sym.text("$");                       myriad(sym); break
      }
    }
  )
  // $(".VarId").each(
    // function (e)
    // {
      // var sym = $(this)
      // switch (sym.text())
      // {
        // case "a": sym.text("α"); padding(sym,-2,-1,0,0);            break
        // case "b": sym.text("β"); padding(sym,-1,0,0,0);             break
      // }
    // }
  // )        
}

function padding (n,x,y,v,w)
{
  n.css("margin-left",   x + "px")
  n.css("margin-right",  y + "px")
  n.css("top",           v + "px")
}

function roman (n)
{
  n.css("font-family", "Times New Roman")
}

function myriad (n)
{
  n.css("font-family", "Myriad Pro")
}

