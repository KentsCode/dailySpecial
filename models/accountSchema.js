const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    restaurantName: { type: String, required: true},
    streetAddress: { type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    zip: { type: Number, min: 1, max: 99999},
    nickname: {type: String, required: true}
    //not sure if zip validation is right
})

const account = mongoose.model("account", accountSchema);

module.exports = account;