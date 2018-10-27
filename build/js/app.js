const $carouselWrappers = $('.carousel-wrapper');
if ($carouselWrappers.length) {
  $carouselWrappers.each(function() {
    const $carousel = $(this).children('.carousel');

    if ($carousel.hasClass('slick-initialized')) return;

    const savedOptions = $(this).data('carousel-settings');

    let tabletSlides = savedOptions.slidesToShow == 1 ? 1 : 2;

    let defaultOptions = {
      dots: true,
      // appendDots: $('.dots-container'),
      arrows: true,
      nextArrow: '<button type="button" class="slick-next"><span class="nav-text h5">Next</span></button>',
      prevArrow: '<button type="button" class="slick-prev"><span class="nav-text h5">Previous</span></button>',
      responsive: [
        { breakpoint: 767, settings: { slidesToShow: tabletSlides, slidesToScroll: tabletSlides } }
      ]
    };

    if (savedOptions.hasOwnProperty('mobile')) {
      defaultOptions.responsive.push({
        breakpoint: 600,
        settings: { slidesToShow: savedOptions.mobile, slidesToScroll: 1 }
      });
    } else {
      defaultOptions.responsive.push({
        breakpoint: 600,
        settings: { slidesToShow: 1, slidesToScroll: 1 }
      });
    }

    const slickOptions = $.extend({}, defaultOptions, savedOptions);
    $carousel.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
      const i = (currentSlide || 0) + 1;
      $(this)
        .next('.carousel-slide-counter')
        .html(
          `<span class="current">${i}</span><span class="slash">/</span><span class="total">${slick.slideCount}</span>`,
        );
    });

    $carousel.on('beforeChange', (e, slick, currentSlide, nextSlide) => {
      let $animatingElements = $(`div.slick-slide[data-slick-index="${  nextSlide  }"]`).find(
        '[data-animation]',
      );
    });
    $carousel.slick(slickOptions);
  });
}

//# sourceMappingURL=app.js.map
