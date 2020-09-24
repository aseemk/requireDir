if (typeof require === 'function') {
    throw new Error('ImportDir can only be imported as an ES Module');
}

import fs from 'fs'
import path from 'path'

const importDir = (directory = '.', options = {}) => {
    if (directory.startsWith('.')) {
        throw new Error('Relative paths are not supported, please resolve your relative path to an absolute path.');

        return null;
    }

    const
        files = fs.readdirSync(directory),
        filesBase = {};

    for (const file of files) {
        const
            ext = path.extname(file),
            base = path.basename(file, ext);

        (filesBase[base] = filesBase[base] || []).push(file);
    }

    const
        map = {},
        extensions = options.extensions || ['.js'];

    for (const base in filesBase) {
        if (!filesBase.hasOwnProperty(base)) {
            continue;
        }

        const
            files = filesBase[base],
            filesMinusDirs = {};

        for (const file of files) {
            const abs = path.resolve(directory, file);

            if (fs.statSync(abs).isDirectory()) {
                if (options.recurse && base != 'node_modules') {
                    if (options.recurseDepth) {
                        options.currentDepth = options.currentDepth ? options.currentDepth : 0;

                        if (options.recurseDepth > options.currentDepth) {
                            const currentDepth = options.currentDepth ? options.currentDepth+1 : 1;

                            map[base] = importDir(abs, Object.assign(options, { currentDepth }));
                        }
                    }
                    else map[base] = importDir(abs, options);
                }
            }
            else {
                filesMinusDirs[file] = abs;
            }
        }

        if (map[base]) {
            continue;
        }

        for (const ext of extensions) {
            const
                file = base + ext,
                abs = filesMinusDirs[file];

            if (abs) {
                if (options.noCache) {
                    map[base] = import(`file://${abs}?r=${Date.now()}`);

                    break;
                }

                map[base] = import(`file://${abs}`);
                break;
            }
        }
    }

    return map;
};

export default importDir;
