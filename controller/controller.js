const db = require("../models");

//Methods are below.
module.exports = {
    find: function(req, res) {
        console.log("from Controller !  ", req.query.locale, req.query.day);
        
        db.accountSchema
            .find({zip: req.query.locale})
                .then(function(response) {
                    let responseArray = [];
                    response.forEach(element => {
                        //console.log("element logging",element.nickname);
                        
                        responseArray.push(element.nickname)
                    });
                    console.log("response from then", responseArray);
                    return responseArray;
                })
                .then(function (responseArray) {
                    console.log("next then...",responseArray)
                    db.regularSpecial
                    .find({nickname: responseArray})
                        .then(dbModel => res.json(dbModel))}
                )
                //.then(dbModel => res.json(dbModel))
            //finish filling out your query to the database;
            //use .get to put variables in the url and return results accordingly
    },

    createRegularSpecial: function(req, res) {
        //console.log("Controller.Create fired!" + JSON.stringify(req));
        db.regularSpecial
            .create(req);
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
        console.log("finding my specials.", res)
        db.regularSpecial
            .find({nickname: "kentmbox42"})
            .then(dbModel => res.json(dbModel));
            //.catch(err => res.status(422).json(err));
            //.then(res.send(returnedSpecials));
    }
}
