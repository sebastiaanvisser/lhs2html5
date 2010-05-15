function zoomIn ()
{
  var z = new Number($(".slide").css("zoom"))
  $(".slide").css("zoom", (1 * z) + 0.01)
}

function zoomOut ()
{
  var z = new Number($(".slide").css("zoom"))
  $(".slide").css("zoom", (1 * z) - 0.01)
}

function zoomReset ()
{
  $(".slide").css("zoom", 1.00)
}

function autoZoom ()
{
  var r = 1024
  var ratio = 768/r
  var w = window.innerWidth
  var h = window.innerHeight
  var w1 = w, h1 = h

  if (h/w > ratio)
    h1 = ratio * w
  else
    w1 = h / ratio

  $(".slide").css("width",  w1           + 'px')
  $(".slide").css("height", h1           + 'px')
  $(".slide").css("left",   (w/2 - w1/2) + "px")
  $(".slide").css("top",    (h/2 - h1/2) + "px")

  var zoom = w1/1024
  $(".slide > *").css("zoom", zoom)
}
      
function setupResizing ()
{
  $(window).resize(autoZoom)
  autoZoom()
}

