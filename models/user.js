const mong = require("mongoose");
const Schema = mong.Schema;
const passlocalmon = require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        type:String,
        required:true
    }

})
userSchema.plugin(passlocalmon) 
const User = mong.model('User', userSchema);
module.exports = User;