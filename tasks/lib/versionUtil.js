/**
 * Created by cc on 8/14/15.
 */
"use strict";

var grunt = require('grunt');

module.exports = {
    addHotfix: function (version) {
        var match = /\d+\.\d+\.(\d+)/.exec(version);
        if (match) {
            return version.replace(/(\d+\.\d+\.)\d+/, "$1" + (parseInt(match[1]) + 1));
        }
    },

    addFeature: function (version) {
        var match = /\d+\.(\d+)\.\d+/.exec(version);
        if (match) {
            return version.replace(/(\d+\.)\d+(\.\d+)/, "$1" + (parseInt(match[1]) + 1) + "$2");
        }
    },

    replace: function (file, version) {
        var content = grunt.file.read(file);
        grunt.file.write(file, content.replace(/("version".*:.*").+(?=")/, "$1" + version));
    }
};