'use strict';
const fs = require('fs');
const got = require('got');

const isVerbose = process.argv.includes('--verbose');

const {array: badWords} = require('badwords-list');
const leoProfanity = require('leo-profanity');

leoProfanity.loadDictionary('en');

const badWordsSet = new Set(badWords);

const ourBadWordsSet = new Set([
	'bumfuck',
	'bumfucks',
	'tittie'
]);

const url = 'https://raw.githubusercontent.com/atebits/Words/master/Words/en.txt';

const filters = [
	{
		name: 'leo-profanity',
		getReason: word => leoProfanity.check(word) ? 'is marked bad by leo-profanity' : undefined
	},
	{
		name: 'badwords-list exact',
		getReason: word => badWordsSet.has(word) ? 'is in badwords-list' : undefined
	},
	{
		name: 'our bad words list',
		getReason: word => ourBadWordsSet.has(word) ? 'is in our bad words list' : undefined
	}
];

(async () => {
	const {body} = await got(url);
	let words = body.trim().split('\n');

	const originalLength = words.length;

	for (const filter of filters) {
		const previousLength = words.length;

		words = words.filter(word => {
			const reason = filter.getReason(word);

			if (reason !== undefined && isVerbose) {
				console.log(`word \`${word}\` excluded because it ${reason}`);
			}

			return reason === undefined;
		});

		console.log(`filtered ${previousLength - words.length} bad words with filter '${filter.name}'`);
	}

	console.log(`filtered ${originalLength - words.length} bad words total out of ${originalLength} original words`);

	fs.writeFileSync('words.txt', words.join('\n'));
})().catch(error => {
	console.error(error);
	process.exit(1); // eslint-disable-line unicorn/no-process-exit
});
