const listing = require("../models/listing.js");
const User = require("../models/user.js");
const Review = require("../models/review.js");

module.exports.login=(req, res) => {
    req.flash("success", `Welcome back ${req.body.username} in Wonderlust`);
    if(res.locals.redirectUrl){
        res.redirect(res.locals.redirectUrl);
    }else{
res.redirect("/home")
    }
}
module.exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email });
       const loguse = await User.register(newUser, password); 
        req.login(loguse,(err)=>{
            if(err){
               return next(err);
            }
            req.flash("success", `Welcome ${username} to Wonderlust`);
            res.redirect("/home");
        })

    } catch (err) {
        req.flash("error", `${err.message}`);
        res.redirect("/create");
    }
}

module.exports.logoutt = async (req, res,next) => {
    req.logout((err)=>{
       if(err){
        next(err);
       }
       res.redirect("/login");
    })}