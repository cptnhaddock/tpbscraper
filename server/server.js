var express = require('express'),
    tpbscraper = require('./tpbscraper'),
    Q = require('q'),
    app = express();

app.use(express.static('app'));

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/torrents', function(req, res) {
    tpbscraper.getTorrents().then(function (result){
        res.json(result);
    });
});

var server = app.listen(3000, 'localhost', function() {
	console.log('Listening on address %s on port %d', server.address().address, server.address().port);
});

module.exports = app;