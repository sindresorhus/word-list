/**
List of [English words](https://github.com/atebits/Words/blob/master/Words/en.txt).

@example
```
import * as fs from 'fs';

// Returns the path to the word list which is separated by `\n`
import wordListPath = require('word-list');

const wordArray = fs.readFileSync(wordListPath, 'utf8').split('\n');
//=> […, 'abmhos', 'abnegate', …]
```
*/
declare const wordsListPath: string;

export = wordsListPath;
