# NPM License Concatenator

Useful for creating a library license file for redistributable packages. 

This package is based off [davglass/license-checker](https://github.com/davglass/license-checker).

## Usage

```bash
npm install -g concat-licenses
cd /path/to/work/dir
concat-licenses --out=./LICENSE.lib.txt
```

## Options
* --production only show production dependencies.
* --development only show development dependencies.
* --unknown report guessed licenses as unknown licenses.
* --onlyunknown only list packages with unknown or guessed licenses.
* --search [filepath] look in the following npm project directory.
* --out [filepath] write the data to a specific file.
* --exclude [list] exclude modules which licenses are in the comma-separated list from the output.
* --includeCurrent include the license for the current module in concatenated file.
* --version The current version.
* --help  The text you are reading right now :).

## Module Use

The package can be required for use in another node module. One function is 
exposed for use.

```javascript
const concatLicenses = require('concat-licenses').concat;

concatLicenses(
    {
        production: false,
        development: false,
        search: process.cwd(),
        out: null,
        unknown: false,
        onlyunknown: false,
        includeCurrent: false,
        exclude: null,
        title: 'LICENSES FOR SOFTWARE PACKAGES'
    }, // Options object defaults
    callback(err, output)
);
```

The output will be the formatted text string that is usually written to a file.