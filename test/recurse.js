var assert = require('assert');
var mkdirp = require('mkdirp');
var path = require('path');
var fs = require('fs');

var requireDir = require('..');

// first test without recursing:
assert.deepEqual(requireDir('./recurse'), {
    a: 'a',
});

// then test with recursing:
var dir = path.join(__dirname, 'recurse', 'node_modules');
try {
    fs.statSync(path.join(dir, 'fake.js'));
} catch (e) {
    mkdirp.sync(dir);
    fs.writeFileSync(path.join(dir, 'fake.js'), 'module.exports = "ignore";');
}

assert.deepEqual(requireDir('./recurse', {recurse: true}), {
    a: 'a',
    b: {
        '1': {
            foo: 'foo',
            bar: 'bar',
        },
        '2': {}     // note how the directory is always returned
    },
    c: {
        '3': 3
    },
});

console.log('Recurse tests passed.');
