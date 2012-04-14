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

