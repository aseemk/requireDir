var assert = require('assert');
var requireDir = require('..');

assert.deepEqual(requireDir('./camelcase', {
    recurse: true,
    camelcase: true
}), {
    aMain: 'a main',
    subDir: {
        aSub: 'a sub'
    }
});

console.log('Camelcase tests passed.');
