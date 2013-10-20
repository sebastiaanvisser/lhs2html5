function setupMultislide (sep)
{
  sep = sep || "hr";
  $(sep).each
  ( function ()
    {
      var multi = [];
      var proto = $(this).parents(".slide");
      var hrs   = proto.find(".body").find(sep);
      for (var i = 0; i <= hrs.length; i++)
      {
        var slide = proto.clone();
        slide.find(sep).eq(i).nextAll().remove();
        slide.find(sep).remove();
        slide.insertBefore(proto);
      }
      proto.remove();
    }
  );
}


