# ts-runner
[![Build Status](https://api.travis-ci.org/kevinphelps/ts-runner.svg?branch=master)](https://travis-ci.org/kevinphelps/ts-runner)
[![NPM Version](https://img.shields.io/npm/v/ts-runner.svg)](https://www.npmjs.com/package/ts-runner)
[![Dependency Status](https://david-dm.org/kevinphelps/ts-runner.svg)](https://david-dm.org/kevinphelps/ts-runner)
[![Dev Dependency Status](https://david-dm.org/kevinphelps/ts-runner/dev-status.svg)](https://david-dm.org/kevinphelps/ts-runner#info=devDependencies)

Executes TypeScript, including references, in node by transpiling to JavaScript on the fly.

## Usage

Pass the path to your root TypeScript file along with `this` and `arguments` to `tsRunner.run()`. Local references (`/// <reference path="dependency.ts" />`) will be followed recursively, combined, transpiled, and executed in the scope you provided.

```javascript
'use strict';

let tsRunner = require('ts-runner');
tsRunner.run('./implementation/index.ts', this, arguments);
```

## Versions

### 0.1.1 - 0.1.3
- minor updates - linting, readme (no functional changes)

### 0.1.0
- initial implementation