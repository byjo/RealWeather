var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	var data = [
		{datetime: "2015-09-14T22:32:02.075Z", temperature: 29, sky: "B"}, 
		{datetime: "2015-09-14T23:32:02.075Z", temperature: 31, sky: "C"}, 
		{datetime: "2015-09-15T00:32:02.075Z", temperature: 30, sky: "D"}, 
		{datetime: "2015-09-15T01:32:02.075Z", temperature: 28, sky: "E"}, 
		{datetime: "2015-09-15T02:32:02.075Z", temperature: 26, sky: "F"}
	];
	res.send(data);
});

module.exports = router;