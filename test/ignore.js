var assert = require('assert');
var requireDir = require('..');

// Without filter
assert.deepEqual(requireDir('./ignore', {
}), {
    a: 'a',
    b: 'b',
    c: 'c'
});

// With filter
assert.deepEqual(requireDir('./ignore', {
    ignore: ['c']
}), {
    a: 'a',
    b: 'b'
});

console.log('Ignore tests passed.');