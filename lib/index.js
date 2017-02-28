/*jshint esversion:6 */

const fs = require('fs');
const checker = require('license-checker');
const path = require('path');

module.exports.concat = function (options, callback) {
    var inputError = null;
    var outputString = null;

    outputString = `${options.title}\n\n`;
    checker.init(options, (err, json) => {
        if (!err) {
            Object.keys(json).forEach((key) => {
                let licenseType = json[key].licenses;
                let licensePath = json[key].licenseFile;
                if (typeof licenseType === 'string' && typeof licensePath === 'string') {
                    outputString += `${key}\n`
                    outputString += `${licenseType}\n`
                    outputString += `${String(fs.readFileSync(licensePath))}\n\n`
                }
            });
        } else {
            inputError = err;
        }
        callback(inputError, outputString);
    });
}