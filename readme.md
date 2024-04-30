# word-list

> List of [English words](https://github.com/atebits/Words/blob/master/Words/en.txt)

Useful if you're creating a word game or just want some words to work with.

Used by [`word-stream`](https://github.com/sindresorhus/word-stream) and [`random-word`](https://github.com/sindresorhus/random-word).

One-letter words are not included. Many common bad words are also filtered out.

## Install

```sh
npm install word-list
```

## Usage

```js
import fs from 'node:fs';

// Returns the path to the word list which is separated by `\n`.
import wordListPath from 'word-list';

const wordArray = fs.readFileSync(wordListPath, 'utf8').split('\n');
//=> […, 'abmhos', 'abnegate', …]
```
