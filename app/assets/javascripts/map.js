$(document).ready(function() {

  var map;
  var currentLat;
  var currentLng;
  var currentLatLng;

  var busStops = [];
  var busStopMarkers = [];

  var closestBusStop;
  var closestBusStopMarker;
  var liveBuses = {};

  var directionDisplay;
  var directionsService = new google.maps.DirectionsService();

  var jerseyPosition = new google.maps.LatLng(49.21, -2.13);
  var location = new google.maps.LatLng(49.21, -2.13);
  var destination = new google.maps.LatLng(49.20, -2.13);


  var placesOfInterest = [
    { lat: 49.2, lng: -2.1, description: "Text to go in info box" },
    { lat: 49.2, lng: -2.13, description: "Text to go in info box" },
  ];


  var infoWindow = new google.maps.InfoWindow({
      content: "none",
      maxWidth: 500
  });



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

    directionsDisplay = new google.maps.DirectionsRenderer();

    // Create the map and center it on Jersey
    var mapOptions = {
          center: jerseyPosition,
          zoom: 13,
          minZoom: 9,
          streetViewControl: false,
          // overviewMapControl: false,
          // mapTypeControl: false,
          styles: mapStyle,

    };
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById("directions-panel"));

  }


  function plotCurrentLocation(position) {

    currentLat = position.coords.latitude;
    // currentLat = 49.22;
    currentLng = position.coords.longitude;
    // currentLng = -2.135;

    currentLatLng = new google.maps.LatLng(currentLat, currentLng);

    var marker = new google.maps.Marker({
        position: currentLatLng,
        map: map,
        icon: "assets/male.png",
        title: "You are here! (at least within a " + position.coords.accuracy + " meter radius)"
    });

    map.setCenter(marker.position);

    // Add bus busStopMarkers to map and compute closest stop
    addBusStops();


    // getLiveRouteData(15);
    // getLiveGeoData(49.21,-2.13);


    // Plot places of interest on the map
    $.each(placesOfInterest, function(i,item) {
      plotThings(item.lat,item.lng,item.description);
    });


  }


  function getLiveRouteData(route_id) {

    $.ajax({
      type: "GET",
      url: "/routes/" + route_id + "/live",
      dataType: "json",
      success: function(data){
        console.log(data);
        $.each(data,function(i,item) {
          // console.log(item[0].loc.coordinates);
          plotBus(item[0].loc.coordinates[1],item[0].loc.coordinates[0],item[0]._id);
        });
        // console.log(liveBuses);
      }
    });
  }


  function getLiveGeoData(lat,lng) {

    $.ajax({
      type: "GET",
      url: "/routes/geo",
      data: { lat: lat, lng: lng },
      dataType: "json",
      success: function(data){
        console.log(data);
      }
    });
  }


  function addBusStops() {

    $.ajax({
      type: "GET",
      url: "/stops",
      dataType: "json",
      success: function(data){
        $.each(data,function(i,item) {
          busStops.push(item);
          plotBusStop(item.latitude,item.longitude);
        });
        findClosestMarker();
      }
    });

  }

  function plotBusStop(lat,lng) {

    var pos = new google.maps.LatLng(lat, lng);
    var stop = new google.maps.Marker({
      position: pos,
      map: map
    });
    busStopMarkers.push(stop);
  }


  function plotBus(lat,lng,id) {

    var pos = new google.maps.LatLng(lat, lng);
    var marker = new google.maps.Marker({
      position: pos,
      map: map,
      icon: "assets/bus.png"
    });
    liveBuses[id] = marker;

    (function (marker, description) {
        google.maps.event.addListener(marker, "click", function (e) {
            infoWindow.setContent(description);
            infoWindow.open(map, marker);
        });
    })(marker, "Test");

  }



  function plotThings(lat,lng,description) {

    var pos = new google.maps.LatLng(lat, lng);
    var marker = new google.maps.Marker({
      position: pos,
      map: map
    });

    (function (marker, description) {
        google.maps.event.addListener(marker, "click", function (e) {
            infoWindow.setContent(description);
            infoWindow.open(map, marker);
        });
    })(marker, description);

  }




  function rad(x) {return x*Math.PI/180;}
  function findClosestMarker() {

    var R = 6371; // radius of earth in km
    var distances = [];
    var closest = -1;
    for( i=0;i<busStopMarkers.length; i++ ) {
      var mlat = busStopMarkers[i].position.lat();
      var mlng = busStopMarkers[i].position.lng();
      var dLat  = rad(mlat - currentLat);
      var dLong = rad(mlng - currentLng);
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(rad(currentLat)) * Math.cos(rad(currentLat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c;
      distances[i] = d;
      // busStopMarkers[i].setTitle("Distance: "+ d);
      if ( closest == -1 || d < distances[closest] ) {
          closest = i;
      }
    }

    // console.log(busStopMarkers[closest]);
    closestBusStop = busStops[closest];
    closestBusStopMarker = busStopMarkers[closest];
    busStopMarkers[closest].setIcon('assets/bus.png');
    routeToClosestMarker();

  }

  function routeToClosestMarker () {

    var request = {
      origin: currentLatLng,
      destination: closestBusStopMarker.position,
      travelMode: google.maps.DirectionsTravelMode.WALKING
    };

    directionsService.route(request, function(response, status) {
      // console.log(status);
      // console.log(response);
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      }
    });

    getNextBuses();

  }

  function getNextBuses() {

    // console.log(closestBusStop);

    $.ajax({
      type: "GET",
      url: "/stops/" + closestBusStop.id + "/next_buses/",
      dataType: "json",
      success: function(data){
        $.each(data,function(i,item) {
          console.log(item);
        });
      }
    });

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
    moveMarkerAndPan();
  });

  function moveMarker(position) {

    map.panTo(position);

    marker.animateTo(position, {
      easing: "easeInOut",
      duration: 100,
      complete: function() {
        // alert("animation complete");
      }
    });
  }

  function moveMarkerAndPan() {

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

    for (i=0; i<=increments; i++) {
      var newPos = new google.maps.LatLng(sLat + i*iLat, sLng + i*iLng);
      (function(i,newPos,panTime){
        setTimeout(function(){
          map.panTo(newPos);
        },i*panTime)
      }(i,newPos,panTime));
    }
  }

});