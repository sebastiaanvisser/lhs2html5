function installKeyBindings ()
{
  $(document).keydown
    (function (e)
     {
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
       switch (e.charCode)
       {
         case 91: prevSlide() ; break
         case 93: nextSlide() ; break
         case 45: zoomOut()   ; break
         case 61: zoomIn()    ; break
         case 48: zoomReset() ; break
       }
     })
}

function installMouseBindings ()
{
  $(document).bind("contextmenu",function() { return false })
  $(".slide").mousedown
    (function (e)
     {
       switch (e.which)
       {
         case 1: nextSlide() ; break
         case 3: prevSlide() ; break
       }
     })
}

