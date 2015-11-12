var assert = require('assert');
var requireDir = require('..');

assert.deepEqual(requireDir('./directoryAsModule'), {
    a: 'a',
    b: 'b'
});

assert.deepEqual(requireDir('./directoryAsModule', {recurse: true}), {
    a: 'a',
    b: {
        "index":"b",
        "anotherfile": "b"
    },
    c: {}
});

console.log('Directory as module tests passed')
