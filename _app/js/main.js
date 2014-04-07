// ON DOCUMENT READY

$(document).ready(function() {

  // ON WINDOW LOAD

  $(window).load(function() {
    $(window).trigger('resize');
  });

  // Home image

  function mainImage() {
    $('#home').css({
      height: $(window).height()-40
    });
  }
  mainImage();

  // Bigtext

  function bigText() {
    $('#bigtext').bigtext();
  }
  bigText();

  // Sticky menu

  $("nav").sticky({
    topSpacing: 0
  });
  

  // Main menu

  (function() {
    var $menu = $('.navbar-inner ul.nav'),
      optionsList = '<option value="" selected>Menu...</option>';
    $menu.find('li').each(function() {
      var $this = $(this),
        $anchor = $this.children('a'),
        depth = $this.parents('ul').length - 1,
        indent = '';
      if (depth) {
        while (depth > 0) {
          indent += ' - ';
          depth--;
        }
      }
      optionsList += '<option value="' + $anchor.attr('href') + '">' + indent + ' ' + $anchor.text() + '</option>';
    }).end();
  })();

  // Smooth scrolling

  $("nav a, .scroll-to").click(function() {

    var headerH = $('nav').outerHeight();
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
    $(".vid-list").fitVids();
    optimizeYouTubeEmbeds1();
    $(".fluid-width-video-wrapper").css("padding-top", 0);
  }
  videos();

  // ON RESIZE

  $(window).bind('resize', function() {
    mainImage();
    bigText();
  });
});