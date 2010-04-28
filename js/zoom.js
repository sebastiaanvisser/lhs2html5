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

