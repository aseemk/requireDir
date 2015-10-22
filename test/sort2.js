var assert = require('assert');
var requireDir = require('..');

function getOnlyTheSeqNumbers() {
   var rv = [];
   var l = global.testlist;
   for (var i = 0, len = l.length; i < len; i++) {
      rv.push(l[i][0]);
   }
   return rv;
}

// then test WITH sorting:
global.testlist = null;
requireDir('./sort2', { sort: true });
//console.log("sorted:", global.testlist, getOnlyTheSeqNumbers());
assert.equal(getOnlyTheSeqNumbers().length, 8, "The modules must *all* be loaded anyway");
assert.deepEqual(getOnlyTheSeqNumbers(), [0, 1, 2, 3, 4, 5, 6, 7], "When the sort option is TRUE, the modules must be loaded in default filename sort order");

console.log('Sort tests passed.');
