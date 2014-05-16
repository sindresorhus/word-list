'use strict';
var fs = require('fs');
var got = require('got');
var url = 'https://raw.github.com/atebits/Words/master/Words/en.txt';

got(url, function (err, res) {
	if (err) {
		throw new Error(err);
	}

	fs.writeFileSync('words.txt', res.trim());
});
