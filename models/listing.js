const mond = require("mongoose");
const { Schema } = mond;
const Review = require("./review.js")
function ran() {
    return Math.floor(Math.random() * 12);
};

let listscma = new mond.Schema({
    username: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: [{
            filename: {
                type: String
            },
            url: {
                type: String,
                default: "/img/sa0.jpg",
                set: (v) => v === "" ? `/img/sa${ran()}.jpg` : v,
            },
            _id: false,
        }], default: []
    },
    price: {
        type: Number
    },
    location: {
        type: String
    },
    country: {
        type: String

    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    filters:[],
    likes: {
        type: [{
            name: {
                type: String
            },
            _id: false,
        }],
        default: []
    },
    long: {
        type: String,
        default:"night"
    },
});


listscma.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});


const listing = mond.model("listing", listscma)
module.exports = listing; 