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

  // var location = new google.maps.LatLng(49.21, -2.13);
  // var destination = new google.maps.LatLng(49.20, -2.13);

  var placesOfInterestMarkers = [];
  var placesOfInterest = [
    { lat: 49.2290476, lng: -2.075265, description: "<h2>Durrell</h2>Founded over fifty years ago by the late author and naturalist Gerald Durrell, Durrell Wildlife Conservation Trust is a sanctuary to over 130 endangered species." },
    { lat: 49.210322, lng: -2.154318, description: "<h2>Jersey War Tunnels</h2> Jersey War Tunnels tells the true story of the Occupation of Jersey during World War Two. It is one of the Island's most popular tourist attractions as well as an important site of heritage conservation and interpretation." },
    { lat: 49.199541, lng: -2.019231, description: "<h2>Mont Orgueil</h2> History comes to life at Mont Orgueil Castle, which for over 600 years protected Jersey against French invasion. Explore the network of staircases, towers and secret rooms to discover hidden treasures." },
    { lat: 49.1820524, lng: -2.1081253, description: "<h2>Jersey Museum</h2> Jersey Museum presents history from 250,000 years ago when the first people arrived in Jersey and continues through the centuries to explore the factors that have shaped this unique island and the people who live here." },
    { lat: 49.181546, lng: -2.109965, description: "<h2>Maritime Museum</h2> Discover all about Jersey's maritime past in this uniquely interactive museum where you can see, touch, hear and even smell the exhibits!" },
    { lat: 49.222558, lng: -2.189863, description: "<h2>aMaizin! Adventure Park</h2> This award winning attraction launches in late March or early April each year through to September. An aMaizin experience for visiting families." },
    { lat: 49.175419, lng: -2.125683, description: "<h2>Elizabeth Castle</h2> Built on a rocky islet in St Aubin's Bay, Elizabeth Castle has defended Jersey for more than 300 years." },
    { lat: 49.229254, lng: -2.234286, description: "<h2>Channel Islands Military Museum</h2> The museum is housed in a former German bunker which once formed part of Hitler's Atlantic Wall defences" },
    { lat: 49.244611, lng: -2.198641, description: "<h2>GrÃ¨ve de Lecq Barracks</h2> Designed for the garrison troops stationed on the island at the height of the fear of Napoleonic invasion. Built almost 200 years ago, these are the only surviving barracks in Jersey." },
    { lat: 49.200663, lng: -2.064013, description: "<h2>La Hougue Bie</h2> One of Europe's finest passage graves set in beautiful surroundings, where you can learn about life in Jersey's Neolithic community 6,000 years ago." },
    { lat: 49.219574, lng: -2.165257, description: "<h2>Jersey's Living Legend</h2> Jersey's Living Legend Village features The Jersey Experience which provides a multi-dimensional insight into Jersey's heritage and history. Two 18 hole Adventure Golf courses, the Jersey Karting Complex plus more." },
    { lat: 49.245551, lng: -2.167571, description: "<h2>La Mare Wine Estate</h2> Set in the grounds of a wonderful 18th century Jersey granite farmhouse the estate produces a range of Wines, Jersey Apple Brandy, Apple Brandy Cream Liqueur, luxury chocolates, handmade fudge & biscuits as well as the famous Jersey Black Butter preserve." },
    { lat: 49.224304, lng: -2.135927, description: "<h2>Hamptonne Country Life Museum</h2> Discover six centuries of Jerseyâ€™s rural life at Hamptonne Country Life Museum. Dating back to the 15th century the house and farm are brought to life with characters from the Islandâ€™s past." },
    { lat: 49.20867, lng: -2.161436, description: "<h2>Le Moulin De QuÃ©tivel</h2> The last remaining working mill in Jersey, the building dates from the 18th century and was restored in 1978 by The National Trust for Jersey." },
    { lat: 49.1711754, lng: -2.1700305, description: "<h2>Noirmont Command Bunker</h2> Well-preserved German Naval Command Bunker that controlled the coastal artillery Batterie Lotheringen from 1944-45." },
    { lat: 49.224529, lng: -2.106474, description: "<h2>Pallot Steam, Motor & General Museum</h2> An absorbing evocation of times past. There is something to excite the interest of everyone in this fascinating collection of steam and so much more." },
    { lat: 49.185978, lng: -2.169709, description: "<h2>The Harbour Gallery</h2> The Harbour Gallery and Creative Design Studios is the largest exhibiting and selling gallery in the Channel Islands. It promotes the work of over 100 local artists and craftworkers." },
    { lat: 49.231275, lng: -2.233314, description: "<h2>Jersey Pearl</h2> For three generations, the Jersey Pearl family business has been dedicated to creating beautiful pearl jewellery." },
    { lat: 49.215733, lng: -2.084849, description: "<h2>Eric Young Orchid Foundation</h2> The Foundation was established by the late Eric Young, a man whose enthusiasm for orchids knew no bounds. This dedication to breeding and exhibiting orchids continues today, and has resulted in gold medals at prestigious shows around the world." },
    { lat: 49.191043, lng: -2.192016, description: "<h2>Reg's Garden</h2> This award-winning garden is a lovely place to sit and pass away a few hours. You will enjoy relaxing in the carefully landscaped areas, with a large Koi pond and waterfall." },
    { lat: 49.173787, lng: -2.077727, description: "<h2>The Gardens of Samares Manor</h2> The gardens, dating from the 1920s, have recently undergone substantial restoration and development including the creation of one of the most comprehensive herb gardens in Europe." },
    { lat: 49.183688, lng: -2.191177, description: "<h2>Fish 'N' Beads</h2> Local artist selling driftwood art and a selection of funky jewellery and beads. Create your own jewellery in a relaxed atmosphere sitting outside by the sea â€“ great fun for all the family." },
    { lat: 49.205241, lng: -2.183052, description: "<h2>Jersey Bowl</h2> An 18 lane AMF equipped bowling centre with a family diner, bar, pizza fast food outlet, beer garden, video games room, pool lounge, Quasar arena and both an indoor and oudoor adventure play area." },
    { lat: 49.23379, lng: -2.1839, description: "<h2>Catherine Best</h2> Catherine Best is an award-winning jewellery designer with an international clientele. Her shop and showroom is housed in a beautiful windmill, the perfect setting for her stunning and exclusive jewellery." },
    { lat: 49.178503, lng: -2.102134, description: "<h2>Beads N Crafts</h2> Beads N Crafts is an unique shop with an unusual selection of beads and charms. Find a real treat for any beader with our pop in beading workshops thatâ€™s suitable for all ages." },
    { lat: 49.198429, lng: -2.142472, description: "<h2>St Matthrew's Glass Church</h2> The glass work including the font, altar rail, cross and pillars, was created by RenÃ© Lalique of Paris and is considered to be amongst his greatest achievements." },
    { lat: 49.183129, lng: -2.113479, description: "<h2>AquaSplash</h2> 25m x 6 lane pool, leisure pool with wave machine, outdoor pool with lazy river, 2 flumes, 1 tyre ride, boogie board and snorkelling sessions, sauna, steam room, crÃ¨che and swimming lessons." },
    { lat: 49.2097089, lng: -2.221686, description: "<h2>Les Mielles Activity Centre</h2> Segway Rally, Giant Inflatable Slide, Bungee Trampolines, Laser Clay Pigeon Shooting, Mini-Golf, Gyroscope." },
    { lat: 49.185205, lng: -2.106761, description: "<h2>16 New Street</h2> Constructed in the 1730s, 16 New Street is undoubtedly the finest remaining Georgian town house in St Helier and, as such, presents a wonderful example of the elegant architectural style and fashions of 18th century Jersey" },
    { lat: 49.193424, lng: -2.125609, description: "<h2>The Mansell Collection</h2> Nigel Mansell - Formula 1 World Champion and CART Indy Car World Series winner. The word legend is often used in sporting circles, but who can really deny that Nigel surpasses that title" },
    { lat: 49.2183118, lng: -2.1972817, description: "<h2>The Forgotten Forest - The Val De La Mare Arboretum</h2>The Forgotten Forest - The Val De La Mare Arboretum is a project which local tree charity Jersey Trees for Life undertook as part of its 75th anniversary celebrations in 2012." },
    { lat: 49.186444, lng: -2.101332, description: "<h2>Jersey Arts Centre</h2> jersey arts centre A registered charity and non-profit making organisation, the Jersey Arts Centre offers a wide range of contemporary and classic performing and visual arts, including theatre, exhibitions, music, film, workshops, courses, presentations and events." },
    { lat: 49.18664, lng: -2.112812, description: "<h2>Jersey Opera House</h2> The Jersey Opera House brings you quality drama, dance, ballet, concerts, musicals, opera, comedy, pantomime and childrenâ€™s showsâ€¦ We have something for everyone." },
    { lat: 49.182373, lng: -2.107442, description: "<h2>Cineworld</h2> Seasonal Status: - open all year round. Movies for all Moods, Luxury Stadium Seating, Licensed Bar, VIP Boxes, Movies for Juniors and Monday Classics." }
  ];

  // Map styles
  var mapStyle = [
    {"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}
    ];

  // InfoWindow for directions
  var infoWindow = new google.maps.InfoWindow({
      content: "none",
      maxWidth: 500
  });

  // Initialize the maps on window load
  google.maps.event.addDomListener(window, 'load', initialize);
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

  // Find position and start things going
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(plotCurrentLocation);
  } else {
    console.log('Geolocation not supported');
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
      plotPlaceOfInterest(item.lat,item.lng,item.description);
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

  // Gets all bus stops and places markers on the map
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

  // Plots a bus stop on the map
  function plotBusStop(lat,lng) {

    var pos = new google.maps.LatLng(lat, lng);
    var marker = new google.maps.Marker({
      position: pos,
      map: map,
      icon: 'assets/bus.png'
    });
    marker.setVisible(false); // Hide the bus stop marker
    busStopMarkers.push(marker);
    setInfoWindow(marker, "This is a bus stop");
  }

  // Plots a bus on the map
  function plotBus(lat,lng,id) {

    var pos = new google.maps.LatLng(lat, lng);
    var marker = new google.maps.Marker({
      position: pos,
      map: map,
      icon: "assets/bus.png"
    });
    liveBuses[id] = marker;
    setInfoWindow(marker, "This is a bus");
  }

  // Plots a place of interest on the map
  function plotPlaceOfInterest(lat,lng,description) {

    var pos = new google.maps.LatLng(lat, lng);
    var marker = new google.maps.Marker({
      position: pos,
      map: map
    });
    setInfoWindow(marker, description);
  }

  // Sets an info window handler for the marker
  function setInfoWindow(marker, description) {
    (function (marker, description) {
        google.maps.event.addListener(marker, "click", function (e) {
            infoWindow.setContent(description);
            infoWindow.open(map, marker);
        });
    })(marker, description);
  }

  // Finds closest marker and displays prominently on map
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
      busStopMarkers[i].setTitle("Distance: "+ d);
      if ( closest == -1 || d < distances[closest] ) {
          closest = i;
      }
    }

    // Mark this bus stop as the closest
    closestBusStop = busStops[closest];
    closestBusStopMarker = busStopMarkers[closest];

    // Show the marker on the map
    busStopMarkers[closest].setVisible(true);

    // Plot a route to this marker and display directions
    routeToClosestMarker();

  }

  // Plots a route to the current marker and displays walking directions and time
  function routeToClosestMarker () {

    var request = {
      origin: currentLatLng,
      destination: closestBusStopMarker.position,
      travelMode: google.maps.DirectionsTravelMode.WALKING
    };

    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      }
    });

    getNextBuses();

  }

  function getNextBuses() {

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







  // function getLiveGeoData(lat,lng) {

  //   $.ajax({
  //     type: "GET",
  //     url: "/routes/geo",
  //     data: { lat: lat, lng: lng },
  //     dataType: "json",
  //     success: function(data){
  //       console.log(data);
  //     }
  //   });
  // }






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






  // function addMarker() {

  //   marker = new google.maps.Marker({
  //     position: location,
  //     map: map,
  //     icon: "assets/bus.png",
  //     // animation: google.maps.Animation.DROP
  //   });
  // }





  // $('#animate').click(function(){
  //   moveMarkerAndPan();
  // });

  // function moveMarker(position) {

  //   map.panTo(position);

  //   marker.animateTo(position, {
  //     easing: "easeInOut",
  //     duration: 100,
  //     complete: function() {
  //       // alert("animation complete");
  //     }
  //   });
  // }

  // function moveMarkerAndPan() {

  //   var sLat = 49.21;
  //   var sLng = -2.13;
  //   var fLat = 49.23;
  //   var fLng = -2.11;
  //   var newPos = new google.maps.LatLng(fLat, fLng);
  //   var duration = 3000;

  //   marker.animateTo(newPos, {
  //     easing: "linear",
  //     duration: duration,
  //     complete: function() {

  //     }
  //   });
  //   smoothPan(sLat,fLat,sLng,fLng,duration);
  // }

  // function smoothPan(sLat,fLat,sLng,fLng,duration) {

  //   var cLat = fLat - sLat;
  //   var cLng = fLng - sLng;
  //   var panTime = 100;
  //   var increments = duration / panTime;
  //   var iLat = cLat / increments;
  //   var iLng = cLng / increments;

  //   for (i=0; i<=increments; i++) {
  //     var newPos = new google.maps.LatLng(sLat + i*iLat, sLng + i*iLng);
  //     (function(i,newPos,panTime){
  //       setTimeout(function(){
  //         map.panTo(newPos);
  //       },i*panTime)
  //     }(i,newPos,panTime));
  //   }
  // }

});