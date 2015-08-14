/**
 * Created by cc on 8/14/15.
 */
"use strict";

module.exports = {
    hotfix: function (version) {
        var match = /\d+\.\d+\.(\d+)/.exec(version);
        if (match) {
            return version.replace(/(\d+\.\d+\.)\d+/, "$1" + (parseInt(match[1]) + 1));
        }
    },

    feature: function (version) {
        var match = /\d+\.(\d+)\.\d+/.exec(version);
        if (match) {
            return version.replace(/(\d+\.)\d+(\.\d+)/, "$1" + (parseInt(match[1]) + 1) + "$2");
        }
    }
};