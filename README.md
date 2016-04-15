# ts-runner
[![Build Status](https://api.travis-ci.org/kevinphelps/ts-runner.svg?branch=master)](https://travis-ci.org/kevinphelps/ts-runner)
[![NPM Version](https://img.shields.io/npm/v/ts-runner.svg)](https://www.npmjs.com/package/ts-runner)
[![Dependency Status](https://david-dm.org/kevinphelps/ts-runner.svg)](https://david-dm.org/kevinphelps/ts-runner)
[![Dev Dependency Status](https://david-dm.org/kevinphelps/ts-runner/dev-status.svg)](https://david-dm.org/kevinphelps/ts-runner#info=devDependencies)

Executes TypeScript, including references, in node by transpiling to JavaScript on the fly.

## API

`tsRunner.run(indexPath, _this, _arguments, options, tempFilename)`:
Compiles TypesScript code and executes in the given node context (supplied by `_this` and `_arguments`). Any errors will be passed to `console.error`.

-  `indexPath` (string, required): The path of the TypeScript file to compile. Teferences will be followed.
-  `_this` (object, required): Object to use as `thisArg` when executing the compiled JavaScript.
-  `_arguments` (array, required): The node arguments (exports, require, module, __filename, __dirname) to use when executing the compiled JavaScript.
-  `options` (string, optional): Options to pass to `tsc`, for example, '--noImplicitAny'. The default is an empty string.
-  `tempFilename` (string, optional): The path to a temporary file to pass to `tcs`. The default is './__temp.js'. This file is deleted immediately after compilitation completes.

## Usage

```javascript
'use strict';

let tsRunner = require('ts-runner');
tsRunner.run('./implementation/index.ts', this, arguments, '--noImplicitAny');
```

## Versions

### 0.2.0
- update to use `tsc` full compile

### 0.1.1 - 0.1.3
- minor updates - linting, readme (no functional changes)

### 0.1.0
- initial implementation