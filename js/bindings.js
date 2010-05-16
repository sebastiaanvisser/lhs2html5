function setupKeyBindings ()
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
         case 91:  prevSlide()                ; break
         case 93:  nextSlide()                ; break
         case 45:  zoomOut()                  ; break
         case 61:  zoomIn()                   ; break
         case 48:  zoomReset()                ; break
         case 115: $(".slidenumber").toggleClass("visible") ; break // s
       }
       // console.log(e.charCode)
     })
}

function setupMouseBindings ()
{
  if (document.location.search.match(/nomouse/)) return

  // Disable context menu.
  $(document).bind("contextmenu",function() { return false })

  // Make stuff unselectable and hide cursor.
  $("*").css("-webkit-user-select", "none");
  $("*").css("cursor", "none");

  // Navigate forward on left mouse button, backward on right mouse button.
  $("body").mousedown
    (function (e)
     {
       switch (e.which)
       {
         case 1: nextSlide() ; break
         case 3: prevSlide() ; break
       }
     })
}

