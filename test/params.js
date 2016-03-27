var assert = require('assert');
var requireDir = require('..');

assert.deepEqual(requireDir('./params',{params:['just a param']}), {
    a: 'a',
	b: 'just a param',
	c: 'c'
});

console.log('Params tests passed.');