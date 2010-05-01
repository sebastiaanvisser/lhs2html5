var currentSlide   = 0
var numberOfSlides = $(".slide").length

function hideAllSlides ()
{
  $(".slide").css("display", "none")
}

function showCurrentSlide ()
{
  hideAllSlides()
  $(".slide")[currentSlide].style.display = "block"
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

function numberSlides ()
{
  $(".slide").each(function (i) { $(this).find("header .slidenumber").html((i + 1) + " of " + numberOfSlides) })
}
