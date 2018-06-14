var mongoose = require('mongoose');
var exports = module.exports = { 'secret':'meansecure'};

//Connect to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/StockExchange', {useMongoClient: true});
exports.db = mongoose.connection;
exports.db.on('error', console.error.bind(console, 'connection error:'));
exports.db.once('open', function() {
    console.log("We're connected to the Stock Exchange Database through Mongoose!");
});