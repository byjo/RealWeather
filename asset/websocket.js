var log = function(s) {
	console.log(s);
	if (document.readyState !== "complete") {
		log.buffer.push(s);
	} else {
		document.getElementById("output").innerHTML += (s + "\n");
	}
}

log.buffer = [];
url = "ws://localhost:8080";
w = new WebSocket(url);

w.onopen = function() {
	log("open");
	w.send("thank you for accepting this Web Socket request");
}

w.onmessage = function(e) {
	console.log(e.data);
	log(e.data);
}

w.onclose = function(e) {
	log("closed");
}

window.onload = function() {
	log(log.buffer.join("\n"));
	document.getElementById("sendButton").onclick = function() {
		console.log(document.getElementById("inputMessage").value);
		w.send(document.getElementById("inputMessage").value);
	}
}
