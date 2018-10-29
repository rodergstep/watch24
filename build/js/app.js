(function($) {
  $('.filter__btn-more').click(function() {
    $(this).closest('.filter__block').find('ul li:nth-child(n + 5)').slideToggle('fast');
  });
  $('.btn-filters-trigger ').click(function() {
    $('body').toggleClass('filter-mobile-showing');
  });
  // slick slider
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
          {
            breakpoint: 767,
            settings: { slidesToShow: tabletSlides, slidesToScroll: tabletSlides },
          },
        ],
      };

      if (savedOptions.hasOwnProperty('mobile')) {
        defaultOptions.responsive.push({
          breakpoint: 600,
          settings: { slidesToShow: savedOptions.mobile, slidesToScroll: 1 },
        });
      } else {
        defaultOptions.responsive.push({
          breakpoint: 600,
          settings: { slidesToShow: 1, slidesToScroll: 1 },
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
        let $animatingElements = $(`div.slick-slide[data-slick-index="${nextSlide}"]`).find(
          '[data-animation]',
        );
      });
      $carousel.slick(slickOptions);
    });
  }
  // end Slick slider
  // Google Map
  var googleMapsLoaded = false;
  window.initMaps = function() {
    var $maps = $('.map-canvas');
    if ($maps.length) {
      console.log('lllll');
      if (!googleMapsLoaded) {
        var key = 'AIzaSyDe4WeeWQ8_mWVwzL0Z9j3S4MpM6Of17wo';
        $
          .getScript('https://maps.google.com/maps/api/js?sensor=true&key=' + key)
          .done(function(script, textStatus) {
            googleMapsLoaded = true;
            createMaps($maps);
          })
          .fail(function(jqxhr, settings, ex) {
          });
      } else {
        createMaps($maps);
      }
    }
  };

  window.createMaps = function($maps) {
    $maps.each(function() {
      let latitude = this.getAttribute('data-latitude');
      let longitude = this.getAttribute('data-longitude');
      if (!latitude && !longitude) {
        latitude = '49.839683';
        longitude = '24.029717';
      }
      // console.log(this);
      var mapOptions = {
        zoom: 15,
        center: new google.maps.LatLng(latitude, longitude),
        marker: true,
        scrollwheel: false,
        mapTypeControl: false,
        streetViewControl: false,
      };
      var mapCanvas = $(this).get(0);
      var map = new google.maps.Map(mapCanvas, mapOptions);
      var myLatLong = new google.maps.LatLng(latitude, longitude);
      // mapOptions.center = myLatLong;
      if (mapOptions.marker) {
        var marker = new google.maps.Marker({
          position: myLatLong,
          map: map,
          title: 'Watch24.com',
          icon: {
            url: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24.38 39' width='24.38' height='39'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%233c3b4d;%7D%3C/style%3E%3C/defs%3E%3Cpath class='cls-1' d='M12.19,0a12.19,12.19,0,0,0-11,17.45L12.19,39,23,17.72A12.19,12.19,0,0,0,12.19,0Zm0,19.5a7.31,7.31,0,1,1,7.31-7.31A7.31,7.31,0,0,1,12.19,19.5Z'/%3E%3C/svg%3E`,
          },
        });
      }
    });
  };
  initMaps();
})(jQuery);
// Google Map

//# sourceMappingURL=app.js.map
