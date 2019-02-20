'use strict';
const fs = require('fs');
const got = require('got');

const url = 'https://raw.githubusercontent.com/atebits/Words/master/Words/en.txt';

(async () => {
	const {body} = await got(url);
	fs.writeFileSync('words.txt', body.trim());
})().catch(error => {
	console.error(error);
	process.exit(1); // eslint-disable-line unicorn/no-process-exit
});
