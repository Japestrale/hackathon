$(document).ready(function(){


  var mapStyle = [
    {"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}
    ];

  var handler = Gmaps.build('Google');

  handler.buildMap({
      internal: {
        id: 'map-canvas'
      },
      provider: {
        zoom:      13,
        center:    new google.maps.LatLng(49.2, -2.1),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles:    mapStyle
      }
    },
    addMarkers
  );

  var markers;
  function addMarkers() {

    markers = handler.addMarkers([
        {
          "lat": 49.2,
          "lng": -2.1,
          "picture": {
            "url": "assets/bus.png",
            "width":  36,
            "height": 36
        },
        "infowindow": "hello!"
      }
    ]);
    // handler.bounds.extendWith(markers);
    // handler.fitMapToBounds();
    console.log(markers);

    markers.setCenter();
  }



});