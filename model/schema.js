var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var exports = module.exports = {};

exports.shareRateSchema = new Schema ({
    rate: String,
    date: { type: Date, default: Date.Now }
})

exports.shareSchema = new Schema ({
    name: String,
    shareRate: [ exports.shareRateSchema ]
})

exports.Share = mongoose.model('Share', exports.shareSchema);
exports.ShareRate = mongoose.model('ShareRate', exports.shareRateSchema);