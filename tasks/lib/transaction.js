"use strict";

var versionUtil = require('./versionUtil');


function HotfixTransaction() {
}

HotfixTransaction.prototype.getNewVersion = function (version) {
    this.version = version;;
    return versionUtil.addHotfix(version);
};


HotfixTransaction.prototype.rollback = function () {
    return this.version;
};

function FeatureTransaction(file) {
}

FeatureTransaction.prototype.getNewVersion = function (version) {
    this.version = version;
    return versionUtil.addFeature(version);
};


FeatureTransaction.prototype.rollback = function () {
    return this.version;
};

module.exports = {
    choose: function (type) {
        switch (type) {
            case 'hotfix':
                return new HotfixTransaction();
                break;
            case 'feature':
                return new FeatureTransaction();
                break;
            default:
                throw new Error('Type not found');
        }
    }
};
