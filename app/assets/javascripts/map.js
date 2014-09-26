$(document).ready(function() {

  var map;
  var marker;
  var self;
  var jerseyPosition = new google.maps.LatLng(49.21, -2.13);
  var location = new google.maps.LatLng(49.21, -2.13);
  var destination = new google.maps.LatLng(49.20, -2.13);

  // Initialize the maps on window load
  google.maps.event.addDomListener(window, 'load', initialize);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(plotCurrentLocation);
  } else {
    console.log('Geolocation not supported');
  }

  // If we've got localstorage available
  // if ( typeof(Storage) !== "undefined" ) {

  //   // console.log( localStorage.getItem("best-score") );

  //   // If the user has a defined best score then retrieve it and update the view
  //   if ( localStorage.getItem("best-score") ) {

  //     bestScore = parseInt(localStorage.getItem("best-score"));
  //     $('#best-score').text( bestScore.number_with_delimiter() );
  //     // console.log(bestScore);

  //   }

  // } else {
  //   alert('The browser you are using is outdated.\n\nPlease upgrade to enable the scoring system.\n\nI recommend downloading Google Chrome');
  // }

  var mapStyle = [
    {"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}
    ];

  // Initialize the two maps
  function initialize() {

    // Create the map and center it on Jersey
    var mapOptions = {
          center: jerseyPosition,
          zoom: 14,
          minZoom: 11,
          streetViewControl: false,
          overviewMapControl: false,
          mapTypeControl: false,
          styles: mapStyle,

    };
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    addMarker();
  }


  function addMarker() {

    marker = new google.maps.Marker({
      position: location,
      map: map,
      icon: "assets/bus.png",
      // animation: google.maps.Animation.DROP
    });

  }

  $('#animate').click(function(){
    // moveMarker(destination);
    markerTest2();
  });

  $('#add-stops').click(function() {

    $.ajax({
      type: "GET",
      url: "/stops",
      dataType: "json",
      success: function(data){
        $.each(data,function(i,item) {
          // console.log(item);
          plotBusStop(item.latitude,item.longitude);
        });
      }
    });

  });

  var stops;
  function plotBusStop(lat,lng) {

    var pos = new google.maps.LatLng(lat, lng);
    // console.log(pos);
    var sky = new google.maps.Marker({
      position: pos,
      map: map
    });
    // stops.push(stop);

  }

  function moveMarker(position) {

    map.panTo(position);

    marker.animateTo(position, {
      easing: "easeInOut",
      duration: 100,
      complete: function() {
        // alert("animation complete");
        moveMarker(location);
      }
    });
  }

  var i = 0; var j = 0;
  function markerTest() {

    if (i > 0.02) {
      return
    }
    var newLat = 49.21 + i;
    var newLng = -2.13 + j;
    var newPos = new google.maps.LatLng(newLat, newLng);

    map.panTo(newPos);

    marker.animateTo(newPos, {
      easing: "easeInOut",
      duration: 10,
      complete: function() {
        i = i + 0.001
        j = j + 0.001
        markerTest();
      }
    });
  }

  function markerTest2() {

    var sLat = 49.21;
    var sLng = -2.13;
    var fLat = 49.23;
    var fLng = -2.11;
    var newPos = new google.maps.LatLng(fLat, fLng);
    var duration = 3000;

    marker.animateTo(newPos, {
      easing: "linear",
      duration: duration,
      complete: function() {

      }
    });

    smoothPan(sLat,fLat,sLng,fLng,duration);
  }

  function smoothPan(sLat,fLat,sLng,fLng,duration) {

    var cLat = fLat - sLat;
    var cLng = fLng - sLng;
    var panTime = 100;
    var increments = duration / panTime;
    var iLat = cLat / increments;
    var iLng = cLng / increments;
    console.log(increments);

    for (i=0; i<=increments; i++) {
      var newPos = new google.maps.LatLng(sLat + i*iLat, sLng + i*iLng);
      // console.log(newPos);

      (function(i,newPos,panTime){
        setTimeout(function(){
          map.panTo(newPos);
          // console.log(newPos);
          // console.log(i);
          // console.log(i*panTime);
        },i*panTime)
      }(i,newPos,panTime));

    }
  }

  function findMe() {



      // // What to do if a bearing is clicked on
      // $('.bearing').click(function(){

      //   bearing = $(this).data('bearing');
      //   activity = 0;

      //   var dataStr = "add_entry=true&lat=" + lat + "&lng=" + lng + "&bearing=" + bearing + "&activity=" + activity;

      //   $.ajax({
      //     type: 'post',
      //     url: "submit.php",
      //     data: dataStr,
      //     dataType: 'json',
      //     success: function(data) {
      //       // console.log('success');
      //       alert('Sighting added!');
      //     },
      //     error: function(error) {
      //       console.log(error);
      //     }
      //   });

      // });

      // $('#refresh').click(function(){

      //   $('#bearings').fadeOut(200);
      //   $('#status').fadeIn(200);
      //   $('#refresh').fadeOut(200);

      //   navigator.geolocation.getCurrentPosition(function(position){

      //     lat = position.coords.latitude;
      //     lng = position.coords.longitude;
      //     latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      //     map.setCenter(latlng);
      //     marker.setPosition(latlng);

      //     $('#status').fadeOut(200);
      //     $('#bearings').fadeIn(200);
      //     $('#refresh').fadeIn(200);
      //   },
      //   function(msg){
      //     console.log(msg);
      //   },
      //   {
      //     timeout: 0,
      //     enableHighAccuracy: true,
      //     maximumAge: Infinity
      //   });
      // });

  }

  function plotCurrentLocation(position) {

    // console.log(position.coords);
    lat = position.coords.latitude;
    lng = position.coords.longitude;

    // $('#status').fadeOut(200);
    // $('#bearings').fadeIn(200);
    // $('#refresh').fadeIn(200);

    latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    // mapOptions = {
    //   zoom: 15,
    //   center: latlng,
    //   mapTypeControl: false,
    //   navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
    //   mapTypeId: google.maps.MapTypeId.ROADMAP
    // };
    // map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    self = new google.maps.Marker({
        position: latlng,
        map: map,
        title:"You are here! (at least within a "+position.coords.accuracy+" meter radius)"
    });
  }



});