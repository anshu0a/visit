const listing = require("../models/listing.js");

module.exports.konsafilter = async function(req,res){
    let state;
    if (req.isAuthenticated()) {
        state = "yes";
    } else {
        state = "no";
    }
   
    const data = await listing.find({filters:`${req.params.filter}`}).sort({ _id: -1 })
 
    res.render("home.ejs", { data, state,fill:req.params.filter });
}
