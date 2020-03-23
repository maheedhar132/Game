const router = require("express").Router();
let dashboardController = require("./dashboardController.js");

router.get("/details/:role", function(req, res) {
  try {
    dashboardController.jsonData(
      req,
      (successCB = details => {
        res.status(200).send(details);
      }),
      (errorCB = err => {
        res.status(200).json({
          error: "failed to get details"
        });
      })
    );
  } catch (e) {
    res.status(500).json({
      error: "Server error...try again later"
    });
  }
});

router.get("/rules/:role", function(req, res) {
  try {
    dashboardController.rulesJSON(
      req,
      function successCB(rules) {
        res.status(200).send(rules);
      },
      function errorCB(err) {
        res.status(200).json({
          error: "failed to get rules"
        });
      }
    );
  } catch (e) {
    res.status(500).json({
      error: "Server error...try again later"
    });
  }
});

router.get("/reset/:role", function(req, res) {
  try {
    dashboardController.resetYAML(
      req,
      (successCB = status => {
        res.status(200).send(status);
      }),
      (errorCB = err => {
        res.status(200).json({
          error: "failed to get details"
        });
      })
    );
  } catch (e) {
    res.status(500).json({
      error: "Server error...try again later"
    });
  }
});

module.exports = router;
