const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = Promise;  

const regularSpecialSchema = new Schema ({
    nickname: { type: String, required: true},
    weekday: { type: String, required: true},
    description: {type: String, required: false},
    price: {type: Number, min: 0.01, max: 1000},
    restaurantName: {type: String, required: true},
    address: {type: String},
    city: {type: String} 
})

const regularSpecial = mongoose.model("regularspecials", regularSpecialSchema);

module.exports = regularSpecial;