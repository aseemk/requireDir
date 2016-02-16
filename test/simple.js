var assert = require('assert');
var requireDir = require('..');
var FS = require('fs');

// first test regularly:
assert.deepEqual(requireDir('./simple'), {
    a: 'a',
    b: 'b',
});

// now register CoffeeScript and do it again:
// note that CoffeeScript shouldn't be used by any other tests! we can't rely
// on ordering of tests, and require.extensions and require.cache are global.
require('coffee-script');
assert.deepEqual(requireDir('./simple'), {
    a: 'a',
    b: 'b',
    c: 'c',
});

var extensions = {
    '.txt': function (filename) {
        return FS.readFileSync(filename, 'utf8');
    }
};

assert.deepEqual(requireDir('./simple', { extensions: extensions }), {
    a: 'a',
    b: 'b',
    c: 'c',
    d: 'd\n'
});

requireDir.defaultExtensions(extensions);

assert.deepEqual(requireDir('./simple'), {
    a: 'a',
    b: 'b',
    c: 'c',
    d: 'd\n'
});

console.log('Simple tests passed.');
