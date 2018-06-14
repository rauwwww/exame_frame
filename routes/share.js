var express = require("express");
var router = express.Router();
var schema = require("../model/schema");

/* GET all shares */
router.get("/get", function(req, res, next) {
  schema.Share.find({}).exec(function(err, shares) {
    if (err) return console.error(err);
    console.log("Load success: ", shares);
    res.send(shares);
  });
});

/* POST single share  */
router.post("/post", (req, res) => {
  var data = new schema.Share();
  data.name = req.body.name;

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

/* Post a rate to a share */
router.post("/sharePost", (req, res) => {
  var data = new schema.ShareRate(req.body);
  if (!req.body.rate) {
    res.json({ success: false, message: "No rate provided" });
  } else {
    if (!req.body.id) {
      res.json({ success: false, message: "No id was provided" });
    } else {
      schema.Share.update(
        { _id: req.body.id },
        { $push: { shareRate: { $each: [data], $position: 0 } } },
        function(err, data) {
          if (err) {
            res.json({ success: false, message: "Something went wrong duh" });
          } else {
            res.json({ success: true, message: "Rate saved" });
            router.notifyclients();
          }
        }
      );
    }
  }
});

/* Delete share with id */
router.post("/delete", (req, res) => {
  schema.Share.findById(req.body.id, function(err, share) {
    if (err) {
      res.json({ ERROR: err });
    } else {
      share.remove(function(err) {
        if (err) {
          res.json({ ERROR: err });
        } else {
          res.json({ REMOVED: share });
          router.notifyclients();
        }
      });
    }
  });
});

/* Notify Share changes to connected clients */
router.clients = [];
router.addClient = function(client) {
  router.clients.push(client);
  router.notifyclients(client);
};
router.notifyclients = function(client) {
  schema.Share.find({})
    .sort({ _id: -1 })
    .exec(function(err, shares) {
      if (err) return console.error(err);
      //   console.log("Load success: ", shares);
      var toNotify = client ? new Array(client) : router.clients;
      toNotify.forEach(function(socket) {
        socket.emit("refresh", shares);
      });
    });
};

module.exports = router;
