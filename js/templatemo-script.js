/**
 *	www.templatemo.com
 */

/* HTML document is loaded. DOM is ready.
-----------------------------------------*/
$(document).ready(function(){

	var MOBILE_NAV_MAX = 991;

	function isMobileNavViewport() {
		return $(window).width() <= MOBILE_NAV_MAX;
	}

	function resetMobileMenuButton() {
		$('.mobile-menu-icon').removeClass('is-open').find('i').removeClass('fa-times').addClass('fa-bars');
	}

	function closeMobileNav() {
		if (!isMobileNavViewport()) return;
		$('.templatemo-nav').stop(true, true).slideUp(200);
		resetMobileMenuButton();
	}

	// Mobile menu toggle: hamburger <-> X
	$('.mobile-menu-icon').on('click', function(e) {
		e.preventDefault();
		if (!isMobileNavViewport()) return;
		var $btn = $(this);
		var $nav = $('.templatemo-nav');
		$nav.stop(true, true).slideToggle(200);
		$btn.toggleClass('is-open');
		var open = $btn.hasClass('is-open');
		$btn.find('i').removeClass('fa-bars fa-times').addClass(open ? 'fa-times' : 'fa-bars');
	});

	// Close menu + icon when any nav link is used (in-page anchors or other pages)
	$('.templatemo-nav a').on('click', function() {
		closeMobileNav();
	});

	$(window).on('resize', function() {
		if ($(window).width() > MOBILE_NAV_MAX) {
			$('.templatemo-nav').show();
			resetMobileMenuButton();
		} else {
			$('.templatemo-nav').hide();
			resetMobileMenuButton();
		}
	});

  // http://stackoverflow.com/questions/2851663/how-do-i-simulate-a-hover-with-a-touch-in-touch-enabled-browsers
  $('body').bind('touchstart', function() {});

  var $scrollTopBtn = $('<button/>', {
    type: 'button',
    class: 'tm-scroll-top',
    id: 'tm-scroll-top',
    'aria-label': 'Back to top'
  });
  $scrollTopBtn.html('<i class="fa fa-chevron-up" aria-hidden="true"></i>');
  $('body').append($scrollTopBtn);

  function getDocScrollHeight() {
    var body = document.body;
    var html = document.documentElement;
    return Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
  }

  function toggleScrollTopButton() {
    var threshold = 160;
    var docHeight = getDocScrollHeight();
    var winHeight = $(window).height();
    var scrollTop = $(window).scrollTop() || window.pageYOffset;
    var canScroll = docHeight > winHeight + 48;
    var nearBottom = scrollTop + winHeight >= docHeight - threshold;
    var narrow = $(window).width() <= 991;
    var scrolledEnough = narrow && scrollTop > 320;
    var show = canScroll && (nearBottom || scrolledEnough);
    $scrollTopBtn.toggleClass('is-visible', show);
  }

  $(window).on('scroll.tmScrollTop resize.tmScrollTop', toggleScrollTopButton);
  toggleScrollTopButton();

  $scrollTopBtn.on('click', function() {
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      $('html, body').scrollTop(0);
    } else {
      $('html, body').animate({ scrollTop: 0 }, 450);
    }
  });

});
