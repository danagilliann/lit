var socket = io.connect();
socket.on('stream', function(data){
  if (data.lat !== undefined && data.lng !== undefined) {
    $('body').append('<div>'+data.lat+data.lng+'</div>');
  }
});
