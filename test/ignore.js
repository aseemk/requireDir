var assert = require('assert');
var requireDir = require('..');

// string ignore pattern without recursing:
assert.deepEqual(requireDir('./ignore',{
    ignore:".exp.js"
}), {
    a: 'a',
    'b.sfx':'b-sfx'
});

// string ignore pattern with recursing:
assert.deepEqual(requireDir('./ignore', {
    recurse: true,
    ignore:".exp.js"
}), {
    a: 'a',
    'b.sfx':'b-sfx',
    b: {
        '1': {
            foo: 'foo',
            bar: 'bar',
            'b.sfx':'b-sfx'
        },
        '2': {}     // note how the directory is always returned
    },
    c: {
        '3': 3
    }
    // note that node_modules was explicitly ignored
});

// array of ignore patterns without recursing:
assert.deepEqual(requireDir('./ignore',{
    ignore:[
        ".exp.js",
        ".sfx.js"
    ]
}), {
   a: 'a'
});

// array of ignore patterns with recursing:
assert.deepEqual(requireDir('./ignore', {
    recurse: true,
    ignore:[
        ".exp.js",
        ".sfx.js"
    ]
}), {
    a: 'a',
    b: {
        '1': {
            foo: 'foo',
            bar: 'bar'
        },
        '2': {}     // note how the directory is always returned
    },
    c: {
        '3': 3
    }
    // note that node_modules was explicitly ignored
});

console.log('Ignore tests passed.');
