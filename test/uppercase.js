var assert = require('assert');
var requireDir = require('..');

assert.deepEqual(requireDir('./uppercase', {
    recurse: true,
    uppercase: true
}), {
    AMain: 'a main',
    'a_main': 'a main',
    Main: 'main',
    'main': 'main',
    SubDir: {
        ASub: 'a sub',
        'a-sub': 'a sub'
    },
    'sub-dir': {
        ASub: 'a sub',
        'a-sub': 'a sub'
    }
});

console.log('Uppercase tests passed.');
