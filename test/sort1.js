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

// first test without sorting:
global.testlist = null;
requireDir('./sort1');
//console.log("unsorted:", global.testlist, getOnlyTheSeqNumbers());
assert.equal(getOnlyTheSeqNumbers().length, 8, "The modules may be loaded in any order but must *all* be loaded anyway");

// console.log('Sort tests passed.');
