const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const regularSpecialSchema = new Schema ({
    nickname: { type: String, required: true},
    weekday: { type: String, required: true},
    description: {type: String, required: false},
    price: {type: Number, min: 0.01, max: 1000} 
})

const regularSpecial = mongoose.model("regularspecials", regularSpecialSchema);

module.exports = regularSpecial;