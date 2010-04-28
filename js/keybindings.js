function installKeyBindings ()
{
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
         default:;
       }
       // console.log("key:", e.charCode)
     })
}

