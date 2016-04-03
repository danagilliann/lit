var socket = io.connect();
var config = {
  apiKey: 'E1TFALSGEGWBY1WJ503B543EHW2SSABDFMV512G4WRG55P2O',
  authUrl: 'https://foursquare.com/',
  apiUrl: 'https://api.foursquare.com/'
};

/* HTML 5 geolocation. */
navigator.geolocation.getCurrentPosition(function(data) {
 var lat = data['coords']['latitude'];
 var lng = data['coords']['longitude'];

 if (document.getElementById('googleMap')){
   // Coordinates to center the map
   var myLatlng = new google.maps.LatLng(lat,lng);
   // Other options for the map, pretty much selfexplanatory
   var mapOptions = {
     zoom: 3,
     center: myLatlng,
     mapTypeId: google.maps.MapTypeId.ROADMAP
   };

   var icon = {
     url: "http://i.giphy.com/3oGRFFnL5C6iZEfI9W.gif",
     size: new google.maps.Size(20, 20),
     origin: new google.maps.Point(0, 0),
     anchor: new google.maps.Point(0, 32)
   };

   // Attach a map to the DOM Element, with the defined settings
   var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);
   socket.on('stream', function(data) {
     console.log(data.lat, data.lng);
     var marker = new google.maps.Marker({
       map: map,
       draggable:false,
       optimized: false, 
       position: {lat: data.lat, lng: data.lng},
       animation:google.maps.Animation.BOUNCE, 
       icon: icon
     });
     marker.setMap(map);

     var content = "<p class=\"content\"><b>" + data.venueName + "</b></p><p class=\"content\">" + data.address + "</p>";

     var infowindow = new google.maps.InfoWindow({
      content: content
     });

     marker.addListener('click', function() {
       infowindow.open(marker.get('map'), marker);
     });
   });
 }
});

