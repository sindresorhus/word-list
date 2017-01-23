'use strict';
const fs = require('fs');
const got = require('got');

const url = 'https://raw.github.com/atebits/Words/master/Words/en.txt';

got(url).then(res => {
	fs.writeFileSync('words.txt', res.body.trim());
}).catch(err => {
	console.error(err);
	process.exit(1); // eslint-disable-line unicorn/no-process-exit
});
