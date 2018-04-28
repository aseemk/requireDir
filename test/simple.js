var assert = require('assert');
var requireDir = require('..');

// should try for directories in case they have index file,
// but should not fail if the do not
assert.doesNotThrow(function () {
    requireDir('./simple');
});

// first test regularly:
assert.deepEqual(requireDir('./simple'), {
    a: 'a',
    b: 'b',
    g: 'g',
});

// now register CoffeeScript and do it again:
// note that CoffeeScript shouldn't be used by any other tests! we can't rely
// on ordering of tests, and require.extensions and require.cache are global.
require('coffee-script/register');
assert.deepEqual(requireDir('./simple'), {
    a: 'a',
    b: 'b',
    c: 'c',
    g: 'g',
});

// now register TypeScript and do it again:
// note that we include typescript files but not declarations.
require('ts-node/register');
assert.deepEqual(requireDir('./simple'), {
    a: 'a',
    b: 'b',
    c: 'c',
    e: 'e',
    g: 'g',
});

console.log('Simple tests passed.');
