var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://125.209.194.165:27017/realweather';
var formidable = require('formidable');
var fs = require('fs');

router.get('/', function(req, res, next) {
	mongoClient.connect(url, function(err, db) {
		if(err) res.status(500).send('db connect error');

		var query = {'city':req.query.city, 'country':req.query.country, 'village':req.query.village};

		// limit()
		db.collection('weather').find(query).toArray(function(err, data) {
			if(err) res.status(500).send('db error');

			res.send(data);
			db.close();
		});
	});
});

router.post('/', function(req, res) {

	var form = new formidable.IncomingForm();
	
	var body = {};
	var savePath = './public/photo/';

	form.on('field', function(name, value) {
		body[name] = value;
	});

	form.on('fileBegin', function(name, file) {
		file.path = savePath + body.fileName;
		res.status(200).send();
	});

	form.parse(req);
});

module.exports = router;