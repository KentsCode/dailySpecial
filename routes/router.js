const path = require("path");
const router = require("express").Router();
const controller = require("../controller/controller")

router.route("/api/search/")
    .get(function(req, res) {
        controller.find(req, res);
        console.log("from router search ");
    });

router.post("/api/venueLogin", (req, res) => {
    console.log("login! data received" + req.body);
    controller.venueLogin(JSON.stringify(req.body));
});

router.route("/api/regularSpecial")
    .post( function(req, res) {
    //console.log(req.body);
    controller.createRegularSpecial(req.body, res);//talks to controller.js
    });
    
router.route("/api/findAccount/:nickname")
    .get(function(req, res) {
        controller.findAccount(req, res);
        console.log("findAccount fired!");
    });

router.post("/api/account/", function (req, res) {
    //console.log(req.body);
    controller.createAccount(req.body);
});
router.route("/api/mySpecials/:nickname")
    .get(function (req, res) {
        controller.mySpecials(req, res);
        console.log("from router  !!", req.query);
    });
router.delete('/api/delete/:id', function (req, res) {
    controller.delete(req, res);
    console.log("trying to delete")
})


module.exports = router;