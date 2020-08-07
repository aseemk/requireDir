# importDir()

This is an esModule implementation of the following module: https://github.com/aseemk/requireDir

I've tried to port as many of its features that seem useful or usable with esModules.

Currently only `.js` files are supported as `.json` files are only available with experimental flags.

With esModule an async module loader is used and to allow flexibility you need to await the each key of the object when you want to use it.

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

`import('./dir')` will return the equivalent of:

```js
{
  a: Promise<import('./dir/a.js')>
}
```

## Installation

```
npm install @yimura/import-dir
```

## Usage

Basic usage that examines only directories' immediate files:

```js
import importDir from 'import-dir';

let dir = importDir('./path/to/dir');
```

You can optionally customize the behavior by passing an extra options object:

```js
let dir = importDir('./path/to/dir', { recurse: true });
```

## Options

`recurse`: Whether to recursively `require()` subdirectories too.
(`node_modules` within subdirectories will be ignored.)
Default is false.

`noCache`: Prevent file caching. Could be useful using gulp.watch or other watch requiring refreshed file content Default is false.

```js
let dir = importDir('./path/to/dir', { noCache: true });
```
