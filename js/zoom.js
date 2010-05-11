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
  var resolutionZoomMap =
    [ [0,    0,    0.00]
    , [320,  240,  0.31]
    , [640,  480,  0.62]
    , [800,  600,  0.78]
    , [1024, 786,  1.00]
    , [1280, 1024, 1.23]
    , [2048, 1152, 1.40]
    ]

  var w = window.outerWidth
  var h = window.outerHeight
  var d = w/h

  var i = 0;
  for (i = 0; i < resolutionZoomMap.length; i++)
    if (w < resolutionZoomMap[i][0])
      break

  var from = resolutionZoomMap[i - 1]
  var to   = resolutionZoomMap[i    ]

  console.log(w, h, "->", from, to)

  var dW = to[0] - from[0]
  var dZ = to[2] - from[2]

  var xW = (w-from[0])/dW
  var zoom = from[2]+(xW*dZ)

  $(".slide").css("zoom", zoom)
}
      
function documentResizer ()
{
  $(window).resize(autoZoom)
  autoZoom()
}

documentResizer()
  autoZoom()
