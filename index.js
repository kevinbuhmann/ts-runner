/* global require, module */
'use strict';

let fs = require('fs');
let tsc = require('typescript-compiler');

module.exports = {
    run: run
};

function run(indexPath, _this, _arguments, options, tempFilename) {
    options = options || '';
    tempFilename = tempFilename || './__temp.js';

    // compile and cleanup
    let result = tsc.compile(indexPath, `-t ES6 --out ${tempFilename} ${options}`.trim());
    fs.unlinkSync(tempFilename);

    // log errors
    if (result.errors.length) {
        result.errors.forEach(error => console.error(error));
    }

    // execute code
    let jsCode = result.sources[tempFilename];
    let jsWrapped = eval(`(function (exports, require, module, __filename, __dirname) {${jsCode}})`);
    jsWrapped.apply(_this, _arguments);
}
