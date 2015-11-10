var assert = require('assert');
var requireDir = require('..');

assert.deepEqual(requireDir('./directoryAsModule'), {
    a: 'a', b: 'b'
});

console.log('Automatic Index tests passed')
