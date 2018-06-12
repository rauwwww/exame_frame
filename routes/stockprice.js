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

router.post("/", function(req, res, next) {
    var instance = new schema.StockPrice(req.body);

    schema.Stock.update(
        { _id: req.query.containerID },
        { $push: { stockPrice: instance } },
        function (err, StockPrice) {
            if (err)
                return console.error(err);
            console.log("Save success: ", StockPrice);
    });

    res.send("Hello");
});

module.exports = router;