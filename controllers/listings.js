const listing = require("../models/listing.js");
const { removeimage } = require("../cloudconfig.js")


module.exports.home = async (req, res) => {
    let state;
    if (req.isAuthenticated()) {
        state = req.user;
    } else {
        state = "no";
    }
    const data = await listing.find({}).sort({ _id: -1 })
    let fill = false;
   
    res.render("home.ejs", { data, state, fill });

}

module.exports.onecard = async (req, res) => {

    try {
        let { id } = req.params;
        const data = await listing.find({ _id: id }).populate("reviews");
        const fill = "none";
        res.set('Cache-Control', 'no-store');
        res.render("id.ejs", { data, user: req.user, state: "yes", fill });
    } catch (err) {
        if (err.message.includes("Cast to ObjectId failed for value")) {

            req.flash("del", "Unavaliable post trying to reach");
            res.redirect("/home");
        }
    }
}

module.exports.newpost = async (req, res, next) => {

    let { titlex, pricex, descriptionx, locationx, countryx, urlx, filenamee, filters, per } = req.body
    if (req.file) {
        urlx = req.file.path;
        filenamee = req.file.filename;
    }
    if (!titlex || !pricex || !descriptionx || !locationx || !countryx || !filters || !per) {
        throw new expresserr(400, "Somthing is missing in your form")
    }
    let sv = await new listing({
        username: `${req.user.username}`,
        title: `${titlex}`,
        price: pricex,
        description: `${descriptionx}`,
        location: `${locationx}`,
        country: `${countryx}`,
        image: [{ filename: `${filenamee}`, url: `${urlx}` }],
        long: `${per}`
    });

    const filterx = filters.split(',').map(item => item.trim());
    for (filt of filterx) {
        await sv.filters.push(`${filt}`);
    }
    await sv.save();
    req.flash("success", "New post created")
    res.redirect(`/listing/${sv._id}`);
}

module.exports.showedit = async (req, res) => {
    try {
        const data = await listing.find({ _id: `${req.params.id}` })
        res.render("edit.ejs", { data, user: req.user, state: "yes" })
    } catch {
        req.flash("del", "Unknow post trying to edit");
        res.redirect("/home");
    }
}
module.exports.doedit = async (req, res) => {
    try {

        if (!req.body.titlex || !req.body.pricex || !req.body.descriptionx || !req.body.locationx || !req.body.countryx || !req.body.filters) {
            throw new expresserr(400, "Somthing is missing in your Edit request")
        }
        let postt = await listing.findByIdAndUpdate(`${req.params.id}`, {
            username: `${req.user.username}`,
            title: `${req.body.titlex}`,
            price: req.body.pricex,
            description: `${req.body.descriptionx}`,
            location: `${req.body.locationx}`,
            country: `${req.body.countryx}`,
            filters: [],

        })
        if (req.file) {
            const urll = req.file.path;
            const filenamee = req.file.filename;

            await listing.findByIdAndUpdate(`${req.params.id}`,
                { $push: { image: { filename: `${filenamee}`, url: `${urll}`, } } }
            );
        }
        const filterx = req.body.filters.split(',').map(item => item.trim());
        for (filt of filterx) {
            await postt.filters.push(`${filt}`);
        }
        await postt.save();
        req.flash("success", "Post Edited Successfully")
        res.redirect(`/listing/${req.params.id}`);
    } catch (err) {
        req.flash("error", `${err}`);
        res.redirect(`/listing/${req.params.id}`);
    }
}

module.exports.deleteonepic = async (req, res) => {
    try {
        if (req.body.filename !== "undefined") {
            console.log(req.body.filename)
            await removeimage(req.body.filename);
        }
        await listing.findByIdAndUpdate(`${req.params.id}`,
            { $pull: { image: { filename: `${req.body.filename}`, url: `${req.body.url}`, } } }
        );
        req.flash("success", `Image removed from your post`);
        res.redirect(`/listing/${req.params.id}`);
    } catch (err) {
        console.log(err)
        req.flash("error", `${err}`);
        res.redirect(`/listing/${req.params.id}`);
    }

}
module.exports.newimg = async (req, res) => {
    try {
        if (req.file) {

            const postt = await listing.findByIdAndUpdate(`${req.params.id}`,
                { $push: { image: { filename: `${req.file.filename}`, url: `${req.file.path}`, } } }
            );
            await postt.save();
        }
        req.flash("success", "Image saved successfully")
        res.redirect(`/listing/${req.params.id}`);
    } catch (err) {
        req.flash("error", `${err}`);
        res.redirect(`/listing/${req.params.id}`);
    }
}

module.exports.changedbimage = async (req, res, next) => {

    try {
        const chgg = await listing.findById(`${req.params.id}`)
        if (chgg.image[0].filename !== "undefined") {
            await removeimage(chgg.image[0].filename);
        }
        next();
    } catch {
        req.flash("del", "Unavaliable post trying to edit");
        res.redirect("/home");
    }

}
module.exports.deletepost = async (req, res) => {

    try {
        let { id } = req.params;
        let del = await listing.findOneAndDelete({ _id: `${id}` });
        for (let xxg of del.image) {
            if (xxg.filename !== "undefined") {
                await removeimage(xxg.filename);
            }

        }
        req.flash("success", "Post Deleted Successfully")
        res.redirect("/home")
    } catch {
        req.flash("del", "Unavaliable post trying to delete");
        res.redirect("/home");
    }

}
module.exports.byname = async (req, res) => {

    try {
        let name = req.params.namex
        let data = await listing.find({username:`${name}`});
        if(data){
            if (await req.isAuthenticated()) {
                state = req.user;
            } else {
                state = "no";
            }
            let fill=false;
            res.render("home.ejs", { data, state,fill });
        }else{
            res.redirect("/home");
        }
    } catch (ee){
        req.flash("del", "Error");
        res.redirect("/home");
    }

}