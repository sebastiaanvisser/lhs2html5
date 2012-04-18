function firstSlide    () { setCurrentSlide(0) }
function lastSlide     () { setCurrentSlide(numberOfSlides - 1) }
function prevSlide     () { if (getCurrentSlide() > 0) setCurrentSlide(getCurrentSlide() - 1) }
function nextSlide     () { if (getCurrentSlide() < numberOfSlides - 1) setCurrentSlide(getCurrentSlide() + 1) }
function slideFromHash () { setCurrentSlide(1 * (window.location.hash.slice(1) || 1) - 1) }

function makeBookmark  () { bookmarks.unshift(getCurrentSlide()) }
function gotoBookmark  () { setCurrentSlide(bookmarks.shift())    }

function gotoBookmarkN (n)
{
  makeBookmark()
  $(".slide").each(
    function (i)
    {
      if ($(this).attr("id") == "bookmark" + n)
        setCurrentSlide(i)
    })
}

function getCurrentSlide ()  { return currentSlide[0]  }
function setCurrentSlide (i)
{
  // Remove previous data-body-class.
  var slide = $(".slide").get(getCurrentSlide());
  $(document.body).removeClass($(slide).attr("data-body-class") || "-");

  if (i === undefined || i < 0 || i > numberOfSlides) return
  currentSlide.unshift(i);
  $(".slide").addClass("hidden")
  var slide = $(".slide").get(getCurrentSlide());

  // Add current data-body-class.
  $(document.body).addClass($(slide).attr("data-body-class"));

  $(slide).removeClass("hidden")
  window.location.hash = (getCurrentSlide() + 1)
}

function setupNavigation ()
{
  window.currentSlide = [0]
  window.bookmarks    = []
  window.numberOfSlides = $(".slide").length
}

function setupSlideNumbering ()
{
  $(".slide").each(function (i) { $(this).find("header .slidenumber").html((i + 1) + " of " + numberOfSlides) })
}

