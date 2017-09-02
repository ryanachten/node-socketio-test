var socket = io();

socket.on('connect', function(){
  console.log('Connnected to server');
  /*
  socket.emit('createMessage', {
    from: 'Jane',
    text: 'this is some text from jane',
  });
  */
});

socket.on('disconnect', function(){
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message){
  console.log('newMessage', message);
});
