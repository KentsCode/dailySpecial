const db = require("../models");

//Methods are below.
module.exports = {
    find: function(req, res) {
        //console.log("from Controller !  " + JSON.stringify(req));
        db.regularSpecial
            .find(req);
            //finish filling out your query to the database;
            //use .get to put variables in the url and return results accordingly
    },

    createRegularSpecial: function(req, res) {
        //console.log("Controller.Create fired!" + JSON.stringify(req));
        db.regularSpecial
            .create(req);
            //not complete
    },
    createAccount: function(req, res) {
        //console.log("ControllerFired! " + JSON.stringify(req));
        db.accountSchema
            .create(req);
    },
    venueLogin: function(req, res) {
        console.log("Controller Fired: venueLogin" + req);
        db.accountSchema
            .findOne({username: "user", password: "pass"}, 'restaurantName', function(err, accountInfo) {
                console.log("account info" + accountInfo);
            })
            //.then(console.log("venue Search" + res));
    },
    mySpecials: function(req, res) {
        console.log("finding my specials.")
        db.regularSpecial
            .find({nickname: "kentmbox42"}, function (err, returnedSpecials) {
                //console.log("returned specials " + returnedSpecials);
                //res.send(returnedSpecials);
                console.log("res   " +res);
            })
            //.then(dbModel => res.json(dbModel))
            //.catch(err => res.status(422).json(err));
            //.then(res.send(returnedSpecials));
            
    }
}
