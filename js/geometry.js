function setupGeometry ()
{
  $("[data-geom]").each
  ( function ()
    {
      function withNum (n, f)
      {
        if (n !== undefined && !isNaN(n)) f(n);
      }

      var el = $(this);
      var geom = el.attr("data-geom").split(",").map(function (i) { return parseInt(i); });
      withNum(geom[0], function (n) { el.css("margin-top",    n); });
      withNum(geom[1], function (n) { el.css("width",         n); });
      withNum(geom[2], function (n) { el.css("margin-bottom", n); });
      withNum(geom[3], function (n) { el.css("height",        n); });
    }
  );
}

