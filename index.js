/* global require, module */
'use strict';

let fs = require('fs');
let typescript = require('typescript');

module.exports = {
    run: run
};

function run(indexPath, _this, _arguments) {
    let fileContentsCache = {};
    let tsSources = getReferencesAndSelf(indexPath, fileContentsCache);

    let tsCode = tsSources
        .map(filePath => fileContentsCache[filePath])
        .join('\n');

    let jsCode = typescript.transpile(tsCode);
    let jsWrapped = eval(`(function (exports, require, module, __filename, __dirname) {${jsCode}})`);
    jsWrapped.apply(_this, _arguments);
}

function getReferencesAndSelf(filePath, fileContentsCache) {
    let references = [filePath];

    let folder = filePath.substring(0, filePath.lastIndexOf('/'));

    let fileContents = fs.readFileSync(filePath).toString();
    fileContentsCache[filePath] = fileContents;

    let referenceMatch;
    let referenceRegex = /\/\/\/ <reference path="([a-z-/]+(?:.d)?.ts)" \/>/g;
    while (!!(referenceMatch = referenceRegex.exec(fileContents))) {
        let reference = referenceMatch[1];
        let childReferences = getReferencesAndSelf(`${folder}/${reference}`, fileContentsCache);
        references = childReferences.concat(references);
    }

    return references.filter((value, index, self) => self.indexOf(value) === index);
}
