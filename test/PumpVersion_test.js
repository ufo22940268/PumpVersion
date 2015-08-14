'use strict';

var grunt = require('grunt');
var lib = require('../tasks/lib')

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

var FILE_PATH =  'tmp/package.json';

exports.PumpVersion = {

    setUp: function (done) {
        var content = '{"version": "0.1.0"}';
        grunt.file.write(FILE_PATH, content);
        done();
    },

    hotfix: function (test) {
        lib.run(FILE_PATH, 'hotfix');
        var actual = grunt.file.readJSON(FILE_PATH)['version'];
        test.equal(actual, "0.1.1", 'Should increment version number');
        test.done();
    },

    feature: function (test) {
        lib.run(FILE_PATH, 'feature');
        var actual = grunt.file.readJSON(FILE_PATH)['version'];
        test.equal(actual, "0.2.0", 'Should increment version number');
        test.done();
    }
};
