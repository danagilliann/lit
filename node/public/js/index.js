var socket = io.connect();
  socket.on('connection', function(tweet){
  $('#tweetd').append(tweet+'<br>');
});
