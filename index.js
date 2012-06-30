// requireDir.js
// See README.md for details.

var FS = require('fs');
var Path = require('path');

// make a note of the calling file's path, so that we can resolve relative
// paths. this only works if a fresh version of this module is run on every
// require(), so important: we clear the require() cache each time!
var parent = module.parent;
var parentFile = parent.filename;
var parentDir = Path.dirname(parentFile);
delete require.cache[__filename];

module.exports = function requireDir(dir, opts) {
    // default arguments:
    dir = dir || '.';
    opts = opts || {};

    // resolve the path to an absolute one:
    dir = Path.resolve(parentDir, dir);

    // read the directory's files:
    // note that this'll throw an error if the path isn't a directory.
    var files = FS.readdirSync(dir);

    // go through them and require() the ones that can be, and create and
    // return a map from basename to returned contents!
    var map = {};

    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var ext = Path.extname(file);
        var base = Path.basename(file, ext);

        if (ext in require.extensions) {
            map[base] = require(Path.resolve(dir, file));
        }
    }

    return map;
};
