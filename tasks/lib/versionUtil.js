/**
 * Created by cc on 8/14/15.
 */
"use strict";

module.exports = {
    addHotfix: function (version) {
        var match = /\d+\.\d+\.(\d+)/.exec(version);
        if (match) {
            return version.replace(/(\d+\.\d+\.)\d+/, "$1" + (parseInt(match[1]) + 1));
        }
    },

    minusHotfix: function (version) {
        var match = /\d+\.\d+\.(\d+)/.exec(version);
        if (match) {
            return version.replace(/(\d+\.\d+\.)\d+/, "$1" + (parseInt(match[1]) - 1));
        }
    },

    addFeature: function (version) {
        var match = /\d+\.(\d+)\.\d+/.exec(version);
        if (match) {
            return version.replace(/(\d+\.)\d+(\.\d+)/, "$1" + (parseInt(match[1]) + 1) + "$2");
        }
    },

    minusFeature: function (version) {
        var match = /\d+\.(\d+)\.\d+/.exec(version);
        if (match) {
            return version.replace(/(\d+\.)\d+(\.\d+)/, "$1" + (parseInt(match[1]) - 1) + "$2");
        }
    }
};