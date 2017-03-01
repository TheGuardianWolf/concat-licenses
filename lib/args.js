/*
Adapted for concat-licenses by Jerry Fan.
Modifications licensed under the MIT license.

Copyright (c) 2013, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://yuilibrary.com/license/
*/

var nopt = require('nopt'),
    chalk = require('chalk'),
    path = require('path'),
    known = {
        production: Boolean,
        development: Boolean,
        search: require('path'),
        out: require('path'),
        unknown: Boolean,
        onlyunknown: Boolean,
        exclude: String,
        title: String
    },
    shorts = {
        "v" : ["--version"],
        "h" : ["--help"]
    };

var raw = function (args) {
    return nopt(known, shorts, (args || process.argv));
};

var has = function (a) {
    var cooked = raw().argv.cooked,
    ret = false;

    cooked.forEach(function (o) {
        if ((o === '--' + a) || (o === '--no-' + a)) {
            ret = true;
        }
    });

    return ret;
};

var clean = function(args) {
    var parsed = raw(args);
    delete parsed.argv;
    return parsed;
};

var setDefaults = function(parsed) {
    if (parsed === undefined) {
        parsed = clean();
    }
    if (parsed.json || parsed.markdown || parsed.csv) {
        parsed.color = false;
    }
    parsed.start = parsed.search || process.cwd();
    parsed.title = parsed.title || 'LICENSES FOR SOFTWARE PACKAGES';

    return parsed;
};

var parse = function (args) {
    var parsed = clean(args);
    return setDefaults(parsed);
};

exports.defaults = setDefaults;
exports.has = has;
exports.raw = raw;
exports.parse = parse;
exports.shorts = shorts;
exports.known = known;
