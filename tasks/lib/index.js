'use strict';
var grunt = require('grunt');
var git = require('./git');
var transaction = require('./transaction');

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

        json.version = newVersion;
        grunt.file.write(packageFile, JSON.stringify(json));

        git.commit(version, function (result) {
            if (result) {
                grunt.fail.fatal('Git commit failed: ' + arguments[1].stdout);
                json.version = trans.rollback();
                grunt.file.write(packageFile, JSON.stringify(json));
            } else {
                grunt.log.ok('Success');
            }
        });
    }
};
