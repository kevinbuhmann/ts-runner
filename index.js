/* global require, module */
'use strict';

let fs = require('fs');
let path = require('path');
let childProcess = require('child_process');

module.exports = {
    run: run
};

function run(sourcePath, _this, _arguments, options, tempFilename) {
    options = options || '';
    tempFilename = tempFilename || './__temp.js';

    if (!fs.existsSync(sourcePath)) {
        let absolutePath = path.join(_arguments[4], sourcePath);
        if (fs.existsSync(absolutePath)) {
            sourcePath = absolutePath;
        }
    }

    let tscPath = path.join('node_modules', '.bin', 'tsc');
    try {
        childProcess.execSync(`${tscPath} ${sourcePath} --out ${tempFilename} ${options}`);
    } catch (e) {
        let output = e.output.toString();
        console.error(output.substring(1, output.length - 1));
        throw new Error('tsc compile failed');
    }

    let jsCode = fs.readFileSync(tempFilename);
    fs.unlinkSync(tempFilename);

    let jsWrapped = eval(`(function (exports, require, module, __filename, __dirname) {${jsCode}})`);
    jsWrapped.apply(_this, _arguments);
}