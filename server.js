var http = require('http');
var path = require('path');
var db = require('./model/db');
var socketio = require('socket.io');
var express = require('express');
var _ = require('lodash');

var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);

router.use(express.static(path.resolve(__dirname, 'client')));

io.on('connection', function (client) {
  db.User.findOne({ id: 'JR' }, function(error, user) {
    if (!user) {
      user = new db.User({
        id: 'JR',
        name: { firstName: 'Jens', lastName: 'Rasmussen' },
        phoneNumber: '55555555',
        email: 'dont@email.me'
      });
      
      user.save(function (error, user) {});
    }
    client.emit('user', user);  
  });
  
  client.on('updateUser', function (updatedUser) {
     db.User.update(
       { id: 'JR' },
       {
         name: updatedUser.name,
         phoneNumber: updatedUser.phoneNumber,
         email: updatedUser.email
       },
       function(error, count, response) { });
   });
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Babelfisk server listening at", addr.address + ":" + addr.port);
});
