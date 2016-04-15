var http = require('http');
var path = require('path');
var db = require('./model/db');
var async = require('async');
var socketio = require('socket.io');
var express = require('express');

var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);

router.use(express.static(path.resolve(__dirname, 'client')));

io.on('connection', function (client) {
  client.emit('user', {
    firstName: 'Jens',
    lastName: 'Rasmussen',
    phoneNumber: '55555555',
    email: 'dont@email.me'
  });
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Babelfisk server listening at", addr.address + ":" + addr.port);
});
