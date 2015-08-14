'use strict';

var grunt = require('grunt');
var lib = require('../tasks/lib');

var FILE_PATH =  'tmp/package.json';

exports.PumpVersion = {

    setUp: function (done) {
        var content = '{\n   "version": "0.1.0"\n}';
        grunt.file.write(FILE_PATH, content);
        done();
    },

    addHotfix: function (test) {
        lib.run(FILE_PATH, 'hotfix');
        var actual = grunt.file.readJSON(FILE_PATH)['version'];
        test.equal(actual, "0.1.1", 'Should increment version number');
        test.done();
    },

    addFeature: function (test) {
        lib.run(FILE_PATH, 'feature');
        var read = grunt.file.read(FILE_PATH);
        test.ok(read.split('\n').length > 1, 'Should not change file format');
        var actual = grunt.file.readJSON(FILE_PATH)['version'];
        test.equal(actual, "0.2.0", 'Should increment version number');
        test.done();
    }
};
