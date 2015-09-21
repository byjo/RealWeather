var express = require('express');
var router = express.Router();

var http = require("http");
var WebSocketServer = require("websocket").server;

var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://125.209.194.165:27017/realweather';

var server = http.createServer(function(request, response) {
	console.log((new Date()) + " Received request for " + request.url);
	response.writeHead(404);
	response.end();
});

server.listen(8080, function() {
	console.log((new Date()) + " Server is listening on port 8080");
});

wsServer = new WebSocketServer({
	httpServer: server
});


wsServer.on("request", function(request) {
	var connection = request.accept(null, request.origin);
	console.log((new Date()) + " Peer " + connection.remoteAddress + " connected.");

	connection.on("message", function(message) {
		// console.log(new Date()) + " Peer " + this.remoteAddress);
		console.log(this.socket._peername);
		console.log(message.utf8Data);


		mongoClient.connect(url, function(err, db) {

			var data = JSON.parse(message.utf8Data);

			// limit()
			db.collection('weather').insert(data ,function(err, data) {
				db.close();
			});
		});

		connection.sendUTF(message.utf8Data);
	});

	connection.on("close", function(reasonCode, description) {
		console.log((new Date()) + " Peer " + connection.remoteAddress + " disconnected." + reasonCode);
	})
});

module.exports = router;