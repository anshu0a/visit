const mon = require("mongoose");
const initdata = require("./data.js");
const listing = require("../models/listing.js")

main().then(() => { console.log("hii, express...") }).catch((e) => { console.log(e) })
async function main() {
    await mon.connect("mongodb://127.0.0.1:27017/visit")
}

const initdb = async()=>{
   await listing.deleteMany({});
   await listing.insertMany(initdata.data)
   console.log("data was initialized")
}
initdb();