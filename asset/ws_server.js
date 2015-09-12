var WebSocketServer = require("websocket").server;
var http = require("http");

var server = http.createServer(function(request, response) {
	console.log((new Date()) + " Received request for " + request.url);
	response.writeHead(404);
	response.end();
});

server.listen(8080, function() {
	console.log((new Date()) + " Server is listening on port 8080");
});

wsServer = new WebSocketServer({
	httpServer: server,
	autoAcceptConnection: false
});

function originIsAllowed(origin) {
	return true;
}

wsServer.on("request", function(request) {
	if (!originIsAllowed(request.origin)) {
		request.reject();
		console.log((new Date()) + " Connection from origin " + request.origin + " rejectd.");
		return;
	}

	var connection = request.accept(null, request.origin);
	connection.on("message", function(message) {
		if (message.type === "utf8") {
			console.log("Received Message: " + message.utf8Data);
			connection.sendUTF(message.utf8Data);
		} else if (message.type === "binary") {
			console.log("Received Binary Message of " + message.binaryData.length + " bytes");
			connection.sendBytes(message.binaryData);
		}
	});

	connection.on("close", function(reasonCode, description) {
		console.log((new Date()) + " Peer " + connection.remoteAddress + " disconnected.");
	})
})