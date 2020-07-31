# NPM License Concatenator

Looking to make an electron app and can't be bothered with putting together licenses?

This package searches for licenses in node project dependencies and creates a library
license file that can be used for redistributable packages.

This package is based off [davglass/license-checker](https://github.com/davglass/license-checker)
and uses its functionalities for finding licenses.

With the detection of licenses, it follows `davglass/license-checker`, with the
exception that guesses are enabled for explicitly named `LICENSE` files only.
Any other license guesses such as from `README` are not allowed and will produce
a warning. A warning is also given if the file is missing or inaccessable.

## Usage

```bash
npm install -g concat-licenses
cd /path/to/work/dir
concat-licenses LICENSE.lib.txt
```

OR

```bash
cd /path/to/work/dir
npx concat-licenses LICENSE.lib.txt
```

## Options

```
concat-licenses@2.0.0
Usage: concat-licenses /path/to/output [options]

Options:
  --version                 Displays version information               [boolean]
  --help                    Show help                                  [boolean]
  --ignoreMissing           Ignore packages that are missing licenses (supresses
                            warnings)                                  [boolean]
  --allowGuess              Allow guessed licenses from README and COPYING files
                            (otherwise warns)
  --includeCurrent          Include the license of the main package in the
                            concatenated licence
  --title                   Title to include on the output file.
                           [string] [[default: "LICENSES FOR SOFTWARE PACKAGES"]
  --start                   Set package directory to start from
                                               [string] [default: process.cwd()]
  --production              Only include production dependencies       [boolean]
  --development             Only include development dependencies      [boolean]
  --packages                Only include licenses from semicolon-seperated list
                            of packages                                 [string]
  --excludePackages         Exclude licenses from semicolon-seperated list of
                            packages                                    [string]
  --excludePrivatePackages  Exclude licenses from any package marked as private
                                                                        [string]
  --direct                  Include licenses from direct dependencies only
                                                                       [boolean]
```

## Module Use

The package can be required for use in another node module. One async function is
exposed for use. Async functions return a promise, so the `.then()` syntax can also
be used.

```javascript
const concatLicenses = require("concat-licenses").concat;

(async () => {
  const output = await concatLicenses(outputFile, {
    ignoreMissing: false,
    allowGuess: false,
    includeCurrent: false,
    title: "LICENSES FOR SOFTWARE PACKAGES\n\n",
    start: process.cwd(),
    production: false,
    development: false,
    packages: "",
    excludePackages: "",
    excludePrivatePackages: "",
    direct: false,
  });
})();
```

The output will be the formatted text string that is usually written to a file.
