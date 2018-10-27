(function($) {
  var googleMapsLoaded = false;
  window.initMaps = function() {
    var $maps = $('.map-canvas');
    if ($maps.length) {
      if (!googleMapsLoaded) {
        var key = "AIzaSyDe4WeeWQ8_mWVwzL0Z9j3S4MpM6Of17wo";
        $.getScript("https://maps.google.com/maps/api/js?sensor=true&key=" + key)
          .done(function(script, textStatus) {
            googleMapsLoaded = true;
            createMaps($maps);
          })
          .fail(function(jqxhr, settings, ex) {});
      } else {
        createMaps($maps);
      }
    }
  }

  window.createMaps = function($maps) {
    $maps.each(function() {
      let latitude = this.getAttribute('data-latitude');
      let longitude = this.getAttribute('data-longitude');;
      if (!latitude && !longitude) {
        latitude = "49.839683";
        longitude = "24.029717";
      }
      // console.log(this);
      var mapOptions = {
        zoom: 15,
        center: new google.maps.LatLng(latitude, longitude),
        marker: true,
        scrollwheel: false,
        mapTypeControl: false,
        streetViewControl: false,
        styles: [{
            "featureType": "administrative",
            "elementType": "all",
            "stylers": [{
              "saturation": "-100"
            }]
          },
          {
            "featureType": "administrative.province",
            "elementType": "all",
            "stylers": [{
              "visibility": "off"
            }]
          },
          {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{
                "saturation": -100
              },
              {
                "lightness": 65
              },
              {
                "visibility": "on"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{
                "saturation": -100
              },
              {
                "lightness": "50"
              },
              {
                "visibility": "simplified"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "all",
            "stylers": [{
              "saturation": "-100"
            }]
          },
          {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [{
              "visibility": "simplified"
            }]
          },
          {
            "featureType": "road.arterial",
            "elementType": "all",
            "stylers": [{
              "lightness": "30"
            }]
          },
          {
            "featureType": "road.local",
            "elementType": "all",
            "stylers": [{
              "lightness": "40"
            }]
          },
          {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [{
                "saturation": -100
              },
              {
                "visibility": "simplified"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                "hue": "#ffff00"
              },
              {
                "lightness": -25
              },
              {
                "saturation": -97
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [{
                "lightness": -25
              },
              {
                "saturation": -100
              }
            ]
          }
        ]
      };
      var mapCanvas = $(this).get(0);
      var map = new google.maps.Map(mapCanvas, mapOptions);
      var myLatLong = new google.maps.LatLng(latitude, longitude);
      // mapOptions.center = myLatLong;

      if (mapOptions.marker) {
        var marker = new google.maps.Marker({
          position: myLatLong,
          map: map,
          title: 'Kangaroo',
          icon: {
            url: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24.38 39' width='24.38' height='39'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%233c3b4d;%7D%3C/style%3E%3C/defs%3E%3Cpath class='cls-1' d='M12.19,0a12.19,12.19,0,0,0-11,17.45L12.19,39,23,17.72A12.19,12.19,0,0,0,12.19,0Zm0,19.5a7.31,7.31,0,1,1,7.31-7.31A7.31,7.31,0,0,1,12.19,19.5Z'/%3E%3C/svg%3E`
          }
        });
      }
    });
  }

})(jQuery);
//# sourceMappingURL=map.js.map
