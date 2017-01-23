import fs from 'fs';
import test from 'ava';
import m from './';

test(t => {
	t.true(m.length > 0);
	t.true(fs.statSync(m).size > 1000);
});
