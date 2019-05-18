'use strict';
const fs = require('fs');
const got = require('got');

const url = 'https://raw.githubusercontent.com/atebits/Words/master/Words/en.txt';

const badWords = require('badwords-list').array;
const leoProfanity = require('leo-profanity');

leoProfanity.loadDictionary('en');

const badWordsSet = new Set(badWords);
const badWordsExclusions = new Set([
	'ass',
	'asses',
	'anal',
	'cum',
	'tit',
	'bum',
	'hore',
	'sex',
	'cipa',
	'butt',
	'cock',
	'homo',
	'eros',
	'cox',
	'semen',
	'damn',
	'jap',
	'lust',
	'hell',
	'pron',
	'crap'
]);
const badWordsWithExclusions = badWords.filter(word => !badWordsExclusions.has(word));

const filters = [
	{
		name: 'leo-profanity',
		fn: word => !leoProfanity.check(word)
	},
	{
		name: 'badwords-list exact',
		fn: word => !badWordsSet.has(word)
	},
	{
		name: 'badwords-list with exclusions substring',
		fn: word => {
			for (const badWord of badWordsWithExclusions) {
				if (word.indexOf(badWord) !== -1) {
					return false;
				}
			}

			return true;
		}
	}
];

(async () => {
	const {body} = await got(url);
	let words = body.trim().split('\n');

	const originalLength = words.length;

	for (const filter of filters) {
		const previousLength = words.length;
		words = words.filter(filter.fn);
		console.log(`filtered ${previousLength - words.length} bad words with filter '${filter.name}'`);
	}

	console.log(`filtered ${originalLength - words.length} bad words total`);

	fs.writeFileSync('words.txt', words.join('\n'));
})().catch(error => {
	console.error(error);
	process.exit(1); // eslint-disable-line unicorn/no-process-exit
});
