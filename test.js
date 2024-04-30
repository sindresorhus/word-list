import fs from 'node:fs';
import test from 'ava';
import wordList from './index.js';

const badWords = [
	'bumfuck',
	'bumfucks',
	'ass',
];

const goodWords = [
	'accumulator',
	'advertisement',
	'album',
	'assassination',
	'cryptanalyst',
	'anticipation',
	'antisexual',
	'antiterrorism',
	'bumps',
	'button',
	'chores',
	'cockiness',
	'damnable',
	'japan',
	'illustrator',
	'shell',
	'pronoun',
	'scrap',
	'aerospace',
	'backspace',
];

test('main', t => {
	t.true(wordList.length > 0);
	t.true(fs.statSync(wordList).size > 1000);
});

test('bad words', t => {
	const wordListText = fs.readFileSync(wordList, 'utf8');
	const words = wordListText.split('\n');

	for (const badWord of badWords) {
		// eslint-disable-next-line ava/assertion-arguments
		t.false(words.includes(badWord), badWord);
	}

	for (const goodWord of goodWords) {
		// eslint-disable-next-line ava/assertion-arguments
		t.true(words.includes(goodWord), goodWord);
	}
});
