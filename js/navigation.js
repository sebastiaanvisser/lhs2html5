function hideAllSlides ()
{
  $(".slide").css("display", "none")
}

function showCurrentSlide ()
{
  hideAllSlides()
  $(".slide")[currentSlide].style.display = "block"
  window.location.hash = (currentSlide + 1)
}

function firstSlide ()
{
  currentSlide = 0
  showCurrentSlide()
}

function lastSlide ()
{
  currentSlide = numberOfSlides - 1
  showCurrentSlide()
}

function prevSlide ()
{
  if (currentSlide > 0) currentSlide--
  showCurrentSlide()
}

function nextSlide ()
{
  if (currentSlide < numberOfSlides - 1) currentSlide++
  showCurrentSlide()
}

function slideNumberFromHash ()
{
  currentSlide = 1 * (window.location.hash.slice(1) || 1) - 1
  showCurrentSlide()
}

function setupNavigation ()
{
  window.currentSlide   = 0
  window.numberOfSlides = $(".slide").length
}

function setupSlideNumbering ()
{
  $(".slide").each(function (i) { $(this).find("header .slidenumber").html((i + 1) + " of " + numberOfSlides) })
}

