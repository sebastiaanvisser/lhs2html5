function fillElement (id, html)
{
  $(id).each(function () { if (!$(this).html()) $(this).html(html) })
}
