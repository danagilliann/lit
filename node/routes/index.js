var express = require('express'),
    router = express.Router(),
    Twit = require('twit'),
    http = require('http'),
    request = require("request");

var swarmUrl,
    venueId,
    lng,
    lat,
    stream;

module.exports = function (io) {
  var T = new Twit({
    consumer_key: "CiJx9P0re2uDKdKsfU2mumtqQ",
    consumer_secret: "usw8meYVytHuxBA2zoF12vu1ec57MBAGkITvmXUwt0ZfVyyniB",
    access_token: "36513606-H4bVYvjRiQNzdJHFQChye30NbmCdjDDvyZrSlYTrC",
    access_token_secret: "461hnPFGtBoGzBsCG4FmF5n2w1TRACmrVZmigPAeR5GSG",
    timeout_ms: 60*1000  // optional HTTP request timeout to apply to all requests.
  });

  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index');
  });

  io.on('connection', function(socket){

    // twitter stream
    var stream = T.stream("statuses/filter", { track: 'swarmapp', language: 'en'});
    
    stream.on('message', function(msg) {
      if (msg.entities.urls[0] !== undefined && msg.entities.urls[0].display_url !== undefined) {
        swarmUrl = msg.entities.urls[0].display_url;
        swarmUrl = swarmUrl.split("/");
        
        if (swarmUrl[2] !== undefined) {
          swarmUrl = swarmUrl[2]; // gets swarm id
        }
    
        if (swarmUrl !== undefined) {
          // swarm request
          var foursquareRequest = "https://api.foursquare.com/v2/checkins/resolve?shortId=" + swarmUrl +"&oauth_token=1N5UGBL211K2VR5T2AFW0J0V4H5UWZPOUO4BFLPTSP1ENWPZ&v=20160402";
    
          request({
            url: foursquareRequest,
            json: true
          }, function (error, response, body) {
          
            if (!error && response.statusCode === 200) {
              console.log()
              lat = body.response.checkin.venue.location.lat;
              lng = body.response.checkin.venue.location.lng;
              console.log(lat + ", " + lng); // Print the json response
            }
          });
        }
      }
      socket.emit('stream', {lat: lat, lng: lng});
    });
    
    stream.on('error', function(err) {
      console.log(err);
    });
    
  });

  // io.sockets.on('connection', function(sockets) {
  // 
  //   // twitter stream
  //   var stream = T.stream("statuses/filter", { track: 'swarmapp', language: 'en'});
  //   
  //   stream.on('message', function(msg) {
  //     if (msg.entities.urls[0] !== undefined && msg.entities.urls[0].display_url !== undefined) {
  //       swarmUrl = msg.entities.urls[0].display_url;
  //       swarmUrl = swarmUrl.split("/");
  //       
  //       if (swarmUrl[2] !== undefined) {
  //         swarmUrl = swarmUrl[2]; // gets swarm id
  //       }
  //   
  //       if (swarmUrl !== undefined) {
  //         // swarm request
  //         var foursquareRequest = "https://api.foursquare.com/v2/checkins/resolve?shortId=" + swarmUrl +"&oauth_token=1N5UGBL211K2VR5T2AFW0J0V4H5UWZPOUO4BFLPTSP1ENWPZ&v=20160402";
  //   
  //         request({
  //           url: foursquareRequest,
  //           json: true
  //         }, function (error, response, body) {
  //         
  //           if (!error && response.statusCode === 200) {
  //             console.log()
  //             lat = body.response.checkin.venue.location.lat;
  //             lng = body.response.checkin.venue.location.lng;
  //             console.log(lat + ", " + lng); // Print the json response
  //           }
  //         });
  //       }
  //     }
  //     sockets.emit('stream', lat);
  //   });
  //   
  //   stream.on('error', function(err) {
  //     console.log(err);
  //   });
  // 
  // });

  return router;

}
