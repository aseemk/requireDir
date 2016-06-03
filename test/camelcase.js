var assert = require('assert');
var requireDir = require('..');

assert.deepEqual(requireDir('./camelcase', {
    recurse: true,
    camelcase: true,
    removeCase: true
}), {
    aMain: 'a main',
    subDir: {
        aSub: 'a sub'
    }
});

assert.deepEqual(requireDir('./camelcase', {
    recurse: true,
    camelcase: true,
	//removeCase: true
}), {
    a_main: 'a main',
    aMain: 'a main',
    'sub-dir': {
        'a-sub': 'a sub',
        aSub: 'a sub',
    },
    subDir: {
        'a-sub': 'a sub',
        aSub: 'a sub',
    },
});

console.log('Camelcase tests passed.');
