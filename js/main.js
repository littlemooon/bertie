// ON DOCUMENT READY

$(document).ready(function() {

  // ON WINDOW LOAD

  $(window).load(function() {
    $('#load').fadeOut().remove();
    $(window).trigger('hashchange');
    $(window).trigger('resize');
  });

  // Home image

  function mainImage() {
    $('#home').css({
      height: $(window).height()
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

  // ON RESIZE

  $(window).bind('resize', function() {
    mainImage();
    bigText();
  });

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

  $(".vid-list").fitVids();

  // Fastclick

  FastClick.attach(document.body);

});