var request = require("request");
var express = require("express");
var app = express();
var Twit = require('twit');
var swarmUrl;
var venueId;

if (!process.env.twitter_consumer_key) {
  var env = require('./env.js');
}

var T = new Twit({
  consumer_key: process.env.twitter_consumer_key,
  consumer_secret: process.env.twitter_consumer_secret,
  access_token: process.env.twitter_access_token,
  access_token_secret: process.env.twitter_access_token_secret,
  timeout_ms: 60*1000  // optional HTTP request timeout to apply to all requests.
});

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
            console.log(body.response.checkin.venue.location.lat + ", " + body.response.checkin.venue.location.lng); // Print the json response
            venueId = body.response.checkin.venue.id;
            console.log(venueId);
          }
      });
    }
  }
});

stream.on('error', function(err) {
  console.log(err);
});

// listening on 3000
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
