var socket = io();

socket.on('connect', function(){
  console.log('Connnected to server');

  socket.emit('createMessage', {
    to: 'Bob',
    from: 'Jane',
    text: 'this is some text from jane',
    createAt: '02/08/2017'
  });
});

socket.on('disconnect', function(){
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message){
  console.log('newMessage', message);
});
