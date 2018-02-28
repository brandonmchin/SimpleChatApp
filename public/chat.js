// Establish connection
const socket = io.connect('http://localhost:3000');

// Query DOM
let message = document.getElementById('message');
let name = document.getElementById('name');
let button = document.getElementById('send');
let output = document.getElementById('output');
let feedback = document.getElementById('feedback');

// Click send button event
button.addEventListener('click', function() {
	socket.emit('chat', {
		name: name.value,
		message: message.value
	});
	message.value = '';
});

// Typing message event
message.addEventListener('keypress', function() {
	socket.emit('typing', name.value);
});

// Listen for events
socket.on('chat', function(data) {
	feedback.innerHTML = '';
	output.innerHTML += '<p><strong>' + data.name + ':</strong>' + data.message + '</p>';
})

socket.on('typing', function(data) {
	feedback.innerHTML = '<p><em>' + data + ' is typing...</em></p>';
})