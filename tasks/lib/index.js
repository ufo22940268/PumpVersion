'use strict';
var grunt = require('grunt');
var incrementor = require('./incrementor');
var git = require('./git');

module.exports = {

    run: function (packageFile, type) {
        if (!grunt.file.exists(packageFile)) {
            return grunt.fail.fatal('package.json not found');
        }

        var json = grunt.file.readJSON(packageFile);
        var version = json.version;

        var newVersion;
        switch (type) {
            case 'hotfix':
                newVersion = incrementor.hotfix(version);
                break;
            case 'feature':
                newVersion = incrementor.feature(version);
                break;
            default:
                return grunt.fail.fatal('Not valid type');
        }

        if (!newVersion) {
            return grunt.fail.fatal('Version format invalid!');
        }

        json.version = newVersion;
        grunt.file.write(packageFile, JSON.stringify(json));

        git.commit(version, function (result) {
            if (result) {
                grunt.fail.fatal('Git commit failed: ' + result);
            } else {
                grunt.log.ok('Success');
            }
        });
    }
};
