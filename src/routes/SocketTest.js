var SOCKET_URL = "http://127.0.0.1:4000"

var socket = require('socket.io-client')(SOCKET_URL, {
  transports: ['websocket'] // you need to explicitly tell it to use websockets
});

socket.on('connect', function () {
  console.log(socket.id); // 'G5p5...'
  socket.on('disconnect', function () {
    console.log('socket disconnect');
});
});

socket.on('connect_error', function (err) {
  console.log(err);
  socket.removeListener('connect_error');
});

socket.on('disconnect', function () {
  console.log('socket disconnect');
});

let args = {
  question:"你好!"
}
socket.emit('callAI',{
  aiID:'xiaoi',
  args:args
});

socket.on('BlockChain', function(res){
  console.log(res);
});


socket.on('FrozenFunds', function(res){
  console.log(res);
})


socket.on('Worker', function(res){
  console.log(res);
})


socket.on('DeductFunds', function(res){
  console.log(res);
})


socket.on('CallBack', function(res){
  console.log(res);
})

