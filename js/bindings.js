function action (msg)
{
  $(".action").html(msg)
  $(".action").css("opacity", "1.0")
  setTimeout(function () { $(".action").css("opacity", "0.0") }, 600);
}

function setupKeyBindings ()
{
  $(document).keydown
    (function (e)
     {
       if ($(document.body).attr("class").match(/insert/)) return

       switch (e.keyCode)
       {
         case 37: prevSlide()  ; /* action("previous") */ ; break
         case 39: nextSlide()  ; /* action("next")     */ ; break
         case 36: firstSlide() ; action("first")          ; break
         case 35: lastSlide()  ; action("last")           ; break
       }
     })

  $(document).keypress
    (function (e)
     {
       if (e.charCode == 105) // i
       {
         $("body").toggleClass("insert")
         action("edit")
         return
       }

       if ($(document.body).attr("class").match(/insert/)) return

       switch (e.charCode)
       {
         case 91:  prevSlide()                              ; action("previous")             ; break
         case 93:  nextSlide()                              ; action("next")                 ; break
         case 45:  zoomOut()                                ; action("zoom out")             ; break
         case 61:  zoomIn()                                 ; action("zoom in")              ; break
         case 48:  zoomReset()                              ; action("zoom all")             ; break
         case 115: $(".slidenumber").toggleClass("visible") ; action("toggle slidenumber")   ; break // s
         case 109: $("body").toggleClass("mouse")           ; action("toggle mouse")         ; break // m
         case 113: makeBookmark()                           ; action("bookmarked")           ; break // q
         case 119: gotoBookmark()                           ; action("goto bookmark")        ; break // w
       }
       console.log(e.charCode)
     })
}

function setupMouseBindings ()
{
  // Disable context menu.
  $(document).bind("contextmenu",
    function ()
    {
      return !$(document.body).attr("class").match(/mouse/)
    })

  // Navigate forward on left mouse button, backward on right mouse button.
  $("body").mousedown
    (function (e)
     {
       if (!$(document.body).attr("class").match(/mouse/)) return
       switch (e.which)
       {
         case 1: nextSlide() ; break
         case 3: prevSlide() ; break
       }
     })
}

