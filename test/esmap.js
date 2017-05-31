var assert = require('assert');
var requireDir = require('..');

// first test regularly:
assert.deepEqual(
	requireDir('./simple', {esMap: true}),
	new Map([ ['a', 'a'], ['b', 'b'] ])
);

console.log('ES2015 Map tests passed.');
