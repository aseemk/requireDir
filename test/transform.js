var assert = require('assert');
var requireDir = require('..');

assert.deepEqual(requireDir('./transform', {
    recurse: true,
    transform: ['camelcase']
}), {
    aMain: 'a main',
    'a_main': 'a main',
    subDir: {
        aSub: 'a sub',
        'a-sub': 'a sub'
    },
    'sub-dir': {
        aSub: 'a sub',
        'a-sub': 'a sub'
    }
});


assert.deepEqual(requireDir('./transform', {
    recurse: true,
    transform: ['ucfirst']
}), {
    a_main: 'a main',
    'sub-dir': {
        'a-sub': 'a sub',
        'A-sub': 'a sub'
    },
    A_main: 'a main',
    'Sub-dir': {
        'a-sub': 'a sub',
        'A-sub': 'a sub'
    }
});

assert.deepEqual(requireDir('./transform', {
    recurse: true,
    transform: ['ucfirst', 'camelcase']
}), {
    a_main: 'a main',
    'sub-dir': {
        'a-sub': 'a sub',
        ASub: 'a sub'
    },
    AMain: 'a main',
    SubDir: {
        'a-sub': 'a sub',
        ASub: 'a sub'
    }
});


console.log('Transform tests passed.');
