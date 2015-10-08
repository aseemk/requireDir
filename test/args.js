var assert = require('assert');
var requireDir = require('..');

var foo = 'foo';
var bar = 'bar';
var dummy = {a: foo, b: bar};

// validate that a given argument is passed to all loaded modules as is
assert.deepEqual(requireDir('./args', {args: foo}), {a: foo, b: foo});
assert.deepEqual(requireDir('./args', {args: [foo,bar]}), {a: [foo,bar], b: [foo,bar]});
assert.deepEqual(requireDir('./args', {args: dummy}), { a: dummy, b: dummy });

console.log('Args tests passed.');
