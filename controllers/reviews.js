const listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.doreview = async (req, res) => {
    let { id } = req.params;
    let postt = await listing.findById(`${id}`)
    let newreview = new Review({
        name: req.user.username,
        comment: req.body.comment,
        rating: req.body.star 
    })
    postt.reviews.push(newreview);
    await newreview.save();
    await postt.save();
    req.flash("success", "Your Review Added Successfully");
    res.redirect(`/listing/${id}`)
}
module.exports.deletereview = async (req, res) => {
    try {
        await Review.findByIdAndDelete(`${req.body.who}`)
        let postt = await listing.findByIdAndUpdate(req.body.postid, { $pull: { reviews: req.body.who } });
        await postt.save();
        req.flash("success", `Review Deleted Sucessfully`)
        res.redirect(`/listing/${req.body.postid}`)

    } catch (er) {
        req.flash("error", `${er}`)
        res.redirect(`/listing/${req.body.postid}`)
    }
}