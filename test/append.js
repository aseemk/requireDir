var assert = require('assert');
var requireDir = require('..');

assert.deepEqual(requireDir('./append', {
	append: 'Appended'
}), {
	a: 'a',
	b: 'b',
    aAppended: 'a',
    bAppended: 'b',
});

console.log('Append tests passed.');
