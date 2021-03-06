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

  $(document).keyup
    (function (e)
     {
       if (e.which == 73) // i
       {
         if (!$("body").hasClass("insert"))
         {
           $("body").addClass("insert")
           action("edit")
         }
         return
       }

       if (e.which == 27) // Esc
       {
         if ($("body").hasClass("insert"))
         {
           $("body").removeClass("insert")
           action("edit")
         }
         return
       }

       if ($(document.body).attr("class").match(/insert/)) return

       switch (e.which)
       {
//         case 49:  gotoBookmarkN(1)                              ; action("bookmark #1")          ; break
//         case 50:  gotoBookmarkN(2)                              ; action("bookmark #2")          ; break
//         case 51:  gotoBookmarkN(3)                              ; action("bookmark #3")          ; break
//         case 52:  gotoBookmarkN(4)                              ; action("bookmark #4")          ; break
//         case 53:  gotoBookmarkN(5)                              ; action("bookmark #5")          ; break
//         case 54:  gotoBookmarkN(6)                              ; action("bookmark #6")          ; break
//         case 55:  gotoBookmarkN(7)                              ; action("bookmark #7")          ; break
         case 219:  prevSlide()                                  ; action("previous")             ; break // [
         case 221:  nextSlide()                                  ; action("next")                 ; break // ]
         case   8:  prevSlide()                                  ;                                ; break // backspace
         case   2:  nextSlide()                                  ;                                ; break // space
         case 189:  if (!e.shiftKey) { zoomOut(false)            ; action("zoom out")             ; break } // -
                    else            { zoomOut(true)              ; action("zoom OUT")             ; break } // _
         case 187:  if (!e.shiftKey) {zoomIn(false)              ; action("zoom in")              ; break } // +
                    else { zoomIn(true)                          ; action("zoom IN")              ; break } // =
         case  48:  zoomReset()                                  ; action("zoom all")             ; break // 0
         case  83: $(".slidenumber").toggleClass("visible")      ; action("toggle slidenumber")   ; break // s
         case  77: $("body").toggleClass("mouse")                ; action("toggle mouse")         ; break // m
         case  78: window.resizeTo(resolution[0], resolution[1]) ; action("native size")          ; break // n
         case  81: makeBookmark()                                ; action("push")                 ; break // q
         case  87: gotoBookmark()                                ; action("pop")                  ; break // w
         case  80: $("body").toggleClass("print")
                   $("body").toggleClass("noprint")              ; action("print mode")           ; break // P
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

