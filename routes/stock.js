var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var schema = require("../model/schema");
var database = require("../model/database");

/* GET all Stocks */
router.get("/get", function(req, res, next) {
  schema.Stock.find({}).exec(function(err, stocks) {
    if (err) return console.error(err);
    console.log("Load success: ", stocks);
    res.send(stocks);
  });
});

/* POST single stock  */
router.post("/post", (req, res) => {
  var data = new schema.Stock();
  data.name = req.body.name;

  //   schema.Stock.find({})
  //     .sort({ _id: -1 })
  //     .skip(10)
  //     .exec(function(err, stocks) {
  //       console.log("Hallo 2");
  //       if (err) return console.error(err);
  //       console.log("Loader success: ", stocks);
  //       stocks.forEach(function(stock) {
  //         console.log("Loader success: ", stock);
  //         schema.Stock.findByIdAndRemove(stock._id).exec();
  //       });
  //     });
  if (!req.body.name) {
    res.json({ success: false, message: "No stockname provided" });
  } else {
    data.save(function(err, data) {
      if (err) {
        res.json({ success: false, message: "Something went wrong duh", error: err });
      } else {
        res.send(data);
        router.notifyclients();
      }
    });
  }
});

router.post("/stockPost", (req, res) => {
  var data = new schema.StockPrice(req.body);

  if (!req.body.price) {
    res.json({ success: false, message: "No stockprice provided" });
  } else {
    if (!req.body.id) {
      res.json({ success: false, message: "No id was provided" });
    } else {
      schema.Stock.update(
        { _id: req.body.id },
        { $push: { stockPrice: { $each: [data], $position: 0 } } },
        function(err, StockPrice) {
          if (err) {
            res.json({ success: false, message: "Something went wrong duh" });
          } else {
            res.json({ success: true, message: "Price saved" });
            router.notifyclients();
          }
        }
      );
    }
  }
});

/* Delete stock with id */
router.post("/delete", (req, res) => {
  schema.Stock.findById(req.body.id, function(err, stock) {
    if (err) {
      res.json({ ERROR: err });
    } else {
      stock.remove(function(err) {
        if (err) {
          res.json({ ERROR: err });
        } else {
          res.json({ REMOVED: stock });
          router.notifyclients();
        }
      });
    }
  });
});

/* Notify stock changes to connected clients */
router.clients = [];
router.addClient = function(client) {
  router.clients.push(client);
  router.notifyclients(client);
};
router.notifyclients = function(client) {
  schema.Stock.find({})
    .sort({ _id: -1 })
    .exec(function(err, stocks) {
      if (err) return console.error(err);
      //   console.log("Load success: ", stocks);
      var toNotify = client ? new Array(client) : router.clients;
      toNotify.forEach(function(socket) {
        socket.emit("refresh", stocks);
      });
    });
};

module.exports = router;
