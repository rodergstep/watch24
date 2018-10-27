(function($) {
  "use strict";

  /* Carousels */
  window.initCarousels = function() {
    var $carouselWrappers = $('.carousel-wrapper');
    if (!$carouselWrappers.length) {
      return;
    }

    $carouselWrappers.each(function() {
      var $carousel = $(this).children('.carousel');

      if ($carousel.hasClass('slick-initialized'))
        return;

      var savedOptions = $(this).data('carousel-settings'),
        tabletSlides = 1 == savedOptions.slidesToShow ? 1 : 2,

        defaultOptions = {
          dots: true,
          // appendDots: $('.dots-container'),
          arrows: true,
          nextArrow: '<button type="button" class="slick-next"><span class="nav-text h5">Next</span></button>',
          prevArrow: '<button type="button" class="slick-prev"><span class="nav-text h5">Previous</span></button>',
          responsive: [{
              breakpoint: 767,
              settings: {
                slidesToShow: tabletSlides,
                slidesToScroll: tabletSlides
              }
            },

          ]
        };


      if (savedOptions.hasOwnProperty("mobile")) {
        defaultOptions.responsive.push({
          breakpoint: 600,
          settings: {
            slidesToShow: savedOptions.mobile,
            slidesToScroll: 1
          }
        });
      } else {
        defaultOptions.responsive.push({
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        });
      }

      let slickOptions = $.extend({}, defaultOptions, savedOptions);
      $carousel.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $(this).next('.carousel-slide-counter').html('<span class="current">' + i + '</span><span class="slash">/</span><span class="total">' + slick.slideCount + '</span>');
      });

      // Add animation on slide
      // $carousel.on('init', function(e, slick) {
      // var $elements = $('div.slick-slide:first-child').find('.has-animation');
      // animateElements($elements);    
      // });
      // $carousel.on('beforeChange', function(e, slick, currentSlide, nextSlide) {
      //   $(this).find('.has-animation').css("opacity", '0').removeClass('mj-animated');
      //   var $nextElements = $('div.slick-slide[data-slick-index="' + nextSlide + '"]').find('.has-animation');
      //   animateElements($nextElements);
      // });

      $carousel.on('beforeChange', function(e, slick, currentSlide, nextSlide) {
        var $animatingElements = $('div.slick-slide[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
        doAnimations($animatingElements);
      });

      function doAnimations(elements) {
        var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        elements.each(function() {
          var $this = $(this);
          var $animationDelay = $this.data('delay');
          var $animationType = 'animated ' + $this.data('animation');
          $this.css({
            'animation-delay': $animationDelay,
            '-webkit-animation-delay': $animationDelay
          });
          $this.addClass($animationType).one(animationEndEvents, function() {
            $this.removeClass($animationType);
          });
        });
      }
      $carousel.slick(slickOptions);
    });
  }

  window.destroyCarousels = function(carousels) {
    if (carousels.length) {
      carousels.slick('unslick');
    }
  }


})(jQuery);
//# sourceMappingURL=carousel.js.map
