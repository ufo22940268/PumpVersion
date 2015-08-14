'use strict';
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: require('./package.json'),
        hotfix: {
            hotfix: {}
        }
    });
    grunt.loadNpmTasks('grunt-pump-version');
    grunt.registerTask('default', ['hotfix']);
};
