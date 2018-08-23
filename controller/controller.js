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
                    responseArray.push(element.nickname)
                    });
                    console.log("response from then", responseArray);
                    return responseArray;
                })
                .then(function (responseArray) {
                    //console.log("next then...",responseArray)
                    db.regularSpecial
                    .find({nickname: responseArray, weekday: req.query.day})
                        .then(dbModel => res.json(dbModel))}
                )
    },

    createRegularSpecial: function(req, res) {
        //console.log("Controller.Create fired!" + JSON.stringify(req));
        db.regularSpecial
            .create(req)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    createAccount: function(req, res) {
        //console.log("ControllerFired! " + JSON.stringify(req));
        db.accountSchema
            .create(req);
    },
    findAccount: function(req, res) {
        db.accountSchema
            .find({nickname: req.query.nickname})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    venueLogin: function(req, res) {
        console.log("Controller Fired: venueLogin" + req);
        db.accountSchema
            .findOne({username: "user", password: "pass"}, 'restaurantName', function(err, accountInfo) {
                console.log("account info" + accountInfo);
            })
    },
    mySpecials: function(req, res) {
        console.log("finding my specials.", req.query)
        db.regularSpecial
            .find({nickname: req.query.nickname})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));   
    },
    delete: function(req, res) {
        console.log(req.query.id);
        db.regularSpecial
            .findByIdAndRemove({_id: req.query.id})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    deleteRestaurant: function(req, res) {
        console.log(req.query.id);
        db.accountSchema
            .findByIdAndRemove({_id: req.query.id})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    myAccounts: function(req,res) {
        //finds all restaurants associated with an account.
        //console.log("from controller", req.query.nickname);
        db.accountSchema
            .find({nickname: req.query.nickname})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
}
