var socket = io();

socket.on('connect', function(){
  console.log('Connnected to server');
});

socket.on('disconnect', function(){
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message){
  console.log('newMessage', message);
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var li = $('<li></li>');
  li.text(`${message.from} ${formattedTime}: ${message.text}`);

  $('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
  var formattedTime = moment().format('h:mm a');
  var li = $('<li></li>');
  var a = $('<a target="blank">My current location</a>');
  li.text(`${message.from} ${formattedTime}: `);
  a.attr('href', message.url);
  li.append(a);
  $('#messages').append(li);
});



var messageTextbox = $('[name=message]');
$('#messageForm').on('submit', function(e){
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function(){
    messageTextbox.val('')
  });
});

var locationButton = $('#send-location');
locationButton.on('click', function(){
  if(!navigator.geolocation)
    return alert('Geolocation not supported by browser');

  $('#send-location').attr('disabled', true).text('Getting location'); //disable while waiting for response

  navigator.geolocation.getCurrentPosition(
    function(position){

      $('#send-location').removeAttr('disabled').text('Send location'); //enable once callback occurs

      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    function(){
      $('#send-location').removeAttr('disabled').text('Send location');
      alert('Unable to fetch location');
    }
  );
});
