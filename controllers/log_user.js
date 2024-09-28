const listing = require("../models/listing.js");
const User = require("../models/user.js");

module.exports.login = (req, res) => {
    req.flash("success", `Welcome back ${req.body.username} in Wonderlust`);
    if (res.locals.redirectUrl) {
        res.redirect(res.locals.redirectUrl);
    } else {
        res.redirect("/home")
    }
}
module.exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const loguse = await User.register(newUser, password);
        req.login(loguse, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", `Welcome ${username}!`);
            res.redirect("/home");
        })

    } catch (err) {
        req.flash("error", `${err.message}`);
        res.redirect("/create");
    }
}

module.exports.logoutt = async (req, res, next) => {
    req.logout((err) => {
        if (err) {
            next(err);
        }
        req.flash("success","Visit again in wounderLust")
        res.redirect("/login");
    })
}

module.exports.like = async (req, res, next) => {

try{
    const list = await listing.findById(req.params.id).select('likes');
    const liked = list.likes.includes(req.user.id);
    if(liked){
        let postt = await listing.findByIdAndUpdate(req.params.id, { $pull:{ likes: req.user.id }});
        let rrr = await User.findByIdAndUpdate(req.user.id, { $pull:  { likes: req.params.id} });
        await rrr.save();
        await postt.save();
        req.flash("success","Post removed from wishlist")
        res.redirect("/home")
    }else{
        let postt = await listing.findByIdAndUpdate(req.params.id, { $push: { likes:req.user}   });
        let rrr = await User.findByIdAndUpdate(req.user.id, { $push: { likes: postt}});
        await rrr.save();
        await postt.save();
        req.flash("success","Post added to wishlist")
        res.redirect("/home")
    }
    
}catch(er){
    req.flash("error", `${er.message}`);
    res.redirect("/home");
}}

module.exports.fav = async (req, res, next) => {
    let data = await listing.find({likes:req.user._id})
    let state;
    if (req.isAuthenticated()) {
        state = req.user;
    } else {
        state = "no";
    }
    let fill = false;
    res.render("home.ejs", { data, state, fill });
}