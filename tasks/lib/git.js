"use strict";

var grunt = require('grunt');

module.exports = {
    commit: function (version, callback) {
        if (grunt.file.exists('.git')) {
            grunt.util.spawn({
                cmd: 'git',
                args: ['commit', '-m', 'Pump version ' + version]
            }, callback);
        } else {
            callback();
        }
    }
};
