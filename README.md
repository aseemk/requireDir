# importDir()

This is an esModule implementation of the following module: https://github.com/aseemk/requireDir

I've tried to port as many of its features that seem useful or usable with esModules.

Currently only `.js` files are supported as `.json` files are only available with experimental flags.

With esModule an async module loader is used and to allow flexibility you need to await the each key of the object when you want to use it.

## Restrictions

Currently esModules are not aware of the parent module they've been imported from. This means that an absolute path needs to be passed.
If you try to pass a relative path, this will return an error.


I can add support for relative paths later on but currently this can only be achieved with experimental launch flags, if an issue is opened on GitHub, I'll take a look at adding it.

#### Proposed solution

You can use resolve to get the absolute path of a relative path.

```js
import { resolve } from 'path'
import importDir from '@yimura/import-dir'

const import = importDir(resolve('./dir/'));
```

## Example

Given this directory structure:

```
dir
+ a.js
+ b.json
+ c.coffee
+ d.txt
+ e.js
```

`importDir(resolve('./dir'))` will return the equivalent of:

```js
{
  a: Promise<import('./dir/a.js')>,
  e: Promise<import('./dir/e.js')>
}
```

## Installation

```
npm install @yimura/import-dir
```

## Usage

Basic usage that examines only directories' immediate files:

```js
import { resolve } from 'path'
import importDir from '@yimura/import-dir'

let dir = importDir(resolve('./path/to/dir'));
```

You can optionally customize the behavior by passing an extra options object:

```js
let dir = importDir('/path/to/dir', { recurse: true });
```

## Options

`recurse`: Whether to recursively `import()` subdirectories too.
(`node_modules` within subdirectories will be ignored.)
Default is false.

`noCache`: Prevent file caching. Could be useful using gulp.watch or other watch requiring refreshed file content Default is false.

```js
let dir = importDir('/path/to/dir', { noCache: true });
```
