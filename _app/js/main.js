
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

  $(".nav__list__item a, .home__link").click(function() {
    $($(this).attr("href"))
      .velocity("scroll", { 
        duration: 1200, 
        easing: "easeInOutExpo", 
        offset: -$('#nav').outerHeight()
      });

    return false;
  });  

  // videos

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