var EventEmitter = require('events').EventEmitter;
var events = new EventEmitter;

var vm_stat = require('./vm_stat')();
vm_stat.on('data', function(d) { events.emit('vm_stat', d); });

var io = require('socket.io').listen(8000);

io.sockets.on('connection', function (socket) {
  events.on('vm_stat', push);
  function push(d) {
    socket.emit('vm_stat', d);
  }
  socket.on('disconnect', function (data) {
    events.removeListener('vm_stat', push);
  });
});

