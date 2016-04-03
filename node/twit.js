var express = require("express");
var app = express();
var Twit = require('twit');
var swarm_url;

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


var stream = T.stream("statuses/filter", { track: 'swarmapp', language: 'en'});

stream.on('message', function(msg) {
  if (msg.entities.urls[0] !== undefined && msg.entities.urls[1].display_url !== undefined) {
    swarm_url = msg.entities.urls[0].display_url;
    swarm_url = swarm_url.split("/");
    swarm_url = swarm_url[2];
    console.log(swarm_url);
  }
});

stream.on('error', function(err) {
  console.log(err);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
