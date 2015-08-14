'use strict';
var grunt = require('grunt');
var git = require('./git');
var transaction = require('./transaction');
var versionUtil = require('./versionUtil')

module.exports = {

    run: function (packageFile, type) {
        if (!grunt.file.exists(packageFile)) {
            return grunt.fail.fatal('package.json not found');
        }

        var json = grunt.file.readJSON(packageFile);
        var version = json.version;

        var trans = transaction.choose(type);

        var newVersion = trans.getNewVersion(version);
        if (!newVersion) {
            return grunt.fail.fatal('Version format invalid!');
        }

        versionUtil.replace(packageFile, newVersion);

        git.commit(version, function (result) {
            if (result) {
                grunt.fail.fatal('Git commit failed: ' + arguments[1].stdout);
                versionUtil.replace(packageFile, trans.rollback());
            } else {
                grunt.log.ok('Success');
            }
        });
    }
};
