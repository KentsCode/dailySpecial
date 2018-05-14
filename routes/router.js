const path = require("path");
const router = require("express").Router();
const controller = require("../controller/controller")

router.post("/search", (req, res) => {
    //console.log("searched!" + req.body);
    controller.find(req.body);
});

router.post("/api/venueLogin", (req, res) => {
    console.log("login! data received" + req.body);
    controller.venueLogin(JSON.stringify(req.body));
})

router.post("/api/regularSpecial", function(req, res) {
    //console.log(req.body);
    controller.createRegularSpecial(req.body);//talks to controller.js
});

router.post("/api/account", function (req, res) {
    //console.log(req.body);
    controller.createAccount(req.body);
})
router.route("/api/mySpecials")
    .get(function (req, res) {
        controller.mySpecials();
        console.log("from router  "+ res);
    })



module.exports = router;