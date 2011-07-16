function setupHighlighting (prefix)
{
  $("pre[language]").each
    (function ()
     {
       var node = $(this)

       function insert (code)
       {
         var html = document.createElement("div");
         html.innerHTML = code;
         node.html($("pre", html)[0].innerHTML)

         // Remove additional PRE.
         // var pre = $(node).children("pre")
         // while (pre[0].childNodes.length) node[0].appendChild(pre[0].childNodes[0])
         // pre.remove()
       }

       jQuery.ajax
         ({ type: "POST"
          , url: prefix + "?" + node.attr("language")
          , data: node.text()
          , success: insert
          , dataType: "html"
          , async: false // to make symbol replacement kick in on time
          })
     })
}

