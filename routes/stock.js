var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schema = require('../model/schema');
var database = require('../model/database');

/* GET all Stocks messages */
router.get('/get', function(req, res, next) {
    schema.Stock.find({}).exec(function (err, stocks) {
        if (err)
            return console.error(err);
        console.log("Load success: ", stocks);
        res.send(stocks);
    });

});

/* POST single blog post */
router.post('/post', function(req, res, next) {
    var instance = new schema.Stock(req.body);
    /** Example post body:
     {
       "author": "Morten Mathiasen",
       "body": "Hello everyone"
     }
     **/

    schema.Stock.find({}).sort({_id:-1}).skip(10).exec(function (err, stocks) {
        console.log("Hallo 2");
        if (err)
            return console.error(err);
        console.log("Loader success: ", stocks);
        blogs.forEach(function(stock){
            console.log("Loader success: ", stock);
            schema.Stock.findByIdAndRemove(stock._id).exec();
        });
    });

    instance.save(function (err, Stock) {
        result = err?err:Stock;
        res.send(result);
        router.notifyclients();
        return result;
    });
});



module.exports = router;
