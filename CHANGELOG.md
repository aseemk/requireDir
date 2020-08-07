# Damon Music Changelog

## Versioning Policy

Following:
**major.minor.patch**

* **major** is almost never used unless a complete rewrite happened of Damon Music
* **minor** used whenever a single file was rewritten or significant change happened
* **patch** may only be bumped after a bug was resolved as whole

Following (beta):
**0.major.minor/patch**

Major versions starting with a **0** will have **minor** interpreted as major's and a bump of this number will be seen as a total rewrite

## 2020-08-07, Version 0.1.1 ()

### Changes

 * Removed test directory from `require-dir` module
 * Updated Changelog and readme

### Commits

 *

## 2020-08-07, Version v0.1.0 ()

### Changes

 * Ported `requireDir` to an esModule equivalent.
 * Readme has been modified with the details for this module.
 * Added `noCache` support
 * Added `recurse` support
 * Removed `filter` option (open a PR to add this feature or make an issue to propose it)
 * Removed `mapKey` option (open a PR to add this feature or make an issue to propose it)
 * Removed `mapValue` option (open a PR to add this feature or make an issue to propose it)
 * Removed `duplicates` option (might come back when `.json` support is added to esModules)
 * Removed `extensions` option (might come back when `.json` support is added to esModules)

### Commits

 * 6d18e76c2efa6add0dae7db441737e978b976b30 Readme: Update with new info
 * 201f2e28904a77b7995dadfa383a7f5b92cd1c32 ImportDir: Updated main file
 * 52c601b63d8339af6ddf1fb0ceb489c6c601b7ea Package: Modified details of require-dir to become import-dir
 * a8974db00e62a379be51622ec232618be8ee28c6 Package: Changed scope of package name
