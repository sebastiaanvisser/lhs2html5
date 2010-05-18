function setupKeyBindings ()
{
  $(document).keydown
    (function (e)
     {
       if ($(document.body).attr("class").match(/insert/)) return

       switch (e.keyCode)
       {
         case 37: prevSlide()  ; break
         case 39: nextSlide()  ; break
         case 36: firstSlide() ; break
         case 35: lastSlide()  ; break
       }
     })

  $(document).keypress
    (function (e)
     {
       if (e.charCode == 105) // i
       {
         $("body").toggleClass("insert")
         return
       }

       if ($(document.body).attr("class").match(/insert/)) return

       switch (e.charCode)
       {
         case 91:  prevSlide()                              ; break
         case 93:  nextSlide()                              ; break
         case 45:  zoomOut()                                ; break
         case 61:  zoomIn()                                 ; break
         case 48:  zoomReset()                              ; break
         case 115: $(".slidenumber").toggleClass("visible") ; break // s
         case 109: $("body").toggleClass("mouse")           ; break // m
       }
       // console.log(e.charCode)
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

