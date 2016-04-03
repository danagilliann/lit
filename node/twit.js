var express = require("express");
var app = express();
var Twit = require('twit');

var T = new Twit({
  consumer_key:         'CiJx9P0re2uDKdKsfU2mumtqQ',
  consumer_secret:      'usw8meYVytHuxBA2zoF12vu1ec57MBAGkITvmXUwt0ZfVyyniB',
  access_token:         '36513606-H4bVYvjRiQNzdJHFQChye30NbmCdjDDvyZrSlYTrC',
  access_token_secret:  '461hnPFGtBoGzBsCG4FmF5n2w1TRACmrVZmigPAeR5GSG',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

app.get('/', function(req, res) {
  var stream = T.stream("statuses/filter", { track: 'swarmapp.com', language: 'en'});
  stream.on('message', function(msg) {
    res.send(msg);
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
