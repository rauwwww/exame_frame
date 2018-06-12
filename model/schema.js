var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var exports = module.exports = {};

// exports.blogSchema = new Schema({
//     author: String,
//     body:   String
// });
// exports.Blog = mongoose.model('Blog',exports.blogSchema);


// stockSchema Added

exports.stockPriceSchema = new Schema ({
    price: String,
    date: { type: Date, default: Date.Now }
})

exports.stockSchema = new Schema ({
    name: String,
    stockPrice: [ exports.stockPriceSchema ]
})

exports.Stock = mongoose.model('Stock', exports.stockSchema);
exports.StockPrice = mongoose.model('StockPrice', exports.stockPriceSchema);