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

/* POST single stock  */
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
        stocks.forEach(function(stock){
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


router.post("/stockPost", (req, res) => {
    var instance = new schema.StockPrice(req.body);

    if (!req.body.price) {
        res.json({ success: false, message: 'No stockprice provided'});
    } else {
        if(!req.body.id) {
            res.json({ success: false, message: 'No id was provided'});
        } else {
                schema.Stock.update(
                    { _id: req.body.id },
                    { $push: { stockPrice: { "$each": [instance], "$position": 0 } } },
                    function (err, StockPrice) {
                        if (err) {
                            res.json({ success: false, message: 'Something went wrong duh'});
                        } else {
                            res.json({ success: true, message: 'Price saved'});
                        }
                });
            }
        }
});



/* Notify stock prices to connected clients */
router.clients = [];
router.addClient = function (client) {
    router.clients.push(client);
    router.notifyclients(client);
};
router.notifyclients = function (client) { 
    schema.Stock.find({}).sort({_id:-1}).exec(function (err, stocks) {
        if (err)
            return console.error(err);
        //console.log("Load success: ", blogs);
        var toNotify = client?new Array(client):router.clients;
        toNotify.forEach(function(socket){
            socket.emit('refresh', stocks);        
        })
    });
}



module.exports = router;
