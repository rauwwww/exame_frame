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
                    { $push: { stockPrice: instance } },
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

// router.post("/", function(req, res, next) {
//     var instance = new schema.StockPrice(req.body);

//     schema.Stock.update(
//         { _id: req.query.containerID },
//         { $push: { stockPrice: instance } },
//         function (err, StockPrice) {
//             if (err)
//                 return console.error(err);
//             console.log("Save success: ", StockPrice);
//     });

//     res.send("Hello");
// });

// router.post("/comment", (req, res) => {
    // if (!req.body.price) {
    //     res.json({ success: false, message: 'No stockprice provided'});
    // } else {
    //     if(!req.body.id) {
    //         res.json({ success: false, message: 'No id was provided'});
    //     } else {
//             schema.Stock.findOne({ _id: req.body.id }, (err, stock) => {
//                 if (err) {
//                     res.json({ success: false, message: 'Invalid blog id'});
//                 } else {
//                     if (!stock) {
//                         res.json({ success: false, message: 'Stock not found.'});
//                     } else {
//                         stock.stockPrice.push({
//                             price: req.body.price
//                         });
//                         stock.save((err) => {
//                             if (err) {
//                                 res.json({ success: false, message: 'Something went wrong duh'});
//                             } else {
//                                 res.json({ success: true, message: 'Price saved'});
//                             }
//                         });
//                     }   
//                 }
//             });
//         }
//     }
// });



module.exports = router;