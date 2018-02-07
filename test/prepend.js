var assert = require('assert');
var requireDir = require('..');

assert.deepEqual(requireDir('./prepend', {
	prepend: 'prepend'
}), {
	a: 'a',
	b: 'b',
    prependa: 'a',
    prependb: 'b',
});

assert.deepEqual(requireDir('./prepend', {
	prepend: 'prepend',
	cleanup: true
}), {
    prependa: 'a',
    prependb: 'b',
});

assert.deepEqual(requireDir('./prepend', {
	prepend: 'prepend-',
	transform: 'camelcase',
	cleanup: true
}), {
	prependA: 'a',
	prependB: 'b'
});

assert.deepEqual(requireDir('./prepend', {
	prepend: 'prepend-',
	transform: ['camelcase', 'ucfirst'],
}), {
	a: 'a',
	b: 'b',
	'prepend-a': 'a',
	'prepend-b': 'b',
	A: 'a',
	B: 'b',
	PrependA: 'a',
	PrependB: 'b'
});

console.log('Prepend tests passed.');
