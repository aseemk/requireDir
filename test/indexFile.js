const assert = require('assert');
const requireDir = require('..');

// first test without indexFile allowed:
assert.deepEqual(requireDir('./indexFile'), {
  a: 'a'
})

// then test with indexFile allowed
assert.deepEqual(requireDir('./indexFile', { indexFile: true }), {
  a: 'a',
  modules: {
    b: 'b',
    c: 'c'
  }
});

console.log('indexFile test passed');
