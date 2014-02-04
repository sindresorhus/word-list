'use strict';
var fs = require('fs');
var request = require('request');
var url = 'https://raw.github.com/atebits/Words/master/Words/en.txt';

request(url, function (err, res, body) {
	if (err || res.statusCode !== 200) {
		throw new Error(error || response.statusCode);
	}

	fs.writeFileSync('words.txt', body.trim());
});
