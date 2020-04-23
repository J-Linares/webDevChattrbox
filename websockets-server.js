var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
    port: port
});
var messages = [];
var msgtopic = [];

console.log('websockets server started');


ws.on('connection', function (socket) {
    console.log('client connection established');

    messages.forEach(function (msg) {
        socket.send(msg);
    });

    msgtopic.forEach(function(setTopic){
        socket.setTopic(setTopic)
    });

    socket.on('message', function (data) {
        console.log('message received: ' + data);
        messages.push(data);
        ws.clients.forEach(function (clientSocket) {
            clientSocket.send(data)
        });

    });

    socket.on('topic', function(data){
        console.log('topic set: ' + data);
        msgtopic.push(data);
        ws.clients.forEach(function(clientSocket){
            clientSocket.send(data)
        });
    });

});