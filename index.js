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

    // to prioritize between multiple files with the same basename, we'll
    // first derive all the basenames and create a map from them to files:
    var filesForBase = {};

    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var ext = Path.extname(file);
        var base = Path.basename(file, ext);

        (filesForBase[base] = filesForBase[base] || []).push(file);
    }

    // then we'll go through each basename, and first check if any of the
    // basenames' files are directories, since directories take precedence if
    // we're recursing and can be ignored if we're not. if a basename has no
    // directory, then we'll follow Node's own require() algorithm of going
    // through and trying the require.extension keys in order. in the process,
    // we create and return a map from basename to require()'d contents!
    var map = {};

    for (var base in filesForBase) {
        // protect against enumerable object prototype extensions:
        if (!filesForBase.hasOwnProperty(base)) {
            continue;
        }

        // go through the files for this base and check for directories. we'll
        // also create a hash "set" of the non-dir files so that we can
        // efficiently check for existence in the next step:
        var files = filesForBase[base];
        var filesMinusDirs = {};

        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var path = Path.resolve(dir, file);

            if (FS.statSync(path).isDirectory()) {
                if (opts.recurse) {
                    map[base] = requireDir(path, opts);
                }
            } else {
                filesMinusDirs[file] = path;
            }
        }

        // if we're recursing and already encountered a directory for this
        // basename, we're done for this basename:
        if (map[base]) {
            continue;
        }

        // otherwise, go through and try each require.extension key!
        for (ext in require.extensions) {
            // again protect against enumerable object prototype extensions:
            if (!require.extensions.hasOwnProperty(ext)) {
                continue;
            }

            // if a file exists with this extension, we'll require() it:
            var file = base + ext;
            var path = filesMinusDirs[file];

            if (path) {
                map[base] = require(path);
                break;
            }
        }
    }

    return map;
};
