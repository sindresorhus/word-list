# word-list [![Build Status](https://travis-ci.org/sindresorhus/word-list.svg?branch=master)](https://travis-ci.org/sindresorhus/word-list)

> List of [English words](https://github.com/atebits/Words/blob/master/Words/en.txt)

Useful if you're creating a word game or just want some words to work with.

Used by [word-stream](https://github.com/sindresorhus/word-stream) and [random-word](https://github.com/sindresorhus/random-word).


## Install

```
$ npm install --save word-list
```


## Usage

```js
var fs = require('fs');

// returns the path to the word list which is separated by `\n`
var wordListPath = require('word-list');

var wordArray = fs.readFileSync(wordListPath, 'utf8').split('\n');
//=> [..., 'abmhos', 'abnegate', ...]
```


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
