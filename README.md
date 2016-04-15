# ts-runner
[![Build Status](https://api.travis-ci.org/kevinphelps/ts-runner.svg?branch=master)](https://travis-ci.org/kevinphelps/ts-runner)

Executes TypeScript, including references, in node by transpiling to JavaScript on the fly.

## Usage

Pass the path to your root TypeScript file along with `this` and `arguments` to `tsRunner.run()`. Local references (`/// <reference path="dependency.ts" />`) will be followed recursively, combined, transpiled, and executed in the scope you provided.

```javascript
'use strict';

let tsRunner = require('ts-runner');
tsRunner.run('./implementation/index.ts', this, arguments);
```

## Versions

### 0.1.2
- readme update (no functional changes)

### 0.1.1
- minor linting fix (no functional changes)

### 0.1.0
- initial implementation
