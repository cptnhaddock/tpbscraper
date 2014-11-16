var request = require('request'),
    _ = require('lodash'),
    cheerio = require('cheerio')
    Q = require('q');
 
// 100: Audio
// 200: Video
// 300: Applications
// 400: Games
// 600: Other
var categories = [100, 200, 300, 400, 500, 600];
var deferred;
 
var createUrl = function (categoryCode) {
  return 'http://thepiratebay.se/top/' + categoryCode;
};
 
var extractMagnetURIs = function (body) {
  var parsed = body.match(/\"magnet:\?\S+\"/g),
      attr;
  return _.map(parsed, function (magnetURI) {
    attr = magnetURI.split('');
    attr.pop(); // remove first "
    attr.shift(); // remove last "
    return attr.join('');
  });
};

function extractTorrentNames(body) {
  var result = [];
  var $ = cheerio.load(body);
  var detLinks = $('a.detLink');
  detLinks.each(function (){
    result.push(this.children[0].data);
  });
  
  return result;
}
 
var onResponse = function (err, resp, body) {
  if (err) {
    deferred.reject();
    return console.log('Error scraping ' + resp);
  }

  deferred.resolve(extractTorrentNames(body));
};

function getTorrents() {
  deferred = Q.defer();

  var url = createUrl(207);
  request(url, onResponse);

  return deferred.promise;
}

var tpbscraper = {
  getTorrents: getTorrents
}

module.exports = tpbscraper;