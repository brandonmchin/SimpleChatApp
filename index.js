const express = require('express');
const socket = require('socket.io');

const app = express();
const server = app.listen(3000, function() {
	console.log('Listening on port 3000...');
});

// Static folders
app.use(express.static('public'));

// Socket setup
const io = socket(server);

io.on('connection', function(socket) {
	console.log('Socket connection established : ', socket.id);

	socket.on('chat', function(data) {
		io.sockets.emit('chat', data);		// Emit to all sockets
	});

	socket.on('typing', function(data) {
		socket.broadcast.emit('typing', data);		// Emit to all sockets except originator
	});
});