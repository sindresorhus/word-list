'use strict';
var fs = require('fs');
var assert = require('assert');
var pathExists = require('path-exists');
var wordList = require('./');

it('should return list of words', function () {
	assert(wordList.length > 0);
	assert(pathExists.sync(wordList));
	assert(fs.statSync(wordList).size > 1000);
});
