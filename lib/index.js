const fs = require('fs');
const chalk = require('chalk');
const checker = require('license-checker');
const path = require('path');

module.exports.concat = (options, callback) => {
    var inputError = null;
    var outputString = null;

    outputString = `${options.title}\n\n`;
    checker.init(options, (err, json) => {
        if (!err) {
            if (!options.includeCurrent) {
                let package = JSON.parse(
                    fs.readFileSync(path.join(options.start, 'package.json'))
                );
                let packageKey = `${package.name}@${package.version}`;
                json[packageKey] = null;
                delete json[packageKey];
            }

            Object.keys(json).forEach((key) => {
                let licenseType = json[key].licenses;
                let licensePath = json[key].licenseFile;
                if (typeof licenseType === 'string' && typeof licensePath === 'string') {
                    outputString += `${key}\n`;
                    outputString += `${licenseType}\n`;
                    outputString += `${String(fs.readFileSync(licensePath))}\n\n`;
                } else if (options.warnIfMissing) {
                    console.warn(chalk.yellow.bold(`WARNING: ${key} does not provide a license file.`));
                }
            });
        } else {
            inputError = err;
        }
        callback(inputError, outputString);
    });
};