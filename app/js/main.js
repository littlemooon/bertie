
// ====================================================

/* MAINLINE */

// ====================================================

// ON DOCUMENT READY

$(document).ready(function() {

  // ON WINDOW LOAD

  $(window).load(function() {
    $(window).trigger('resize');
  });

  // home page

  function homePage() {
    $('#home').css("min-height", $(window).height()-40);
  }
  homePage();

  // bigtext

  function bigText() {
    $('.home__title__text').bigtext();
  }
  bigText();

  // sticky menu

  $("#nav").sticky({
    topSpacing: 0
  });

  // smooth scrolling
  var headerHeight = $('#nav').outerHeight();
  $(".nav__list__item a, .home__link").on("click", function() {
    $($(this).attr("href"))
      .velocity("scroll", { 
        duration: 1200, 
        easing: "easeInOutExpo", 
        offset: -headerHeight
      });

    return false;
  });  

  // videos

  function videos() {
    $(".video").fitVids();
    optimizeYouTubeEmbeds1();
    $(".fluid-width-video-wrapper").css("padding-top", 0);
  }
  videos();

  // ON RESIZE

  $(window).bind('resize', function() {
    homePage();
    bigText();
  });
});

// ====================================================