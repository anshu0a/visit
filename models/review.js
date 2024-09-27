const mong = require("mongoose");
const schema = mong.Schema;

const reviewschema = new schema({
    name:String,
    comment:String,
    rating:{
        type:Number,
        min:0,
        max:5
    },
    when:{
        type:Date,
        default:Date.now,
    }
})
module.exports = mong.model("Review",reviewschema);