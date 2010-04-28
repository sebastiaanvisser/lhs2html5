function highlightCode ()
{
  $("pre[language]").each
    (function ()
     {
       var node = $(this)

       function insert (code)
       {
         node.html(code)

         // Remove additional PRE.
         var pre = $(node).children("pre")
         while (pre[0].childNodes.length) node[0].appendChild(pre[0].childNodes[0])
         pre.remove()
       }

       jQuery.ajax
         ({ type: "PUT"
          , url: "/highlight/" + node.attr("language")
          , data: node.text()
          , success: insert
          , dataType: "html"
          , async: false
          })
     })
}

