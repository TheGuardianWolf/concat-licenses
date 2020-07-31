const checker = require("license-checker");
const path = require("path");
const chalk = require("chalk").default;
const fs = require("fs");

const GUESS_BASENAMES = [/^COPYING$/, /^README$/];

const defaultOptions = {
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
};

const concat = async (options) => {
  if (!options) {
    options = defaultOptions;
  }

  let outputString = "";

  try {
    const json = await new Promise((resolve, reject) => {
      checker.init(options, (err, json) => {
        if (err) {
          reject(err);
        } else {
          resolve(json);
        }
      });
    });

    if (options.title) {
      outputString += `${options.title}\n\n`;
    }

    if (!options.includeCurrent) {
      const package = JSON.parse(
        fs.readFileSync(path.join(path.normalize(options.start), "package.json"), "utf-8")
      );
      const packageKey = `${package.name}@${package.version}`;
      delete json[packageKey];
    }

    Object.keys(json).forEach((package) => {
      const licenseType = json[package].licenses;
      const licensePath = json[package].licenseFile;
      if (typeof licensePath === "string") {
        const licenseFileBasename = path
          .basename(licensePath, path.extname(licensePath))
          .toUpperCase();
        const isGuess = GUESS_BASENAMES.reduce((prev, curr) => {
          if (curr.test(licenseFileBasename)) {
            return prev || true;
          } else {
            return prev || false;
          }
        }, false);

        if (isGuess && !options.allowGuess) {
          if (!options.ignoreMissing) {
            console.warn(
              chalk.yellow.bold("WARNING:") +
                ` License file for ${package} is not an explicit license file (${licensePath}). Detected licence type is ${licenseType}. Use --allowGuess to include.`
            );
          }
        } else {
          try {
            outputString += `${package}\n`;
            outputString += `${licenseType}\n`;
            outputString += `${String(fs.readFileSync(licensePath))}\n\n`;
          } catch (ex) {
            if (!options.ignoreMissing) {
              console.warn(
                chalk.yellow.bold("WARNING:") +
                  ` Could not read license file for ${package} at ${licensePath}. Detected licence type is ${licenseType}.`
              );
            }
          }
        }
      } else {
        if (!options.ignoreMissing) {
          console.warn(
            chalk.yellow.bold("WARNING:") +
              ` License file is missing for ${package}. Detected licence type is ${licenseType}.`
          );
        }
      }
    });
  } catch (ex) {
    console.error(chalk.red.bold("ERROR:") + ` ${ex}`);
    throw ex;
  }

  return outputString;
};

exports.concat = concat;
