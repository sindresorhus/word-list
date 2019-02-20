import fs from 'fs';
import test from 'ava';
import wordList from '.';

test('main', t => {
	t.true(wordList.length > 0);
	t.true(fs.statSync(wordList).size > 1000);
});
