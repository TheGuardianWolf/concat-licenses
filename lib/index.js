/*jshint esversion:6 */

const fs = require('fs');
const checker = require('license-checker');
const path = require('path');

let scanDir = process.argv[2];

if (scanDir) {
    scanDir = path.normalize(scanDir);
    let concat = 'LICENSES FOR LIBRARIES\n\n';
    checker.init({
        start: scanDir
    }, (err, json) => {
        if (!err) {
            Object.keys(json).forEach((key) => {
                let licenseType = json[key].licenses;
                let licensePath = json[key].licenseFile;
                if (typeof licenseType === 'string' && typeof licensePath === 'string') {
                    concat += `${key}\n`
                    concat += `${licenseType}\n`
                    concat += `${String(fs.readFileSync(licensePath))}\n\n`
                }
            });
            fs.writeFileSync(path.join(scanDir, 'LICENSE.lib.txt'), concat);
        } else {
            throw err;
        }
    });
}