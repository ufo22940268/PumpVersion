"use strict";

var grunt = require('grunt');

module.exports = {
    commit: function (version, callback) {
        if (grunt.file.exists('.git') && !process.env.debug) {
            grunt.util.spawn({
                cmd: 'git',
                args: ['commit', '-am', '"Pump version ' + version + '"']
            }, callback);
        } else {
            callback();
        }
    }
};
