const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;


var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'Bob',
    text: 'this is some text from Bob',
    createAt: '02/08/2017'
  });

  socket.on('createMessage', (message)=>{
    console.log('createMessage', message);
  });

  socket.on('disconnect', ()=>{
    console.log('Client disconnected');
  });
});

server.listen(port, ()=>{
  console.log(`App is up on port ${port}`);
});
