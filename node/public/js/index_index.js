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
     zoom: 17,
     center: myLatlng,
     mapTypeId: google.maps.MapTypeId.ROADMAP
   };
   // Attach a map to the DOM Element, with the defined settings
   var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);
  socket.on('stream', function(data){
    console.log(data.lat, data.lng);
    var marker = new google.maps.Marker({
      map: map,
      draggable:false,
      optimized: false, 
      position: {lat: data.lat, lng: data.lng},
      animation:google.maps.Animation.BOUNCE, 
      icon: "http://i.giphy.com/l4hLMJmP13XqnUpNe.gif"
    });
    marker.setMap(map);
  });
  
 }
});


