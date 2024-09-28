if(process.env.NODE_EN != "production"){
    require("dotenv").config();
}
const express = require("express");
const app = express();
const mon = require("mongoose");
const path = require("path");
const wrap = require("./utils/wrap.js");
const expresserr = require("./utils/expresserr.js");
const multer = require("multer")
const {storage} = require("./cloudconfig.js")
const upload = multer({storage})
const cookieparser = require("cookie-parser");
const session = require('express-session');
const MongoStore = require('connect-mongo')
const flash = require('connect-flash');
const passport = require("passport");
const localStratgy = require("passport-local");
const User = require("./models/user.js");
const listingcontrol = require("./controllers/listings.js")
const reviewcontrol = require("./controllers/reviews.js")
const log_usercontrol=  require("./controllers/log_user.js")
const filter=  require("./controllers/filter.js")


app.listen(8080, () => {
    console.log("Express working...")
});
const monurl = process.env.ATLAS

main().then(() => { console.log("Mongoose also Working...") }).catch((e) => { console.log(e) })
async function main() {
    await mon.connect(monurl)
}


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieparser())

const cstore =  MongoStore.create({
    mongoUrl:monurl,
    crypto:{
        secret: process.env.SECRET,
    },
    touchAfter: 24*3600,
});
cstore.on("error",()=>{
    console.log("ErroR iN MONGO sTORE : ")
})
app.use(session({
    store:cstore,
    secret:process.env.SECRET,
    resave: false,
    saveUninitialized: false, 
    cookie: {
        expires: 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStratgy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// _________________________________________________middleware__________________________________
const checkuser = function(req,res,next){
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.url;
        req.flash("error", "Login required")
        return res.redirect("/login")
    } else{
        next();
    }
    
}
const saveurl = function(req,res,next){
if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
}
next();
}


app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.del = req.flash("del"); 
    res.locals.edit = req.flash("edit");
    res.locals.error = req.flash("error");
    req.locals = req.locals || {};
    req.locals.previousUrl = null;
    next();
});

// __________________________________________________________________login___________________________________________________________________

app.get("/login", async (req, res) => {
    res.render("login.ejs");
})

app.post('/login',saveurl, passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true,
}),log_usercontrol.login);

// _____________________________________________________________________register_____________________________________

app.get("/create", async (req, res) => {
    res.render("create.ejs");
})
app.post('/registeruser', wrap(log_usercontrol.register));
// __________________________________________________________________home__________________________________________________________________

app.get("/home",listingcontrol.home)

// _______________________________________________________________one___listing_________________________________________________________________

app.get("/listing/:id",checkuser, wrap(listingcontrol.onecard));

// ________________________________________________________________add new listing_________________________________________________________________

app.get("/crt",checkuser,async (req, res) => {
    res.render("crt.ejs",{state:"yes"});
})
 app.post("/new",checkuser,upload.single("actimg"), wrap(listingcontrol.newpost));

 app.post("/addmoreimg/:id",checkuser,upload.single("iimm"), wrap(listingcontrol.newimg))

// _________________________________________________________________edit__________________________________________________________________

app.get("/edit/:id",checkuser, wrap(listingcontrol.showedit));
app.post("/change/:id",checkuser,listingcontrol.changedbimage,upload.single("actimg"), wrap(listingcontrol.doedit));

// _________________________________________________________________delete listing__________________________________________________________________

app.post("/del/:id",checkuser, wrap(listingcontrol.deletepost));

// _____________________________________________________________________delete one pic_____________________________________
app.post("/deleteonepost/:id",checkuser,wrap(listingcontrol.deleteonepic))
// _________________________________________________________________review__________________________________________________________________

app.post("/review/:id",checkuser, wrap(reviewcontrol.doreview));
app.post("/deleteReview",checkuser, wrap(reviewcontrol.deletereview));
// _____________________________________________________________logout_________________________________________________________________________
app.post("/logout", wrap(log_usercontrol.logoutt));
// ______________________________________________________________filters___________________________________________________________________________

app.get("/filters/:filter",checkuser,wrap(filter.konsafilter));
// _________________________________________________________________like________________________________________----
app.post("/like/:id",checkuser, wrap(log_usercontrol.like));
app.get("/fav",checkuser,wrap(log_usercontrol.fav));
// _________________________________________________________________all__________________________________________________________________

app.all("*", (req, res, next) => {
    next(new expresserr(404, "page not found!"))
})

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Somthing went wrong!" } = err
    res.status(statusCode)
    res.render("error.ejs", { message }) 
});


