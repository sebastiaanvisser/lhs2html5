function action (msg)
{
  $(".action").html(msg)
  $(".action").css("opacity", "1.0")
  setTimeout(function () { $(".action").css("opacity", "0.0") }, 600);
}

function setupKeyBindings ()
{
  $(document).touchwipe(
    { wipeLeft  : function (e) { nextSlide(); return false} 
    , wipeRight : function (e) { prevSlide(); return false} 
    })

  $(document).keydown
    (function (e)
     {
       if ($(document.body).attr("class").match(/insert/)) return

       switch (e.keyCode)
       {
         case 37: prevSlide()  ;                          ; break
         case 39: nextSlide()  ;                          ; break
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
         case 49:  gotoBookmarkN(1)                              ; action("bookmark #1")          ; break
         case 50:  gotoBookmarkN(2)                              ; action("bookmark #2")          ; break
         case 51:  gotoBookmarkN(3)                              ; action("bookmark #3")          ; break
         case 52:  gotoBookmarkN(4)                              ; action("bookmark #4")          ; break
         case 53:  gotoBookmarkN(5)                              ; action("bookmark #5")          ; break
         case 54:  gotoBookmarkN(6)                              ; action("bookmark #6")          ; break
         case 55:  gotoBookmarkN(7)                              ; action("bookmark #7")          ; break
         case 91:  prevSlide()                                   ; action("previous")             ; break // [
         case 93:  nextSlide()                                   ; action("next")                 ; break // ]
         case  8:  prevSlide()                                   ;                                ; break // backspace
         case 32:  nextSlide()                                   ;                                ; break // space
         case 45:  zoomOut(false)                                ; action("zoom out")             ; break // -
         case 95:  zoomOut(true)                                 ; action("zoom OUT")             ; break // _
         case 61:  zoomIn(false)                                 ; action("zoom in")              ; break // +
         case 43:  zoomIn(true)                                  ; action("zoom IN")              ; break // =
         case 48:  zoomReset()                                   ; action("zoom all")             ; break // 0
         case 115: $(".slidenumber").toggleClass("visible")      ; action("toggle slidenumber")   ; break // s
         case 114: window.resizeTo(resolution[0], 24+ resolution[1]) ; action("native size")          ; break // r
         case 109: $("body").toggleClass("mouse")                ; action("toggle mouse")         ; break // m
         case 113: makeBookmark()                                ; action("push")                 ; break // q
         case 119: gotoBookmark()                                ; action("pop")                  ; break // w
         case 112: $("body").toggleClass("print")                
                   $("body").toggleClass("noprint")              ; action("print mode")           ; break
       }
       console.log(e)
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

