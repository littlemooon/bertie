
// ====================================================

/* MAINLINE */

// ====================================================

// ON DOCUMENT READY

$(document).ready(function() {

  // ON WINDOW LOAD

  $(window).load(function() {
    $(window).trigger('resize');
  });

  // Home page

  function homePage() {
    $('#home').css("min-height", $(window).height()-40);
  }
  homePage();

  // Bigtext

  function bigText() {
    $('.home__title__text').bigtext();
  }
  bigText();

  // Sticky menu

  $("#nav").sticky({
    topSpacing: 0
  });

  // Smooth scrolling

  $(".nav__list__item a, .home__link").click(function() {

    var headerH = $('#nav').outerHeight();
    $("html, body").animate({
      scrollTop: $($(this).attr("href")).offset().top - headerH + "px"
    }, {
      duration: 1200,
      easing: "easeInOutExpo"
    });
    return false;
  });  

  // Videos

  function videos() {
    $(".video__list").fitVids();
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