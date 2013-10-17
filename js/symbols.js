function setupSymbolReplacement ()
{
  $("pre[language]").each(
    function (_, e)
    {
      for (var i = 0; i < e.childNodes.length; i++)
      {
        var node = e.childNodes[i];
        if (node.nodeType != 3) continue;
        node.textContent = node.textContent.replace("''", "”");
      }
    }
  )

  $("pre[language] .Symbol").each(
    function (e)
    {
      var sym = $(this)
      switch (sym.text())
      {
        case "->"  : sym.text("→"); padding(sym,3,4,3,0); roman(sym);  break
        case "<-"  : sym.text("←"); padding(sym,2,3,3,0); roman(sym);  break
        case "=="  : sym.text("≡"); padding(sym,8,7,0,0);              break
        case "=>"  : sym.text("⇒"); padding(sym,3,4,0,0); myriad(sym); break
        // case "." : sym.text("∘"); padding(sym,3,4,0,0); lucida(sym); break
        case "::"  : sym.text("∷"); padding(sym,8,7,0,0);              break
        case "$"   : sym.text("$");                       myriad(sym); break
      }
    }
  )
}

function setupSymbolHighlighting ()
{
  $("pre[language] .Symbol").each(
    function (e)
    {
      var sym = $(this)
      switch (sym.text())
      {
        case "=>"  : sym.addClass("fat-arrow"); break
      }
    }
  )
}

function setupKeywordReplacement ()
{
  $(".VarId").each(
    function (e)
    {
      var sym = $(this)
      switch (sym.text())
      {
        case "forall"    : sym.text("∀"); keyword(sym); break
        case "undefined" : sym.text("⊥"); keyword(sym); break
      }
    }
  )
}

function setupIdentifierReplacement ()
{
  $(".VarId").each(
    function (e)
    {
      var sym = $(this)
      switch (sym.text())
      {
        case "a": sym.text("α"); padding(sym,-2,-1,0,0); break
        case "b": sym.text("β"); padding(sym,-1,0,0,0);  break
        case "g": sym.text("γ"); padding(sym,-1,0,0,0);  break
        case "d": sym.text("δ"); padding(sym,-1,0,0,0);  break
        case "e": sym.text("ε"); padding(sym,-1,0,0,0);  break
      }
    }
  )        
}

function padding (n,x,y,v,w)
{
  n.css("margin-left",   x + "px")
  n.css("margin-right",  y + "px")
  n.css("top",           v + "px")
}

function keyword (n)
{
  n.attr("class", "Keyword")
}

function lucida (n)
{
  n.css("font-family", "Lucida Sans Unicode")
}

function roman (n)
{
  n.css("font-family", "Times New Roman")
}

function myriad (n)
{
  n.css("font-family", "Myriad Pro")
}

