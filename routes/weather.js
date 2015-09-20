var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://125.209.194.165:27017/realweather';

router.get('/', function(req, res, next) {
	mongoClient.connect(url, function(err, db) {
		if(err) res.status(500).send('db connect error');

		var query = {'city':req.query.city, 'country':req.query.country, 'village':req.query.village};

		// limit()
		db.collection('weather').find(query).limit(10).toArray(function(err, data) {
			if(err) res.status(500).send('db error');

			res.send(data);
			db.close();
		});
	});
});

module.exports = router;